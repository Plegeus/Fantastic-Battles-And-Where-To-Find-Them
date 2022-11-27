
CREATE DATABASE users_info;
USE users_info;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32) NOT NULL,
  firstname VARCHAR(32) NOT NULL,
  lastname VARCHAR(32) NOT NULL
);

INSERT INTO users (username, firstname, lastname) VALUES
  ('Plegeus', 'Timoty', 'Gielkens'),
  ('Burglar', 'Bilbo', 'Baggins');
