//ENTRY point for my application

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/exercises", require("./routes/api/exercises"));
app.use("/api/user", require("./routes/api/user"));

app.listen(PORT, () => {
  console.log("listening");
});
