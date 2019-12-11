import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import exLogo from "../assets/icons/dumbbell4.svg";
import Linkify from "react-linkify";
import IconInsta from "../assets/icons/Icon-instagram.svg";
import IconFacebook from "../assets/icons/Icon-facebook.svg";
import IconTwiteer from "../assets/icons/Icon-twitter.svg";

export default class Footer extends Component {
  constructor() {
    super();
    this.state = {
      isDesk: false
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({
      isDesk: window.innerWidth > 767
    });
  }

  render() {
    return (
      <div>
        {this.state.isDesk ? (
          <footer className="footer">
            <div className="footer__head">
              <div className="footer__contact">
                <h1 className="footer__title">Contact Us</h1>
                <Linkify className="footer__email">
                  <p>contact@monatraining.com</p>
                </Linkify>
                <p className="footer__tel">773-245-0000</p>
              </div>
              <div className="footer__icons">
                <img className="icons" src={IconInsta} />
                <img className="icons" src={IconFacebook} />
                <img className="icons" src={IconTwiteer} />
              </div>
              <Link to="/" className="footer__deco-none">
                <h1 className="footer__logo">
                  MONA.<span className="footer__training">training</span>
                </h1>
              </Link>
            </div>
            <div className="footer__allnames"></div>
            <p className="footer__names footer__names--padding">
              Copyright Mona Training © 2019 All Rights Reserved
            </p>
          </footer>
        ) : (
          <div>
            <div className="header__mobile"></div>
          </div>
        )}
      </div>
    );
  }
}
