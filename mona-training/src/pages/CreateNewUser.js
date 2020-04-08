import React, { Component } from "react";
import axios from "axios";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";

export default class CreateNewUser extends Component {
  state = {
    user: undefined,
    isSignedup: false,
    checkedFriends: [],
    cancel: false,
  };
  handleCheckboxChange = (e) => {
    this.setState({
      checkedFriends: [...this.state.checkedFriends, e.target.value],
    });
  };

  handleChange = (event) => {
    event.preventDefault();

    const userNew = this.props.newUser.email;

    axios
      .put("http://localhost:5000/user/new", {
        email: userNew,
        weight: event.target.weight.value,
        height: event.target.height.value,
        access: [
          {
            name: "Melissa Lopes de Pina",
            email: "melissallopes@hotmail.com",
          },
          {
            name: "Monica Lima",
            email: "monicallima@hotmail.com",
          },
        ],
        workouts: [
          {
            id: 20,
            name: "TRX Chest Press",
            level: "Beginner",
            muscles: "Chest, shoulders, arms, core",
          },
          {
            id: 11,
            name: "Single Leg Bridge",
            level: "Beginner",
            muscles: "Gluteus maximus, hamstrings",
          },
          {
            id: 3,
            name: "Crossover Crunch",
            level: "Beginner",
            muscles: "Abdominal muscles, internal and external obliques",
          },
          {
            id: 6,
            name: "TRX Cross Balance Lunge",
            level: "Intermediate",
            muscles: "Quadriceps, glutes, calves, core",
          },
          {
            id: 10,
            name: "Inchworm Exercise",
            level: "Beginner",
            muscles: "Total body",
          },
        ],
      })
      .then((res) => {
        this.setState({ user: res.data[0] });

        axios
          .post("http://localhost:5000/user/access", {
            access: [
              {
                name: this.props.newUser.name,
                email: this.props.newUser.email,
              },
            ],
            emails: this.state.checkedFriends,
          })
          .then((res) => {
            if (res.status === 200) {
              sessionStorage.authToken = res.data;
            }
            this.setState({
              isSignedup: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  render() {
    if (this.state.cancel) {
      return <SignUp />;
    }
    if (this.state.isSignedup && this.state.user) {
      return <UserProfile user={this.state.user} />;
    } else {
      if (this.props.newUser && this.props.users) {
        return (
          <div className="createNew__div">
            <div className="createNew__big-div">
              <h1 className="createNew__title">Create your profile</h1>
              <div className="createNew__inf-div">
                <h1 className="createNew__user-name">
                  {this.props.newUser.name}
                </h1>
                <form className=" createNew__form" onSubmit={this.handleChange}>
                  <div className="createNew__div-info">
                    <label className="createNew__label"> WEIGHT</label>
                    <input
                      className="createNew__input"
                      type="text"
                      placeholder="weight"
                      name="weight"
                    ></input>
                  </div>
                  <div className="createNew__div-info">
                    <label className="createNew__label"> HEIGHT</label>
                    <input
                      className="createNew__input"
                      type="text"
                      placeholder="height"
                      name="height"
                    ></input>
                  </div>

                  <div className="createNew__submit">
                    <h2 className="createNew__allow-title">
                      Allow your friends to see your workout routine:
                    </h2>

                    <div className="createNew__allow">
                      {this.props.users.map((friend, index) => {
                        if (friend.email !== this.props.newUser.email) {
                          friend.checked = false;

                          return (
                            <div className="createNew__allow-div" key={index}>
                              <label>
                                <input
                                  name={friend.email}
                                  value={friend.email}
                                  onChange={this.handleCheckboxChange}
                                  type="checkbox"
                                />
                                <span className="createNew__span">
                                  {friend.name}
                                </span>
                              </label>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="createNew__buttons">
                    <button className="createNew__button-sb">Submit</button>
                    <button
                      className="createNew__button-cancel"
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ cancel: true });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      } else return <div>Loading...</div>;
    }
  }
}
