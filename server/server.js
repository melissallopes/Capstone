//ENTRY point for my application

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/exercises", require("./routes/api/exercises"));
app.use("/user", require("./routes/api/user"));

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
//   console.log("listening");

// app.listen(port);

app.listen(PORT, () => {
  console.log("listening");
});
