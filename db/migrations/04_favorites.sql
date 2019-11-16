DROP TABLE IF EXISTS favorites
CASCADE;

CREATE TABLE favorites
(
	id int PRIMARY KEY,
	user_id int REFERENCES users(id) ON DELETE CASCADE,
	map_id int REFERENCES maps(id) ON DELETE CASCADE
);
