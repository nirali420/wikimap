DROP TABLE IF EXISTS collaborations
CASCADE;

CREATE TABLE collaborations
(
	id SERIAL PRIMARY KEY,
	user_id int REFERENCES users(id) ON DELETE CASCADE,
	map_id int REFERENCES maps(id) ON DELETE CASCADE
);