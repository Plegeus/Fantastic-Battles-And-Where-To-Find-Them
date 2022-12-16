
CREATE DATABASE fbwftUsers;
USE fbwftUsers;

CREATE TABLE passwords (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  password VARCHAR(32) NOT NULL
);

CREATE TABLE users (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  email VARCHAR(256) NOT NULL,
  uuid VARCHAR(64) NOT NULL,
  rating INT DEFAULT 0
);

INSERT INTO users (username, email, uuid) VALUES('Plegeus', 'kill.me@vub.be', '0');
INSERT INTO users (username, email, uuid) VALUES('Bilbo', 'second.breakfast@lotr.com', '1');
INSERT INTO users (username, email, uuid) VALUES('Sauron', 'my.precious@lotr.com', '2');

INSERT INTO passwords (username, password) VALUES('Plegeus', '123');
INSERT INTO passwords (username, password) VALUES('Bilbo', '456');
INSERT INTO passwords (username, password) VALUES('Sauron', '789');


