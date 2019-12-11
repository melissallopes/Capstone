import React, { Component } from "react";
import { Link } from "react-router-dom";
import exitLogo from "../assets/icons/logout-sign.svg";
import axios from "axios";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import SignUp from "./SignUp";
const title = "Check out my mona workout!";

export default class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      isDesk: false,
      date: "",
      isLoggedin: true,
      showing: [false, false, false, false, false]
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

  logoutHandle = e => {
    e.preventDefault();
    const logoutUrl = "http:localhost:5000/api/user/logout";
    axios

      .post(logoutUrl, {
        email: this.props.user.email
      })
      .then(res => this.setState({ isLoggedin: false }));
  };

  //  state = {
  //    date: "",
  //    isLoggedin: true,
  //    showing: [false, false, false, false, false]
  //  };

  //  logoutHandle = e => {
  //    e.preventDefault();
  //    const logoutUrl = "http:localhost:5000/api/user/logout";
  //    axios

  //      .post(logoutUrl, {
  //        email: this.props.user.email
  //      })
  //      .then(res => this.setState({ isLoggedin: false }));
  //  };

  render() {
    if (!this.state.isLoggedin) return <SignUp />;
    else {
      let workoutList = "";
      const today = new Date(),
        date =
          today.getDate() +
          "/" +
          (today.getMonth() + 1) +
          "/" +
          today.getFullYear();

      const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      if (this.props.user) {
        if (!this.state.isDesk) {
          workoutList = this.props.user.workouts.map((work, index) => {
            return (
              <div className="userpro__work-div" key={work.id}>
                {this.state.showing[index] ? (
                  <div className="userpro__work-name-box-open">
                    <button
                      className="userpro__work-day-open"
                      onClick={() => {
                        let array = this.state.showing;
                        array[index] = !this.state.showing[index];

                        this.setState({
                          showing: array
                        });
                      }}
                    >
                      {week[index]}
                    </button>
                    <Link
                      className="userpro__link"
                      to={`/exercises/${work.id}`}
                    >
                      <div className="userpro__line">
                        <label className="userpro__label">Exercise</label>
                        <h2 className="userpro__work-name">{work.name}</h2>
                      </div>
                      <div className="userpro__line">
                        <label className="userpro__label">Level</label>
                        <h2 className="userpro__work-level">{work.level}</h2>
                      </div>
                      <div className="userpro__line">
                        <label className="userpro__label">Target</label>
                        <h2 className="userpro__work-target">{work.muscles}</h2>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="userpro__work-name-box">
                    <button
                      className="userpro__work-day"
                      onClick={() => {
                        let array = this.state.showing;
                        array[index] = !this.state.showing[index];
                        this.setState({ showing: array });
                      }}
                    >
                      {week[index]}
                    </button>
                  </div>
                )}
              </div>
            );
          });
        } else {
          workoutList = this.props.user.workouts.map((work, index) => {
            return (
              <Link className="userpro__link" to={`/exercises/${work.id}`}>
                <div className="userpro__work-div" key={work.id}>
                  <div className="userpro__work-name-box">
                    <h2 className="userpro__work-day">{week[index]}</h2>
                    <div className="userpro__line-tablet">
                      <label className="userpro__label">Exercise</label>
                      <h2 className="userpro__work-name">{work.name}</h2>
                    </div>
                    <div className="userpro__line-tablet">
                      <label className="userpro__label">Level</label>
                      <h2 className="userpro__work-level">{work.level}</h2>
                    </div>
                    <div className="userpro__line-tablet">
                      <label className="userpro__label">Target</label>
                      <h2 className="userpro__work-target">{work.muscles}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            );
          });
        }
        return (
          <div className="userpro">
            <img
              className="userpro__logout"
              src={exitLogo}
              onClick={this.logoutHandle}
            ></img>
            <div className="userpro__img-box">
              <div className="userpro__imgdiv">
                <img
                  className="userpro__img"
                  src={this.props.user.image}
                  alt="user"
                />
              </div>

              <div className="userpro__info-box">
                <h2 className="userpro__date"> {date}</h2>
                <h1 className="userpro__name">
                  Welcome, {this.props.user.name}!
                </h1>
                <div className="userpro__info-us">
                  <span className="userpro__span">
                    <label className="userpro__label">weight</label>
                    <h3 className="userpro__info">{this.props.user.weight}</h3>
                  </span>
                  <span className="userpro__span">
                    <label className="userpro__label">height</label>
                    <h3 className="userpro__info">{this.props.user.height}</h3>
                  </span>
                </div>
              </div>
            </div>
            <div className="userpro__mydiv">
              <h1 className="userpro__my-work">My Workout Program</h1>
              <div className="userpro__box">
                <div className="userpro__days-tablet">
                  <h2>MON</h2>
                  <h2>TUE</h2>
                  <h2>WED</h2>
                  <h2>THU</h2>
                  <h2>FRI</h2>
                </div>
                <div className="userpro__exerc">{workoutList}</div>
                <div className="userpro__frind-routines">
                  <h2 className="userpro__frind-rout-title">
                    My friend's workout routines
                  </h2>
                  {this.props.user.access.map(friend => {
                    return (
                      <div className="userpro__div-frien">
                        <Link
                          to={`/user/${friend.email}`}
                          className="userpro__friend"
                        >
                          {friend.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="userpro__share-buttons">
                <h2 className="userpro__share-buttons-title">
                  Share your workout in your medias!{" "}
                </h2>
                <div className="userpro__medias">
                  <TwitterShareButton
                    url={`http:localhost:3000/user/${this.props.user.email}`}
                    className="userpro__share-btn"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <FacebookShareButton
                    url={String(window.location)}
                    className="userpro__share-btn"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={`http:localhost:3000/user/${this.props.user.email}`}
                    title={title}
                    className="userpro__share-btn"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        );
      } else return <div>Loading...</div>;
    }
  }
}
