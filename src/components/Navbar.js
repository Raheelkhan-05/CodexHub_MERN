import logo from "./Images/Logo.jpeg";
import React from "react";
import PropTypes from "prop-types";
import './Navbar.css';
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';

export default function Navbar(props) {
  const history = useHistory();
  const { isLoggedIn, handleLoginStatusChange } = props;

  const isUserLoggedIn = () => {
    const username = localStorage.getItem('username');
    return !!username;
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    handleLoginStatusChange(false);
    history.push('/home');
  };

  const isUserRaheel = () => {
    const username = localStorage.getItem('username');
    return username === 'raheel';
  };

  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      style={{ backgroundColor: 'white', height: '70px' }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" aria-current="page" href="/home">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top ms-3" style={{ borderRadius: "5px", display: "flex", position: "150px 150px" }}
          />
        </a>
        <a className="navbar-brand me-4 p-0" aria-current="page" href="/home">
          {props.title}
        </a>

        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contest">
                {props.aboutText}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/practice">
                Practice
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/leaderboard">
                Leaderboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/technews">
                Tech News
              </a>
            </li>
            {isUserRaheel() && (
              <li className="nav-item">
                <a className="nav-link" href="/addcontest">
                  Add Contest
                </a>
              </li>
            )}
          </ul>
          <div
            className={`form-check form-switch text-${props.mode === "light" ? "dark" : "light"
              } mx-3`}
          >
          </div>
          {isLoggedIn ? (
            <>
              <a href="/profile" className="btn btn-primary me-2" style={{ borderRadius: '30px' }}>
                Profile
              </a>
              <button className="btn btn-danger" style={{ borderRadius: '30px' }} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="btn btn-dark" style={{ borderRadius: '30px', color: 'white' }}>
              Login <i className="fa fa-sign-in" style={{ fontSize: '16px' }}></i>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleLoginStatusChange: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: "NGVP",
  about: "About",
};