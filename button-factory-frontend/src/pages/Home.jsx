import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <nav
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
          Home
        </Link>
        <Link
          to="/products"
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          Products
        </Link>
        <Link
          to="/custom-design"
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          Custom Design Tool
        </Link>
        <Link to="/offers" style={{ textDecoration: "none", color: "#007bff" }}>
          Offers
        </Link>
        <Link
          to="/contact"
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          Contact Us
        </Link>
        <Link to="/login" style={{ textDecoration: "none", color: "#007bff" }}>
          Login
        </Link>
      </nav>

      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", color: "#007bff" }}>
          Welcome to Button Factory
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#555" }}>
          Your one-stop shop for custom buttons and designs.
        </p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem" }}
        >
          Featured Products
        </h2>
        <p>Explore our wide range of buttons with customizable options.</p>
        {/* TODO: Add product highlights or carousel here */}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem" }}
        >
          Custom Design Tool
        </h2>
        <p>Create your own unique button designs with our easy-to-use tool.</p>
        <Link to="/custom-design" style={{ color: "#007bff" }}>
          Try it now
        </Link>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem" }}
        >
          Special Offers
        </h2>
        <p>Check out our latest discounts and promotions.</p>
        <Link to="/offers" style={{ color: "#007bff" }}>
          View offers
        </Link>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2
          style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem" }}
        >
          Contact Us
        </h2>
        <p>Have questions? Reach out to our support team anytime.</p>
        <Link to="/contact" style={{ color: "#007bff" }}>
          Contact support
        </Link>
      </section>
    </div>
  );
};

export default Home;
