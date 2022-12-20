
DROP DATABASE fbwftBattles;

CREATE DATABASE fbwftBattles;
USE fbwftBattles;

CREATE TABLE tags (
  battlename VARCHAR(128) NOT NULL,
  tag VARCHAR(32) DEFAULT NULL
);

CREATE TABLE descriptions (
  battlename VARCHAR(128) PRIMARY KEY NOT NULL,
  description VARCHAR(256) DEFAULT NULL
);

CREATE TABLE battles (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  battlename VARCHAR(128) NOT NULL,
  username VARCHAR(32) NOT NULL,
  rating INT DEFAULT 0,
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

INSERT INTO tags (battlename, tag) VALUES
  ('Battle 1', 'potat'),
  ('Battle 1', 'carrot'),
  ('Battle 1', 'apple'),
  ('Battle 1', 'plum'),
  ('Battle 1', 'banana'),
  ('Battle 1', 'pinable'),
  ('Battle 1', 'potatagain'),
  ('Battle 1', 'oempaloempa'),
  ('Battle 1', 'tank'),
  ('Battle 1', 'potatobag'),
  ('Battle 1', 'tanks'),
  ('Battle 1', 'pancake');
INSERT INTO tags (battlename, tag) VALUES
  ('Battle 2', 'potat'),
  ('Battle 2', 'carrot'),
  ('Battle 2', 'apple'),
  ('Battle 2', 'plum'),
  ('Battle 2', 'banana'),
  ('Battle 2', 'pinable'),
  ('Battle 2', 'potatobag'),
  ('Battle 2', 'pancake');
INSERT INTO tags (battlename, tag) VALUES
  ('Battle 3', 'potat'),
  ('Battle 3', 'tank'),
  ('Battle 3', 'potatobag'),
  ('Battle 3', 'tanks');
INSERT INTO tags (battlename, tag) VALUES
  ('Battle 4', 'carrot');

INSERT INTO descriptions (battlename, description) VALUES
  ('Battle of Dunkirk', 'It was a battle at which lasted several ...');


INSERT INTO battles (
  battlename, 
  date,
  location_x, 
  location_y, 
  winning_faction, 
  losing_faction, 
  winning_commander, 
  losing_commander,
  winning_deaths,
  losing_deaths
) VALUES (
  'Battle 1', 
  '1910-12-31',
  1, 
  1, 
  'Germany',
  'France',
  'German Dude',
  'French Karen',
  1000,
  2000
);
INSERT INTO battles (
  battlename, 
  date,
  location_x, 
  location_y, 
  winning_faction, 
  losing_faction, 
  winning_commander, 
  losing_commander,
  winning_deaths,
  losing_deaths
) VALUES (
  'Battle 2', 
  '1930-12-31',
  2, 
  2, 
  'Germany',
  'France',
  'German Dude',
  'French Karen',
  10000,
  20000
);
INSERT INTO battles (
  battlename, 
  date,
  location_x, 
  location_y, 
  winning_faction, 
  losing_faction, 
  winning_commander, 
  losing_commander,
  winning_deaths,
  losing_deaths
) VALUES (
  'Battle 3', 
  '1950-12-31',
  10, 
  10, 
  'Germany',
  'France',
  'German Dude',
  'French Karen',
  50000,
  100000
);
INSERT INTO battles (
  battlename, 
  date,
  location_x, 
  location_y, 
  winning_faction, 
  losing_faction, 
  winning_commander, 
  losing_commander,
  winning_deaths,
  losing_deaths
) VALUES (
  'Battle 4', 
  '1980-12-31',
  35, 
  35, 
  'Germany',
  'France',
  'German Dude',
  'French Karen',
  500000,
  1200000
);
  