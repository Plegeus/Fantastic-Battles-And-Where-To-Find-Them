
function message(type, body) {
  return {
    type: type,
    body: body,
  }
}

function login(username, password) {
  return message(
    'login',
    {
      username: username,
      password: password,
    }
  );
}
function registration() {
  return message(
    'registration',
    {
      foo: "Registration!",
    }
  );
}


module.exports = {
  login,
  registration
}
