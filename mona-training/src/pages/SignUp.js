import React, { Component } from "react";
import UserProfile from "./UserProfile";
import FriendWork from "./FriendWork";
import axios from "axios";

// import Logo from "../assets/images/Mona training.jpg";
import CreateNewUser from "./CreateNewUser";

const loginUrl = "http://localhost:5000/user/login";
const signUpUrl = "http://localhost:5000/user/signup";

class SignUp extends Component {
  state = {
    allUsers: "",
    user: "",
    newUser: "",
    status: "",
    showSignUp: false,
    isLoggedin: false,
    isSignedup: false,
  };

  componentDidMount() {
    // axios.get("http://localhost:5000/user").then((res) => {
    //   const currentUser = res.data.find(
    //     (profile) => profile.isLoggedin === true
    //   );
    //   if (currentUser) this.setState({ user: currentUser, isLoggedin: true });
    // });
    axios.get("http://localhost:5000/user").then((res) => {
      this.setState({ allUsers: res.data });
    });
  }

  ///////login and sign up
  login = (event) => {
    event.preventDefault();
    axios
      .post(loginUrl, {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.authToken = res.data.token;
        }
        this.setState({
          user: res.data.user,
          isLoggedin: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    event.target.reset();
  };

  signUp = (event) => {
    event.preventDefault();
    axios
      .post(signUpUrl, {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
        image:
          "https://myevent.com/assets/myevent/common/img/user.png?1507668157",
        weight: "",
        height: "",
        access: [],
        workouts: [],
        isLoggedin: false,
      })
      .then((res) => {
        this.setState({
          newUser: res.data,
          isSignedup: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    event.target.reset();
  };

  render() {
    if (this.state.isSignedup && this.state.newUser) {
      return (
        <CreateNewUser
          newUser={this.state.newUser}
          users={this.state.allUsers}
          logout={this.logout}
        />
      );
    }
    if (this.state.user && this.state.isLoggedin) {
      return <UserProfile user={this.state.user} />;
    } else {
      return this.state.showSignUp ? (
        <div className="signup">
          <h1 className="signup__out-title">
            MONA.<span className="signup__training">training</span>
          </h1>
          <form className="signup__form" onSubmit={this.signUp}>
            <input
              className="signup__input"
              type="text"
              placeholder="name"
              name="name"
            />
            <input
              className="signup__input"
              type="text"
              placeholder="email"
              name="email"
            />
            <input
              className="signup__input"
              type="password"
              placeholder="password"
              name="password"
            />

            <div>
              <button className="signup__button" type="submit">
                Get Started!
              </button>
              <hr className="signup__hr" />
              <div className="signup__bt">
                <a
                  className="signup__link"
                  href="."
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({ showSignUp: false });
                  }}
                >
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
          <div></div>
        </div>
      ) : (
        <div className="signup">
          <h1 className="signup__out-title">
            MONA.<span className="signup__training">training</span>
          </h1>
          <form className="signup__form" onSubmit={this.login}>
            <input
              className="signup__input"
              type="email"
              placeholder="email"
              name="email"
            />
            <input
              className="signup__input"
              type="password"
              placeholder="password"
              name="password"
            />

            <div className="signup__last-line">
              <button className="signup__button" type="submit">
                Start Workout!
              </button>
              <hr className="signup__hr" />
              <div className="signup__bt">
                <a
                  className="signup__link"
                  href="."
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({ showSignUp: true });
                  }}
                >
                  Don't have an account?
                </a>
              </div>
            </div>
          </form>
          <div></div>
        </div>
      );
    }
  }
}

export default SignUp;
