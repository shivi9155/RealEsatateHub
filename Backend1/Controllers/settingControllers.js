const Setting = require("../models/SystemSettingSchema");

// Get Settings
exports.getSettings = async (req, res) => {
    try {
        const settings = await Setting.findOne();

        if (!settings) {
            return res.status(404).json({
                success: false,
                message: "Settings not found"
            });
        }

        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error("Get settings error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching settings"
        });
    }
};

// Create or Update Settings
exports.updateSettings = async (req, res) => {
    try {
        const { siteName, contactEmail, maintenanceMode } = req.body;

        let settings = await Setting.findOne();

        if (!settings) {
            // Create if doesn't exist
            settings = new Setting({
                siteName,
                contactEmail,
                maintenanceMode
            });
        } else {
            // Update existing
            settings.siteName = siteName || settings.siteName;
            settings.contactEmail = contactEmail || settings.contactEmail;
            settings.maintenanceMode = maintenanceMode !== undefined 
                ? maintenanceMode 
                : settings.maintenanceMode;
        }

        const updatedSettings = await settings.save();

        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            data: updatedSettings
        });
    } catch (error) {
        console.error("Update settings error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating settings"
        });
    }
};

// Delete Settings (Reset to Default)
exports.resetSettings = async (req, res) => {
    try {
        await Setting.deleteMany({});

        res.status(200).json({
            success: true,
            message: "Settings reset to default"
        });
    } catch (error) {
        console.error("Reset settings error:", error);
        res.status(500).json({
            success: false,
            message: "Error resetting settings"
        });
    }
};
