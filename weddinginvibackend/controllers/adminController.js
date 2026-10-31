const pool = require("../config/db");

const getRSVPStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (
          WHERE attendance_status = 'attending'
        ) AS attending,
        COUNT(*) FILTER (
          WHERE attendance_status = 'not_attending'
        ) AS not_attending
      FROM guests
    `);

    res.status(200).json({
      message: "RSVP statistics retrieved successfully.",
      stats: result.rows[0],
    });

  } catch (error) {
    console.error("RSVP statistics error:", error);

    res.status(500).json({
      message: "Unable to retrieve RSVP statistics.",
    });
  }
};

const getAllGuests = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name,
        attendance_status,
        responded_at
      FROM guests
      ORDER BY responded_at DESC
    `);

    res.status(200).json({
      message: "Guest list retrieved successfully.",
      guests: result.rows,
    });

  } catch (error) {
    console.error("Guest list error:", error);

    res.status(500).json({
      message: "Unable to retrieve guest list.",
    });
  }
};

const searchGuests = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Please provide a guest name to search.",
      });
    }

    const result = await pool.query(
      `SELECT
        id,
        full_name,
        attendance_status,
        responded_at
       FROM guests
       WHERE full_name ILIKE $1
       ORDER BY full_name ASC`,
      [`%${name.trim()}%`]
    );

    res.status(200).json({
      message: "Guest search completed successfully.",
      guests: result.rows,
    });

  } catch (error) {
    console.error("Guest search error:", error);

    res.status(500).json({
      message: "Unable to search guests.",
    });
  }
};

const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: "Invalid guest ID.",
      });
    }

    const result = await pool.query(
      `DELETE FROM guests
       WHERE id = $1
       RETURNING id, full_name`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Guest not found.",
      });
    }

    res.status(200).json({
      message: "Guest deleted successfully.",
      guest: result.rows[0],
    });

  } catch (error) {
    console.error("Guest deletion error:", error);

    res.status(500).json({
      message: "Unable to delete guest.",
    });
  }
};

module.exports = {
  getRSVPStats,
  getAllGuests,
  searchGuests,
  deleteGuest,
};