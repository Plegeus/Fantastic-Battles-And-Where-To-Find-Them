
CREATE DATABASE fbwftUsers;
USE fbwftUsers;

CREATE TABLE passwords (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  password VARCHAR(32) NOT NULL
);

CREATE TABLE users (
  username VARCHAR(32) PRIMARY KEY NOT NULL
);

INSERT INTO users (username) VALUES('Plegeus');
INSERT INTO users (username) VALUES('Bilbo');

INSERT INTO passwords (username, password) VALUES('Plegeus', '123');
INSERT INTO passwords (username, password) VALUES('Bilbo', '456');
