
CREATE DATABASE fbwftUsers;
USE fbwftUsers;

CREATE TABLE passwords (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  password VARCHAR(32) NOT NULL
);

CREATE TABLE battles (
  username VARCHAR(32) NOT NULL,
  battlename VARCHAR(128) NOT NULL
);

CREATE TABLE users (
  username VARCHAR(32) PRIMARY KEY NOT NULL,
  email VARCHAR(256) NOT NULL,
  uuid VARCHAR(64) NOT NULL,
  rating INT DEFAULT 0,
  bio VARCHAR(1024) DEFAULT NULL
);

INSERT INTO users (username, email, uuid) VALUES('Plegeus', 'kill.me@vub.be', '0');
INSERT INTO users (username, email, uuid) VALUES('Bilbo', 'second.breakfast@lotr.com', '1');
INSERT INTO users (username, email, uuid) VALUES('Sauron', 'my.precious@lotr.com', '2');

INSERT INTO passwords (username, password) VALUES('Plegeus', '123');
INSERT INTO passwords (username, password) VALUES('Bilbo', '456');
INSERT INTO passwords (username, password) VALUES('Sauron', '789');

INSERT INTO battles (username, battlename) VALUES('Bilbo', 'Battle of Dunkirk');
INSERT INTO battles (username, battlename) VALUES('Bilbo', 'Battle 1');
INSERT INTO battles (username, battlename) VALUES('Plegeus', 'Battle 2');
INSERT INTO battles (username, battlename) VALUES('Sauron', 'Battle 3');
INSERT INTO battles (username, battlename) VALUES('Sauron', 'Battle 4');


