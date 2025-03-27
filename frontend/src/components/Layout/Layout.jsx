import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // wypełnij cały widok
        margin: 0,
      }}
    >
      {/* Pasek nawigacji (wysokość automatyczna) */}
      <Navbar />

      {/* Główna zawartość rośnie, by zapełnić przestrzeń między navbar a stopką */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>

      {/* Stopka */}
      <Footer />
    </div>
  );
};

export default Layout;
