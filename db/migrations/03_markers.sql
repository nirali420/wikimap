DROP TABLE IF EXISTS markers
CASCADE;

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