const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized - No token provided" 
            });
        }

        // Check for Bearer token format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid token format. Use 'Bearer <token>'" 
            });
        }

        const token = authHeader.substring(7); // Remove "Bearer " prefix

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ 
                success: false,
                message: "Token expired" 
            });
        }
        return res.status(401).json({ 
            success: false,
            message: "Invalid token" 
        });
    }
};

module.exports = verifyToken;
