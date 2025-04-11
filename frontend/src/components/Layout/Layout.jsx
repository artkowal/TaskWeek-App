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

      {/* Kontener dla głównej zawartości */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto", // centrowanie
            padding: "0 15px", // marginesy wewnętrzne po bokach
          }}
        >
          {children}
        </div>
      </div>

      {/* Stopka */}
      <Footer />
    </div>
  );
};

export default Layout;
