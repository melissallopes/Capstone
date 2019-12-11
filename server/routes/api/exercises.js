const express = require("express");
const router = express.Router();
const exercisesFile = __dirname + "/../../model/exercises.json";
let exercises = require(exercisesFile);
const helper = require("../../helper/helper");

//  Get all
router.get("/", (req, res) => {
  res.json(exercises);
});

router.get("/:id", (req, res) => {
  const found = exercises.some(ex => ex.id === Number(req.params.id));

  if (found) {
    res.json(exercises.filter(ex => ex.id === Number(req.params.id)));
  } else {
    res
      .status(400)
      .json({ errorMessage: `User with ID:${req.params.id} not found` });
  }
});

module.exports = router;
