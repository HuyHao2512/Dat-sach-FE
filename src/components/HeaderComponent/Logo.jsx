import React from "react";
import { Link } from "react-router-dom";

const Logo = () => (
  <div className="logo">
    <Link to="/">
      <img src="public/logo.png" alt="Logo" />
    </Link>
  </div>
);

export default Logo;
