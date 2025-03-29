import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Image Section - Add this below your navbar */}
      <div className="hero-image-container">
        <img
          src="/public/b.png"  // Your image path
          alt="Algorithm Visualization"
          className="hero-image"
        />
      </div>

      {/* Keep your existing homepage content */}
      <div className="content">
        <h1>Welcome to Whitebridge</h1>
        <p>Select an algorithm from the navigation bar above.</p>
      </div>
    </div>
  );
}