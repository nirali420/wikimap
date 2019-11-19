DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password varchar(255) NOT NULL
);