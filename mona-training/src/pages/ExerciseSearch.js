import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ExerciseSearch extends Component {
  constructor() {
    super();
    this.state = {
      exercises: "",
      filteredExercises: "",
      visible: 9,
      error: false,
      search: "",
    };
    this.loadMore = this.loadMore.bind(this);
  }
  componentDidMount() {
    const URL = "http://localhost:8000";

    axios
      .get(`${URL}/exercises`)
      .then((response) => {
        this.setState({
          exercises: response.data,
          filteredExercises: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: true,
        });
      });
  }

  ////////////////////////////

  loadMore() {
    const exLength = this.state.exercises.length;
    const currentLimit = this.state.visible;
    if (currentLimit < exLength) {
      this.setState({ visible: currentLimit + 4 });
    }
  }

  //////////////////

  filteredMuscles = () => {
    return this.state.exercises.filter((ex) => {
      let eachMuscle = ex.muscles.split(", ");
      eachMuscle = eachMuscle.map((fit) => fit.toLowerCase());

      if (eachMuscle.includes(this.state.search.toLowerCase())) {
        return ex;
      }
    });
  };

  handleChange = (event) => {
    this.setState({ search: event.target.value }, () => {
      if (this.filteredMuscles().length !== 0)
        this.setState({ filteredExercises: this.filteredMuscles() });
    });
  };

  ///////////////

  handleClick = (event) => {
    this.setState({ filteredExercises: this.state.exercises, visible: 9 });
  };

  render() {
    if (this.state.filteredExercises) {
      const exercisesData = this.state.filteredExercises
        .slice(0, this.state.visible)
        .map((ex, index) => {
          return (
            <Link className="exercise__card-link" to={`/exercises/${ex.id}`}>
              <div key={index} className="exercise__card">
                <h3 className="exercise__card-name">{ex.name}</h3>
                <img className="exercise__card-img" src={ex.image} />
              </div>
            </Link>
          );
        });

      return (
        <div className="exercise__search">
          <div className="exercise__search-div">
            <div className="exercise__search-input-box">
              <input
                type="text"
                placeholder="Search exercises by muscle"
                value={this.state.search}
                onChange={this.handleChange}
                className="exercise__search-input"
              ></input>

              <div className="exercise__search-all">{exercisesData}</div>
              <div className="exercise__search-buttons">
                <button
                  className="exercise__search-load-more"
                  onClick={this.loadMore}
                  type="button"
                ></button>
                <button
                  className="exercise__search-showall"
                  onClick={this.handleClick}
                ></button>
              </div>
            </div>
          </div>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}
