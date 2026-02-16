const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, "Shivani");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = verifyToken;
