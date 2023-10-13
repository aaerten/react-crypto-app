import React from "react";
import { FaRankingStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <Link to="./">
      <div className="navbar">
        <FaRankingStar className="icon" />
        <h1>
          CoinMarket <span className="purple">Top 100</span>
        </h1>
      </div>
    </Link>
  );
};

export default Navbar;
