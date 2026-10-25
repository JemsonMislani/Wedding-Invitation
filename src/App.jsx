import { useEffect, useState } from "react";
import "./App.css";

const WEDDING_DATE = new Date("2026-12-29T15:00:00+08:00");

const entourage = {
  maidOfHonor: ["Princess Yhu-Anne Bas"],
  bestMan: ["Lhexser Alamag"],
  bridesmaids: [
    "Ivy Jane Mislani",
    "Joayma Mislani",
    "Jemyzel Mislani",
    "Ivy Rose Sta. Rosa",
    "Sherly Alamag",
    "Jocelyn Verdida",
    "Joey Mae Prietos",
    "Mary Joy Alamag",
  ],
  groomsmen: [
    "Yamier Mislani",
    "Novelee Aquino",
    "Karl Anthony Ybañez",
    "Jemson Mislani Jr.",
    "Alex Alamag",
    "Jemar Verdida",
    "Reynaldo Prietos",
    "Roderick Villon"
  ],
  secondarySponsors: [
    {
      role: "Veil Sponsors",
      partners: ["Karl Anthony Ybañez", "Jemyzel Mislani"],
    },
    {
      role: "Cord Sponsors",
      partners: ["Reynaldo Prietos", "Joey Mae Prietos"],
    },
    {
      role: "Candle Sponsors",
      partners: ["Jemson Mislani Jr.", "Ivy Rose Sta. Rosa"],
    },
    {
      role: "Bible Bearer",
      partners: ["Lance Cedric Bas"],
    },
    {
      role: "Ring Bearer",
      partners: ["Ellerei Prietos"],
    },
    {
      role: "Flower Girl",
      partners: ["Rainaiah Hope Prietos", "Lhexsis Alamag"],
    },
    {
      role: "Coin Bearer",
      partners: ["Brethina Almoricar",],
    },
  ],
  principalSponsors: [
    ["Wilma Valenzuela", "Leo Valenzuela (Bride Sponsors)"],
    ["Lucinio Villon Jr.", "Peruza Villon (Bride Sponsors)"],
    ["Melanie Akim", "Benjie Akim (Bride Sponsors)"],
    ["Fatima Corpuz", "Deenuel Boro (Groom Sponsors)"],
    ["JB Brizuela", "Janet Isanan (Groom Sponsors)"],
  ],
};

const brideGuests = [
  "Thadzmahal Abdulla",
  "Cherry Ulanimo",
  "Danica Moroña",
  "Buenafe Rellora",
  "Marjoelyn Palomares",
  "Regina Mislani",
  "Faustino Manuel",
  "Ershad Abdulla",
  "Reanna Valenzuela"
];

const groomGuests = [
  "Aida Gobangco",
  "Benedict Almonicar",
  "Brixelle Aya Almonicar",
  "Tommy Merilo",
  "Jennifer Jayag",
  "Saint lorence Merilo",
  "Fedela Merilo",
  "Wanie Merilo",
  "Jennalyn Carbonilla",
  "Arjay Merilo"
];


const parents = {
  groom: [
    "Samuel Alamag",
    "Vilma Alamag",
  ],
  bride: [
    "Jemson Mislani Sr.",
    "Liezel Mislani",
  ],
};


