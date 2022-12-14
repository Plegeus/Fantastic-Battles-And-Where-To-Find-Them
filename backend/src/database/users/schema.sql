
DROP DATABASE fbwftUsers;

CREATE DATABASE fbwftUsers;
USE fbwftUsers;

CREATE TABLE passwords (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  password VARCHAR(32) NOT NULL
);

CREATE TABLE likes (
  username VARCHAR(32) NOT NULL,
  battlename VARCHAR(128) NOT NULL
);

CREATE TABLE users (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  email VARCHAR(256) NOT NULL,
  uuid VARCHAR(64) NOT NULL,
  bio VARCHAR(1024) DEFAULT NULL,
  rating INT DEFAULT 0
);

/*INSERT INTO users (username, email, uuid) VALUES('Plegeus', 'kill.me@vub.be', '0');
INSERT INTO users (username, email, uuid) VALUES('Bilbo', 'second.breakfast@lotr.com', '1');

INSERT INTO passwords (username, password) VALUES('Plegeus', '123');
INSERT INTO passwords (username, password) VALUES('Bilbo', '123');*/


INSERT INTO users (username, email, uuid) VALUES('user1', 'mail1@mail.be', 0);
INSERT INTO users (username, email, uuid) VALUES('user2', 'mail2@mail.be', 1);
INSERT INTO users (username, email, uuid) VALUES('user3', 'mail3@mail.be', 2);
INSERT INTO users (username, email, uuid) VALUES('user4', 'mail4@mail.be', 3);
INSERT INTO users (username, email, uuid) VALUES('user5', 'mail5@mail.be', 4);

INSERT INTO passwords (username, password) VALUES('user1', '11111111');
INSERT INTO passwords (username, password) VALUES('user2', '11111111');
INSERT INTO passwords (username, password) VALUES('user3', '11111111');
INSERT INTO passwords (username, password) VALUES('user4', '11111111');
INSERT INTO passwords (username, password) VALUES('user5', '11111111');


