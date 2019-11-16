-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS maps
CASCADE;
DROP TABLE IF EXISTS markers
CASCADE;
DROP TABLE IF EXISTS favorites
CASCADE;
DROP TABLE IF EXISTS collaborations
CASCADE;

CREATE TABLE users
(
	id int PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password varchar(255) NOT NULL
);

CREATE TABLE maps
(
	id int PRIMARY KEY,
	title varchar(255),
	description text,
	longitude double precision NOT NULL,
	latitude double precision NOT NULL,
	owner_id int REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE markers
(
	id int PRIMARY KEY,
	title varchar(255),
	description text,
	image_url text,
	longitude double precision NOT NULL,
	latitude double precision NOT NULL,
	owner_id int REFERENCES users(id) ON DELETE CASCADE,
	map_id int REFERENCES maps(id) ON DELETE CASCADE
);

CREATE TABLE favorites
(
	id int PRIMARY KEY,
	user_id int REFERENCES users(id) ON DELETE CASCADE,
	map_id int REFERENCES maps(id) ON DELETE CASCADE
);


CREATE TABLE collaborations
(
	id int PRIMARY KEY,
	user_id int REFERENCES users(id) ON DELETE CASCADE,
	map_id int REFERENCES maps(id) ON DELETE CASCADE
);