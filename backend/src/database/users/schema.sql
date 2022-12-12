
CREATE DATABASE fbwftUsers;
USE fbwftUsers;

CREATE TABLE passwords (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  password VARCHAR(32) NOT NULL
);

CREATE TABLE users (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  email VARCHAR(256) NOT NULL
);

INSERT INTO users (username, email) VALUES('Plegeus', 'kill.me@vub.be');
INSERT INTO users (username, email) VALUES('Bilbo', 'second.breakfast@lotr.com');
INSERT INTO users (username, email) VALUES('Sauron', 'my.precious@lotr.com');

INSERT INTO passwords (username, password) VALUES('Plegeus', '123');
INSERT INTO passwords (username, password) VALUES('Bilbo', '456');
INSERT INTO passwords (username, password) VALUES('Sauron', '789');


