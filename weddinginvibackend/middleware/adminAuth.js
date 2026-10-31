require("dotenv").config();

const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];

  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({
      message: "Unauthorized. Admin access required.",
    });
  }

  next();
};

module.exports = verifyAdmin;