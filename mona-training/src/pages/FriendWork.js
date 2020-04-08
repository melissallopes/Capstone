import React, { Component } from "react";
import { Link } from "react-router-dom";
import goBack from "../assets/icons/Icon-back-arrow.svg";
import axios from "axios";
export default class FriendWork extends Component {
  constructor() {
    super();
    this.state = {
      isDesk: false,
      friend: "",
      showing: [false, false, false, false, false],
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);

    const token = sessionStorage.authToken;
    axios

      .get(`http://localhost:5000/user/${this.props.match.params.email}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        this.setState({ friend: res.data[0] });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({
      isDesk: window.innerWidth > 767,
    });
  }

  render() {
    let workoutList = "";
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (this.state.friend) {
      if (!this.state.isDesk) {
        workoutList = this.state.friend.workouts.map((work, index) => {
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
                        showing: array,
                      });
                    }}
                  >
                    {week[index]}
                  </button>
                  <Link className="userpro__link" to={`/exercises/${work.id}`}>
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
        console.log(this.state.friend.workouts);
        workoutList = this.state.friend.workouts.map((work, index) => {
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
        <div className="friend">
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

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import goBack from "../assets/icons/Icon-back-arrow.svg";
// import axios from "axios";
// export default class FriendWork extends Component {
//   state = {
//     friend: ""
//   };

//   componentDidMount() {
//     axios
//       .get(`http://localhost:5000/api/user/${this.props.match.params.email}`)
//       .then(res => {
//         this.setState({ friend: res.data[0] });
//       });
//   }

//   render() {
//     if (this.state.friend) {
//       const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//       const workoutList = this.state.friend.workouts.map((work, index) => {
//         return (
//           <Link className="userpro__link" to={`/exercises/${work.id}`}>
//             <div className="userpro__work-div" key={work.id}>
//               <div className="userpro__work-name-box">
//                 <h2 className="userpro__work-day">{week[index]}</h2>
//                 <div className="userpro__line">
//                   <label className="userpro__label">Exercise</label>
//                   <h2 className="userpro__work-name">{work.name}</h2>
//                 </div>
//                 <div className="userpro__line">
//                   <label className="userpro__label">Level</label>
//                   <h2 className="userpro__work-level">{work.level}</h2>
//                 </div>
//                 <div className="userpro__line">
//                   <label className="userpro__label">Target</label>
//                   <h2 className="userpro__work-target">{work.muscles}</h2>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         );
//       });

//       return (
//         <div>
//           <div className="friend__div">
//             <Link to="/" className="friend__goback">
//               <img className="friend__goback" src={goBack}></img>
//             </Link>
//             <h1 className="friend__title">
//               {this.state.friend.name} Workout Program
//             </h1>
//           </div>
//           <div className="userpro__box">
//             <div className="userpro__days-tablet">
//               <h2>MON</h2>
//               <h2>TUE</h2>
//               <h2>WED</h2>
//               <h2>THU</h2>
//               <h2>FRI</h2>
//             </div>
//             <div className="userpro__exerc">{workoutList}</div>
//           </div>
//         </div>
//       );
//     } else return <div>Loading...</div>;
//   }
// }
