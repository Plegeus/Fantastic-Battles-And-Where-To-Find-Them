
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const users = require('./users/database');

app.use(bodyParser.json());


async function receive(url, callback) {
  app.post(url, (req, res) => {
    console.log("Received POST request @ " + url);
    callback(req);
  });
}
async function send(url, callback) {
  app.get(url, (req, res) => {
    console.log("Received GET request @ " + url);
    callback(res);
  });
}


send("/api", (res) => {
  res.json({"hello": "world"});
});
receive("/api", (req) => {
  console.log(req.body);
});

receive("/api/login", (req) => {
  console.log(req.body);
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


