
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const users = require('./users/database');

app.use(bodyParser.json());


async function receive(url, callback) {
  app.post(url, (req, res) => {
    console.log(">>> Received POST request @ " + url + " <<<");
    callback(req);
  });
}
async function send(url, callback) {
  app.get(url, (req, res) => {
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
  
  let data = req.body.data;

  users.userExists(data.username).then(exists => {
    if (exists) {
      users.getUser(data.username).then(user => {
        send("/api/login/succes", res => {
          res.json(user);
        });
      })
    }
    else {
        send("/api/login/failure", res => {
          res.json({
            username: data.username,
            password: data.password,
          });
        });
    }
  })

});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


