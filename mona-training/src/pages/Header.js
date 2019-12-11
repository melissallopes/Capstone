import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import exIcon from "../assets/icons/dumbbell.svg";
import userIcon from "../assets/icons/user.svg";
//import houseIcon from "../assets/icons/menu-symbo";

export default class Header extends Component {
  render() {
    return (
      <div className="header__return">
        <header className="header">
          <div className="header__elements">
            <Link to="/" className="header__deco-none">
              <h1 className="header__logo-image">
                MONA.<span className="header__training">training</span>
              </h1>
            </Link>
            <div className="header__nav">
              <NavLink
                to="/exercises"
                className="header__link"
                activeClassName="header__link-active"
              >
                <img className="header__link" src={exIcon} />
              </NavLink>
              <NavLink
                to="/"
                className="header__link"
                activeClassName="header__link-active"
              >
                <img className="header__link" src={userIcon} />
              </NavLink>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
