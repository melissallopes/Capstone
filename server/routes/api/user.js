const express = require("express");
const router = express.Router();
const userFile = __dirname + "/../../model/users.json";
let users = require(userFile);
const helper = require("../../helper/helper");
const bcrypt = require("bcrypt");

/////
const jwt = require("jsonwebtoken");
const jsonSecretKey = "Blablabla";
/////

// AUTHORIZATION ////
router.use((req, res, next) => {
  // Signup and login are public URLs that don't require a token
  if (
    req.url === "/signup" ||
    req.url === "/login" ||
    req.url === "/new" ||
    req.url === "/access" ||
    req.url === "/logout" ||
    req.url === "/"
  )
    next();
  else {
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
  }
});

function getToken(req) {
  return req.headers.authorization;
}
////////////////////////////

router.get("/", (req, res) => {
  res.json(users);
});
/////// LOGIN
router.post("/login", (req, res) => {
  const user = users.find(
    (user) => user.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (user && req.body.password === JSON.stringify(user.password)) {
    user.isLoggedin = true;

    let token = jwt.sign({ email: user.email }, jsonSecretKey);

    helper.towriteJSONFile(userFile, users);
    res.status(200).json({ token: token, user: user });
  } else {
    res.json({ status: "Invalid email/password combination." });
  }
});

//////////// LOGOUT
router.post("/logout", (req, res) => {
  const user = users.find(
    (user) => user.email.toLowerCase() === req.body.email.toLowerCase()
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
router.post("/signup", async (req, res) => {
  const {
    email,
    name,
    image,
    weight,
    height,
    access,
    workouts,
    isLoggedin,
  } = req.body;

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const user = users.find(
    (user) => user.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (hashPassword) {
    if (!user) {
      const newUser = {
        name: name,
        email: email,
        password: hashPassword,
        image: image,
        weight: weight,
        height: height,
        access: access,
        workouts: workouts,
        isLoggedin: isLoggedin,
      };

      users.push(newUser);
      res.status(201);
      helper.towriteJSONFile(userFile, users);
      res.json(newUser);
    } else {
      res.json({ status: `User with ${email} already exists` });
    }
  }
});

////// PROFILE
router.get("/profile", (req, res) => {
  const email = req.decode["email"];
  const user = users.find((user) => user.email === email);

  if (user) {
    user.isLoggedin = true;
  }
  helper.towriteJSONFile(userFile, users);
  res.json(user);
});

////////// GET ONE USER
router.get("/:email", (req, res) => {
  const found = users.some((us) => us.email === req.params.email);
  //some returns a Boolean value
  if (found) {
    res.json(users.filter((us) => us.email === req.params.email));
  } else {
    res
      .status(400)
      .json({ errorMessage: `User with ID:${req.params.email} not found` });
  }
});

////PUT

router.put("/new", (req, res) => {
  const requestUser = req.body.email;
  let user = [];
  users = users.map((u) => {
    let newUser = { ...u };

    if (u.email === requestUser) {
      user.push(newUser);

      newUser.weight = req.body.weight;
      newUser.height = req.body.height;
      newUser.access = req.body.access;
      newUser.workouts = req.body.workouts;
      newUser.isLoggedin = true;
    }
    return newUser;
  });

  helper.towriteJSONFile(userFile, users);
  res.json(user);
});

//////POST FRIENDS ACCOUNT
router.post("/access", (req, res) => {
  if (req.body.emails) {
    req.body.emails.map((email) => {
      users.forEach((user) => {
        if (user.email === email) {
          const newAccess = {
            name: req.body.access[0].name,
            email: req.body.access[0].email,
          };
          user.access.push(newAccess);
        }
      });
    });
  }
  helper.towriteJSONFile(userFile, users);

  let token = jwt.sign({ email: req.body.access[0].email }, jsonSecretKey);

  if (token) {
    res.status(200).json(token);
  } else {
    res.json({ status: "Invalid email/password combination." });
  }
});

module.exports = router;
