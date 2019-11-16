DROP TABLE IF EXISTS maps
CASCADE;

CREATE TABLE maps
(
	id int PRIMARY KEY,
	title varchar(255),
	description text,
	longitude double precision NOT NULL,
	latitude double precision NOT NULL,
	owner_id int REFERENCES users(id) ON DELETE CASCADE
);