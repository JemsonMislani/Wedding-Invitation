
import { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    not_attending: 0,
    });
    const [guests, setGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchName, setSearchName] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/stats`,
        {
          method: "GET",
          headers: {
            "x-admin-key": adminKey,
          },
        }
      );

      if (!response.ok) {
        setIsAuthorized(false);
        alert("Invalid admin key. Please try again.");
        return;
      }

    const data = await response.json();

    setStats(data.stats);

    const guestsResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/api/admin/guests`,
    {
        method: "GET",
        headers: {
        "x-admin-key": adminKey,
        },
    }
    );

    if (!guestsResponse.ok) {
    throw new Error("Unable to retrieve guest list.");
    }

    const guestsData = await guestsResponse.json();

    setGuests(guestsData.guests);
    setIsAuthorized(true);

    alert("Admin access granted!");
    } catch (error) {
      console.error("Admin authentication error:", error);
      alert("Unable to connect to the server.");
    }
  };

const handleSearch = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/guests/search?name=${encodeURIComponent(searchName)}`,
      {
        headers: {
          "x-admin-key": adminKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to search guests.");
    }

    const data = await response.json();
    setGuests(data.guests);
  } catch (error) {
    console.error("Guest search error:", error);
    alert("Unable to search guests.");
  } finally {
    setIsLoading(false);
  }
};

const handleDeleteGuest = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this guest?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/guests/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unable to delete guest.");
    }

    // Remove deleted guest from the displayed list
    setGuests((prevGuests) =>
      prevGuests.filter((guest) => guest.id !== id)
    );

    // Refresh RSVP statistics
    const statsResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/stats`,
      {
        headers: {
          "x-admin-key": adminKey,
        },
      }
    );

    if (!statsResponse.ok) {
      throw new Error("Unable to refresh RSVP statistics.");
    }

    const statsData = await statsResponse.json();
    setStats(statsData.stats);

    alert("Guest deleted successfully!");
  } catch (error) {
    console.error("Delete guest error:", error);
    alert("Unable to delete guest.");
  }
};

const handleLogout = () => {
  setIsAuthorized(false);
  setAdminKey("");
  setGuests([]);
  setSearchName("");

  setStats({
    total: 0,
    attending: 0,
    not_attending: 0,
  });

  alert("You have been logged out successfully.");
};

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Admin </h2>
        </div>

        <nav className="admin-nav">
          <a href="#overview" className="active">
            <span>▦</span> Overview
          </a>

          <a href="#guests">
            <span>♙</span> Guest List
          </a>
        </nav>

        <div className="admin-sidebar-footer">
          <p>S & M Wedding</p>
          <span>December 29, 2026</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <header className="admin-header">
            <div>
                <h1>Dashboard</h1>
                <p>Manage your wedding guest responses.</p>
            </div>

            {isAuthorized && (
                <button
                type="button"
                onClick={handleLogout}
                className="admin-logout"
                >
                Logout
                </button>
            )}
        </header>
        </header>

        {!isAuthorized && (
          <section className="admin-access">
            <h2>Admin Access</h2>
            <p>Enter your private admin key to access the dashboard.</p>

            <form onSubmit={handleAdminLogin}>
              <input
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                required
              />

              <button type="submit">
                Access Dashboard
              </button>
            </form>
          </section>
        )}

        {isAuthorized && (
          <>
            <section className="admin-overview" id="overview">
              <h2>RSVP Overview</h2>

                <div className="admin-stats">
                <div className="stat-card">
                    <p>Total Guests</p>
                    <h3>{stats.total}</h3>
                </div>

                <div className="stat-card">
                    <p>Attending</p>
                    <h3>{stats.attending}</h3>
                </div>

                <div className="stat-card">
                    <p>Not Attending</p>
                    <h3>{stats.not_attending}</h3>
                </div>
                </div>
            </section>

            <section className="admin-guests" id="guests">
              <div className="guest-section-header">
                <div>
                  <h2>Guest List</h2>
                  <p>View and manage RSVP submissions.</p>
                </div>
              </div>

              <form onSubmit={handleSearch} className="guest-search">
                <input
                    type="search"
                    placeholder="Search guest name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />

                <button type="submit">
                    Search
                </button>

                <button
                type="button"
                onClick={async () => {
                    setSearchName("");
                    setIsLoading(true);

                    try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/admin/guests`,
                        {
                        headers: {
                            "x-admin-key": adminKey,
                        },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Unable to retrieve guest list.");
                    }

                    const data = await response.json();
                    setGuests(data.guests);
                    } catch (error) {
                    console.error("Reset error:", error);
                    alert("Unable to reset guest list.");
                    } finally {
                    setIsLoading(false);
                    }
                }}
                >
                Reset
                </button>
                </form>

              <div className="guest-table-container">
                {isLoading ? (
                    <p>Loading guest records...</p>
                ) : guests.length === 0 ? (
                    <p>No guest records found.</p>
                ) : (
                    <table className="guest-table">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Attendance</th>
                        <th>Date Responded</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {guests.map((guest) => (
                        <tr key={guest.id}>
                        <td>{guest.full_name}</td>

                        <td>
                            {guest.attendance_status === "attending"
                            ? "Attending"
                            : "Not Attending"}
                        </td>

                        <td>
                            {new Date(guest.responded_at).toLocaleString("en-PH", {
                            timeZone: "Asia/Manila",
                            })}
                        </td>

                        <td>
                            <button
                            type="button"
                            onClick={() => handleDeleteGuest(guest.id)}
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                )}
                </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
