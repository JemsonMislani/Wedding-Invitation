
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const guestRoutes = require("./routes/guestRoutes");
const adminRoutes = require("./routes/adminRoutes");

const pool = require("./config/db");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/rsvp", guestRoutes);
app.use("/api/admin", adminRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Wedding Invitation API is running!",
  });
});

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

res.status(500).json({
  message: "Database connection failed.",
  code: error.code,
  detail: error.detail,
});
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
