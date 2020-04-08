const express = require("express");
const router = express.Router();
const exercisesFile = __dirname + "/../../model/exercises.json";
let exercises = require(exercisesFile);
const jwt = require("jsonwebtoken");
const jsonSecretKey = "Blablabla";

//  Get all
router.get("/", (req, res) => {
  res.json(exercises);
});

////////////////////////////
router.use((req, res, next) => {
  const token = getToken(req);
  if (token) {
    if (
      jwt.verify(token, jsonSecretKey, (err, decoded) => {
        if (err) {
          res.status(403).json({ sucess: false, message: "No token" });
        } else {
          req.decode = jwt.decode(token);
          next();
        }
      })
    );
  }
});

function getToken(req) {
  return req.headers.authorization;
}
////////////////////////////

router.get("/:id", (req, res) => {
  const found = exercises.some((ex) => ex.id === Number(req.params.id));

  if (found) {
    res.json(exercises.filter((ex) => ex.id === Number(req.params.id)));
  } else {
    res
      .status(400)
      .json({ errorMessage: `User with ID:${req.params.id} not found` });
  }
});

module.exports = router;
