import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navlink from "../Navlink";
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(Cookies.get("token"));
  });

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <nav className="container navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/images/logo.svg" alt="semina" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div
            className={`navbar-nav ${
              router.pathname !== "/signin" ? "mx-auto" : "ms-auto"
            } my-3 my-lg-0`}
          >
            <Navlink href="/">Home</Navlink>
            <Navlink href="/browse">Browse</Navlink>
            <Navlink href="/stories">Stories</Navlink>
            <Navlink href="/about">About</Navlink>
          </div>
          {router.pathname !== "/signin" && (
            <div className="d-grid">
              {token ? (
                <div className="navbar-nav ms-auto">
                  <div className="nav-item dropdown d-flex flex-column flex-lg-row align-items-lg-center authenticated gap-3">
                    <span className="text-light d-none d-lg-block">
                      Hello, Shayna M
                    </span>

                    <a
                      className="nav-link dropdown-toggle mx-0 d-none d-lg-block"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/images/avatar.png" alt="semina" width="60" />
                    </a>

                    <a
                      className="d-block d-lg-none dropdown-toggle text-light text-decoration-none"
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <img src="/images/avatar.png" alt="semina" width="60" />
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link href="/dashboard">
                          <a className="dropdown-item">Dashboard</a>
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Rewards
                        </a>
                      </li>
                      <li onClick={() => handleLogout()}>
                        <a className="dropdown-item btn-click">
                          Sign Out
                        </a>
                      </li>
                    </ul>

                    <div className="collapse" id="collapseExample">
                      <ul className="list-group">
                        <li>
                          <a className="list-group-item" href="#">
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a className="list-group-item" href="#">
                            Settings
                          </a>
                        </li>
                        <li>
                          <a className="list-group-item" href="#">
                            Rewards
                          </a>
                        </li>
                        <li>
                          <a className="list-group-item" href="signin.html">
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/signin">
                  <a className="btn-navy">Sign In</a>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
