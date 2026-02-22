const User = require("../models/UserSchema");
const bcryptjs = require("bcryptjs");

// Get All Users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role } = req.query;
        let filter = {};

        if (role) {
            filter.role = role;
        }

        const skip = (page - 1) * limit;
        const users = await User.find(filter)
            .select("-password")
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: users.length,
            totalCount: total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: users
        });
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching users"
        });
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password")
            .populate("bookings");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user"
        });
    }
};

// Update User (Admin or Self)
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check permissions - only admin or self can update
        if (req.user.user !== id && req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to update this user"
            });
        }

        // Prepare update data
        const updateData = {};
        if (name) updateData.name = name;
        if (email) {
            // Check if email already exists
            const emailExists = await User.findOne({ email, _id: { $ne: id } });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use"
                });
            }
            updateData.email = email;
        }

        // Only admin can change role
        if (role && req.user.role === "Admin") {
            updateData.role = role;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating user"
        });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Only user can change their own password (or admin)
        if (req.user.user !== id && req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to change this password"
            });
        }

        // Verify old password
        if (req.user.user === id) {
            const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Old password is incorrect"
                });
            }
        }

        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({
            success: false,
            message: "Error changing password"
        });
    }
};

// Delete User (Admin only)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting user"
        });
    }
};
