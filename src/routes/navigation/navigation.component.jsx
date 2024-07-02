import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-Links-container">
          <Link className="nav-Link" to="/shop">
            Shop
          </Link>
          <Link className="nav-Link" to="/auth">
            Sign In
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