function getTimeLeft() {
  const difference = WEDDING_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function NameList({ names }) {
  return (
    <ul className="name-list">
      {names.map((name, index) => (
        <li key={`${name}-${index}`}>{name}</li>
      ))}
    </ul>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="wedding-site">
      <header className="site-header">
        <a href="#home" className="brand" onClick={closeMenu}>
          S <span>&</span> M
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          id="main-navigation"
          className={menuOpen ? "nav-links open" : "nav-links"}
        >
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#entourage" onClick={closeMenu}>Entourage</a>
          <a href="#guests" onClick={closeMenu}>Guests</a>
        </nav>
      </header>

      <main>
        {/* HOME */}
        <section className="hero" id="home">
          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow">A BEAUTIFUL BEGINNING</p>

            <h1>
              S <span>&</span> M
            </h1>

            <div className="hero-divider">
              <span />
              <span className="divider-heart">♡</span>
              <span />
            </div>

            <p className="hero-subtitle">
              Two hearts, one beautiful journey.
            </p>

            <div className="hero-details">
              <div className="hero-detail">
                <span className="hero-detail-label">WHEN</span>
                <p>December 29, 2026
                </p>
                <p className="at">
                  at
                </p>
                <span className="hero-detail-sub">3:00 in the afternoon</span>
              </div>

              <span className="hero-detail-divider" />

              <div className="hero-detail">
                <span className="hero-detail-label">WHERE</span>
                <p>Max's Restaurant Sucat Parañaque</p>
                <span className="hero-detail-sub">Parañaque, Philippines</span>
              </div>

              <span className="hero-detail-divider" />

              <div className="hero-detail">
                <span className="hero-detail-label">MOTIF</span>
                <p>White w/ sky blue, White w/ navy blue</p>
                <span className="hero-detail-sub">Our wedding colors</span>
              </div>
            </div>

            <a href="#about" className="primary-button">
              Discover Our Story <span>↓</span>
            </a>
          </div>

          <div className="hero-bottom">
            WITH LOVE, WE INVITE YOU TO CELEBRATE
          </div>
        </section>

        {/* WELCOME */}
        <section className="welcome section-padding">
          <p className="eyebrow">A NOTE FROM THE COUPLE</p>

          <h2>
            A day to remember,
            <br />
            a love to celebrate.
          </h2>

          <p className="section-description">
            We are so excited to begin this new chapter together.
            It would mean the world to us to have you by our side
            as we celebrate a day filled with love, laughter, and
            beautiful memories.
          </p>

          <span className="flourish">❧</span>
        </section>

        {/* ABOUT */}
        <section className="about section-padding" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
              alt="Romantic wedding ceremony surrounded by flowers"
              loading="lazy"
            />
          </div>

          <div className="about-content">
            <p className="eyebrow">OUR STORY</p>

            <h2>
              It was always
              <br />
              <em>you.</em>
            </h2>

            <p>
              Every little moment brought us here. From the first
              hello to the countless memories we've made, our story
              has become our favorite adventure.
            </p>

            <p>
              Now, we're ready to take the next step, promising
              forever and choosing each other, every single day.
            </p>

            <p className="signature">With love, May-ann & Sandrex</p>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="countdown section-padding">
          <p className="eyebrow">THE BIG DAY IS APPROACHING</p>
          <h2>Counting down to forever</h2>

          <div className="countdown-grid">
            {[
              ["Days", timeLeft.days],
              ["Hours", timeLeft.hours],
              ["Minutes", timeLeft.minutes],
              ["Seconds", timeLeft.seconds],
            ].map(([label, value]) => (
              <div className="countdown-item" key={label}>
                <span className="countdown-number">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WEDDING DETAILS */}
        <section className="details section-padding" id="details">
          <p className="eyebrow">JOIN US ON OUR SPECIAL DAY</p>
          <h2>The Wedding</h2>

          <div className="details-grid">
            <article className="detail-card">
              <span className="detail-icon">♡</span>
              <h3>The Ceremony</h3>
              <p>Tuesday, Dec 29, 2026</p>
              <p>3:00 PM</p>
              <p className="detail-muted">
                Max's Restaurant Sucat Parañaque
              </p>
            </article>

            <article className="detail-card">
              <span className="detail-icon">✧</span>
              <h3>The Reception</h3>
              <p>Following the ceremony</p>
              <p className="detail-muted">Max's Restaurant</p>
              <p className="detail-muted">8260 Dr A Santos Avenue 1700 Parañaque Metro Manila</p>
            </article>
          </div>
        </section>

        {/* ENTOURAGE */}
        <section
          className="entourage section-padding"
          id="entourage" 
        >

          <p className="eyebrow">SURROUNDED BY LOVE</p>
          <h2>Our Entourage</h2>

          <p className="section-description">
            With grateful hearts, we are honored to have these
            wonderful people stand beside us on our special day.
          </p>

        <div className="parents-grid">
          <div className="parents-card">
            <h3>Parents of the Groom</h3>
            {parents.groom.map((name, index) => (
              <p key={index}>{name}</p>
            ))}
          </div>

          <div className="parents-card">
            <h3>Parents of the Bride</h3>
            {parents.bride.map((name, index) => (
              <p key={index}>{name}</p>
            ))}
          </div>
        </div>

          {/* MAID OF HONOR & BEST MAN */}
          <div className="wedding-party-feature">
            <article className="party-card">
              <span className="party-icon">♡</span>
              <h3>Maid of Honor</h3>
              <NameList names={entourage.maidOfHonor} />
            </article>

            <article className="party-card">
              <span className="party-icon">♡</span>
              <h3>Best Man</h3>
              <NameList names={entourage.bestMan} />
            </article>
          </div>

          {/* BRIDESMAIDS & GROOMSMEN */}
          <div className="party-grid">
            <article className="party-card">
              <h3>Bridesmaids</h3>
              <span className="small-flourish">— ♡ —</span>
              <NameList names={entourage.bridesmaids} />
            </article>

            <article className="party-card">
              <h3>Groomsmen</h3>
              <span className="small-flourish">— ♡ —</span>
              <NameList names={entourage.groomsmen} />
            </article>
          </div>

          {/* SECONDARY SPONSORS */}
          <div className="sponsor-section">
            <div className="sponsor-heading">
              <p className="eyebrow">A SYMBOL OF OUR UNION</p>
              <h3>Secondary Sponsors</h3>
              <p>
                Honored to have you guide us as we begin our
                married life together.
              </p>
            </div>

            <div className="sponsor-grid">
              {entourage.secondarySponsors.map((sponsor) => (
                <article className="sponsor-card" key={sponsor.role}>
                  <span className="party-icon">✧</span>
                  <h4>{sponsor.role}</h4>

                  <div className="sponsor-couple">
                    {sponsor.partners.map((name, index) => (
                      <span key={`${name}-${index}`}>{name}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* PRINCIPAL SPONSORS */}
          <div className="sponsor-section principal-section">
            <div className="sponsor-heading">
              <p className="eyebrow">WITH LOVE AND GRATITUDE</p>
              <h3>Principal Sponsors</h3>
              <p>
                Thank you for your love, guidance, and blessings
                as we begin this new chapter.
              </p>
            </div>

            <div className="principal-grid">
              {entourage.principalSponsors.map((couple, index) => (
                <article className="principal-card" key={index}>
                  <span className="party-icon">♡</span>

                  <div className="sponsor-couple">
                    {couple.map((name, nameIndex) => (
                      <span key={`${name}-${nameIndex}`}>
                        {name}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GUESTS */}
        <section className="guests section-padding" id="guests">
          <p className="eyebrow">YOU HAVE A SPECIAL PLACE IN OUR STORY</p>
          <h2>Our Dearest Guests</h2>

          <p className="section-description">
            Your presence is the most wonderful gift. Thank you for
            being part of our journey and for making this celebration
            even more meaningful.
          </p>

          <div className="guest-groups">
            <article className="guest-card">
              <span className="party-icon">♡</span>
              <h3>Bride's Guests</h3>
              <span className="small-flourish">— ♡ —</span>
              <NameList names={brideGuests} />
            </article>

            <article className="guest-card">
              <span className="party-icon">♡</span>
              <h3>Groom's Guests</h3>
              <span className="small-flourish">— ♡ —</span>
              <NameList names={groomGuests} />
            </article>
          </div>

          <div className="guest-note">
            <span>♡</span>
            <p>
              We can't wait to celebrate this beautiful day with you!
            </p>
          </div>

          <a href="#home" className="primary-button">
            Back to Top ↑
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="footer-monogram">S & M</a>
        <p>MADE WITH LOVE, FOR A LOVE THAT LASTS FOREVER.</p>
        <span>© 2026 · Sandrex & May-ann WEDDING</span>
        <p className="developer-credit">
          Design & Developed by <span>Jemson Mislani</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
