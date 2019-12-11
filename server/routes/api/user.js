const express = require("express");
const router = express.Router();
const userFile = __dirname + "/../../model/users.json";
let users = require(userFile);
const helper = require("../../helper/helper");

router.get("/", (req, res) => {
  res.json(users);
});
/////// LOGIN
router.post("/login", (req, res) => {
  const user = users.find(
    user => user.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (user && req.body.password === JSON.stringify(user.password)) {
    user.isLoggedin = true;

    helper.towriteJSONFile(userFile, users);
    res.json(user);
  } else {
    res.json({ status: "Invalid email/password combination." });
  }
});

//////////// LOGOUT
router.post("/logout", (req, res) => {
  const user = users.find(
    user => user.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (user) {
    user.isLoggedin = false;
    helper.towriteJSONFile(userFile, users);
    res.json(user);
  } else {
    res.json({ status: "Invalid email/password combination." });
  }
});

/////////SIGN UP
router.post("/signup", (req, res) => {
  const {
    email,
    name,
    password,
    image,
    weight,
    height,
    access,
    workouts,
    isLoggedin
  } = req.body;

  const user = users.find(
    user => user.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (!user) {
    const newUser = {
      name: name,
      email: email,
      password: password,
      image: image,
      weight: weight,
      height: height,
      access: access,
      workouts: workouts,
      isLoggedin: isLoggedin
    };

    users.push(newUser);
    res.status(201);
    helper.towriteJSONFile(userFile, users);
    res.json(newUser);
  } else {
    res.json({ status: `User with ${email} already exists` });
  }
});

////////// GET ONE USER
router.get("/:email", (req, res) => {
  const found = users.some(us => us.email === req.params.email);
  //some returns a Boolean value
  if (found) {
    res.json(users.filter(us => us.email === req.params.email));
  } else {
    res
      .status(400)
      .json({ errorMessage: `User with ID:${req.params.email} not found` });
  }
});

////PUT
router.put("/:email", (req, res) => {
  const requestUser = req.params.email;
  let user = [];
  users = users.map(u => {
    let newUser = { ...u };

    if (u.email === requestUser) {
      user.push(newUser);
      //newUser.image = req.body.image;
      newUser.weight = req.body.weight;
      newUser.height = req.body.height;
      newUser.access = req.body.access;
      newUser.workouts = req.body.workouts;
      newUser.isLoggedin = true;
    }
    return newUser;
  });

  helper.towriteJSONFile(userFile, users);
  console.log(user);
  res.json(user);
});

//////POST FRIENDS ACCOUNT
router.post("/access", (req, res) => {
  console.log(req.body);
  if (req.body.emails) {
    req.body.emails.map(email => {
      users.forEach(user => {
        if (user.email === email) {
          const newAccess = {
            name: req.body.access[0].name,
            email: req.body.access[0].email
          };
          user.access.push(newAccess);
        }
      });
    });
  }
  helper.towriteJSONFile(userFile, users);
  res.json(users);
});

module.exports = router;
