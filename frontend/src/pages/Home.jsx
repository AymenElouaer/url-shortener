import React, { useState, useEffect } from "react";
import { shortenUrl } from "../services/api";
import { FaLink, FaEdit, FaClock } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiration, setExpiration] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");

  // Set the theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save theme preference
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Submitting:", { longUrl, customAlias, expiration }); // Debugging
    
    try {
      const { shortUrl, qrCode } = await shortenUrl(
        longUrl,
        customAlias,
        expiration
      );
      setShortUrl(shortUrl);
      setQrCode(qrCode);
    } catch (err) {
      setError(err.message || "Failed to shorten URL. Please try again.");
    }
  };

  return (
    <div className="home">
      {/* Dark mode toggle button */}
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        {/* Long URL input */}
        <div className="input-group">
          <FaLink className="icon" />
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter a long URL"
            required
          />
        </div>

        {/* Custom alias input */}
        <div className="input-group">
          <FaEdit className="icon" />
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="Custom alias (optional)"
          />
        </div>

        {/* Expiration date dropdown */}
        <div className="input-group">
          <FaClock className="icon" />
          <select
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          >
            <option value="">No expiration</option>
            <option value="1h">1 hour</option>
            <option value="1d">1 day</option>
            <option value="1w">1 week</option>
          </select>
        </div>

        {/* Shorten button */}
        <button type="submit">Shorten</button>
      </form>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Result section */}
      {shortUrl && (
        <div className="result">
          <p>
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
          {qrCode && (
            <div className="qr-code">
              <img src={qrCode} alt="QR Code" />
              <p>Scan the QR code</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
