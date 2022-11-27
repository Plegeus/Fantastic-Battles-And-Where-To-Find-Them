
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

const bodyParser = require('body-parser');

const users = require('./users/database')


app.use(bodyParser.json());

app.get("/api", (req, res) => {
  console.log("get...");
  res.json({"hello": "world"});
});
app.post("/api", (req, res) => {
  console.log("post...");
  console.log(req.body.counter);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


