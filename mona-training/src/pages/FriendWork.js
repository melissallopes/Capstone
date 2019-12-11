import React, { Component } from "react";
import { Link } from "react-router-dom";
import goBack from "../assets/icons/Icon-back-arrow.svg";
import axios from "axios";
export default class FriendWork extends Component {
  state = {
    friend: ""
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/user/${this.props.match.params.email}`)
      .then(res => {
        this.setState({ friend: res.data[0] });
      });
  }

  render() {
    if (this.state.friend) {
      const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const workoutList = this.state.friend.workouts.map((work, index) => {
        return (
          <Link className="userpro__link" to={`/exercises/${work.id}`}>
            <div className="userpro__work-div" key={work.id}>
              <div className="userpro__work-name-box">
                <h2 className="userpro__work-day">{week[index]}</h2>
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
              </div>
            </div>
          </Link>
        );
      });

      return (
        <div>
          <div className="friend__div">
            <Link to="/" className="friend__goback">
              <img className="friend__goback" src={goBack}></img>
            </Link>
            <h1 className="friend__title">
              {this.state.friend.name} Workout Program
            </h1>
          </div>
          <div className="userpro__box">
            <div className="userpro__days-tablet">
              <h2>MON</h2>
              <h2>TUE</h2>
              <h2>WED</h2>
              <h2>THU</h2>
              <h2>FRI</h2>
            </div>
            <div className="userpro__exerc">{workoutList}</div>
          </div>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}
