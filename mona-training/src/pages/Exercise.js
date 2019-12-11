import React, { Component } from "react";
import { Link } from "react-router-dom";
import goBack from "../assets/icons/Icon-back-arrow.svg";
import axios from "axios";

export default class Exercise extends Component {
  state = {
    exercise: undefined,
    isNextPage: false
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/exercises/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ exercise: res.data[0] });
      });
  }

  render() {
    if (this.state.exercise) {
      return (
        <div className="exercise__div">
          {this.state.isNextPage ? (
            <div>
              <button
                className="exercise__bt-back"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ isNextPage: !this.state.isNextPage });
                }}
              ></button>
              <div className="exercise__muscle-div">
                <img
                  className="exercise__muscle-img"
                  src={this.state.exercise.muscle_img}
                />
              </div>
              <div className="exercise__inst-div">
                <h2 className="exercise__label">Instructions</h2>

                <h3 className="exercise__instruc">
                  {this.state.exercise.instructions}
                </h3>
              </div>
              <div className="exercise__var-div">
                <h2 className="exercise__label">Variations</h2>
                <h3 className="exercise__variat">
                  {this.state.exercise.variations}
                </h3>
              </div>
              <div className="exercise__pre-div">
                <h2 className="exercise__label">Safety and Precautions</h2>
                <h3 className="exercise__prec">
                  {this.state.exercise.precautions}
                </h3>
              </div>
            </div>
          ) : (
            <div>
              <div className="exercise__first-line">
                <Link to="/">
                  <img className="exercise__goback" src={goBack}></img>
                </Link>
                <h1 className="exercise__name">{this.state.exercise.name}</h1>
              </div>
              <div className="exercise__title-flex">
                <div className="exercise__top">
                  <div className="exercise__title-div">
                    <div className="exercise__names-div">
                      <h2 className="exercise__title-label">Target Muscles</h2>
                      <h3 className="exercise__muscles">
                        {this.state.exercise.muscles}
                      </h3>
                    </div>
                    <div className="exercise__names-div">
                      <h2 className="exercise__title-label-level">Level</h2>
                      <h3 className="exercise__level">
                        {this.state.exercise.level}
                      </h3>
                    </div>
                  </div>

                  <img
                    className="exercise__img"
                    src={this.state.exercise.image}
                  ></img>
                </div>
                <button
                  className="exercise__bt-next"
                  onClick={event => {
                    event.preventDefault();
                    this.setState({ isNextPage: !this.state.isNextPage });
                  }}
                ></button>

                <div className="exercise__desc-div">
                  <h2 className="exercise__label">Description</h2>
                  <h3 className="exercise__desc">
                    {this.state.exercise.description}
                  </h3>
                  <div className="exercise__bft-div">
                    <h2 className="exercise__label">Benefits</h2>
                    <h3 className="exercise__bft">
                      {this.state.exercise.benefits}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else return <div>Loading...</div>;
  }
}
