
const pool = require("../config/db");

const createRSVP = async (req, res) => {
  try {
    const { full_name, attendance_status } = req.body;

    if (typeof full_name !== "string" || !full_name.trim()) {
    return res.status(400).json({
        message: "Please enter your full name.",
    });
    }

    const cleanName = full_name.trim();

    if (cleanName.length > 150) {
    return res.status(400).json({
        message: "Full name must not exceed 150 characters.",
    });
    }

    if (!attendance_status) {
    return res.status(400).json({
        message: "Please select your attendance status.",
    });
    }

    if (!["attending", "not_attending"].includes(attendance_status)) {
      return res.status(400).json({
        message: "Invalid attendance status.",
      });
    }

    const RSVP_DEADLINE = new Date("2026-12-22T23:59:59+08:00");

    if (new Date() > RSVP_DEADLINE) {
    return res.status(403).json({
        message: "RSVP submissions are now closed.",
    });
    }

    const result = await pool.query(
      `INSERT INTO guests (full_name, attendance_status)
       VALUES ($1, $2)
       ON CONFLICT (full_name) DO NOTHING
       RETURNING *`,
      [cleanName, attendance_status]
    );

    if (result.rows.length === 0) {
      return res.status(409).json({
        message: "You have already submitted your RSVP. Responses cannot be changed.",
      });
    }

    res.status(201).json({
      message: "RSVP submitted successfully!",
      guest: result.rows[0],
    });

  } catch (error) {
    console.error("RSVP submission error:", error);

    res.status(500).json({
      message: "Something went wrong while submitting RSVP.",
    });
  }
};

module.exports = { createRSVP };
