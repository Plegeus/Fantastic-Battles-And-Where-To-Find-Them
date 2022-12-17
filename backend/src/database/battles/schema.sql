
CREATE DATABASE fbwftBattles;
USE fbwftBattles;

CREATE TABLE tags (
  battlename VARCHAR(32) NOT NULL,
  tag VARCHAR(32) DEFAULT NULL
);

CREATE TABLE descriptions (
  battlename VARCHAR(32) PRIMARY KEY NOT NULL,
  description VARCHAR(256) DEFAULT NULL
);

CREATE TABLE battles (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  battlename VARCHAR(128) NOT NULL,
  date DATE DEFAULT NULL,
  location_x DECIMAL NOT NULL,
  location_y DECIMAL NOT NULL,
  winning_faction VARCHAR(64) DEFAULT NULL,
  losing_faction VARCHAR(64) DEFAULT NULL,
  winning_commander VARCHAR(64) DEFAULT NULL,
  losing_commander VARCHAR(64) DEFAULT NULL,
  winning_deaths INT DEFAULT NULL,
  losing_deaths INT DEFAULT NULL
);

INSERT INTO battles (
  battlename, 
  location_x, 
  location_y, 
  winning_faction, 
  losing_faction, 
  winning_commander, 
  losing_commander
) VALUES (
  'Battle of Dunkirk', 
  50.5, 
  -0.09, 
  'Germany',
  'France',
  'Gerd von Rundstedt',
  'Georges Blanchard'
);
INSERT INTO battles (
  battlename, 
  location_x, 
  location_y, 
  winning_faction, 
  winning_commander, 
  losing_commander
) VALUES (
  'Epic War of Pancakes', 
  1, 
  1, 
  'France',
  'Msr. Crepe',
  'George Crepers'
);

INSERT INTO tags (battlename, tag) VALUES
  ('Battle of Dunkirk', 'World War II'),
  ('Battle of Dunkirk', 'Germany'),
  ('Battle of Dunkirk', 'The Beach');

INSERT INTO descriptions (battlename, description) VALUES
  ('Battle of Dunkirk', 'It was a battle at which lasted several ...');


  