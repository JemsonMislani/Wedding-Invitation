import React, { useState } from "react";
import "./RSVPForm.css";

const RSVPForm = () => {
  const [fullName, setFullName] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/rsvp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            attendance_status: attendanceStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to submit RSVP.");
        return;
      }

      setFullName("");
      setAttendanceStatus("");
      setShowSuccess(true);

    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rsvp-section">
      <div className="rsvp-container">
        <p className="rsvp-subtitle">S & M</p>

        <h2>Kindly Respond</h2>

        <p className="rsvp-description">
          We would be delighted to celebrate this special day with you.
          Kindly let us know if you can join us.
        </p>

        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="rsvp-field">
            <label htmlFor="fullName">Full Name</label>

            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              maxLength={150}
              disabled={isSubmitting}
            />
          </div>

          <div className="rsvp-field">
            <label>Will you be joining us?</label>

            <div className="rsvp-options">
              <label
                className={`rsvp-option ${
                  attendanceStatus === "attending" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="attending"
                  checked={attendanceStatus === "attending"}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  required
                  disabled={isSubmitting}
                />

                <span>Joyfully Accepts</span>
                <small>Yes, I will attend</small>
              </label>

              <label
                className={`rsvp-option ${
                  attendanceStatus === "not_attending" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="not_attending"
                  checked={attendanceStatus === "not_attending"}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  disabled={isSubmitting}
                />

                <span>Regretfully Declines</span>
                <small>Sorry, I can't attend</small>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="rsvp-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </button>

          <p className="rsvp-deadline">
            Kindly respond before December 22, 2026.
          </p>
        </form>
      </div>

      {showSuccess && (
        <div
          className="rsvp-modal-overlay"
          role="presentation"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="rsvp-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-success-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rsvp-success-icon">✓</div>

            <p className="rsvp-success-subtitle">S & M</p>

            <h2 id="rsvp-success-title">Thank You!</h2>

            <p>
              Your response has been successfully recorded.
              We truly appreciate your time and confirmation.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RSVPForm;