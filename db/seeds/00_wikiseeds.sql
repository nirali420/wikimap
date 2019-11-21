-- Users
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'aaronjames', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'alexwalker', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'baileywhite', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'tylerriley', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'judecook', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'brycenspence', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'tyreemoses', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'michaellaughlin', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'roccomorgan', 'password');
INSERT INTO users
	(id, username, password)
VALUES
	(DEFAULT, 'tristandouglas', 'password');


-- maps
INSERT INTO maps
	(id, title, description, longitude, latitude, location, owner_id)
VALUES
	(DEFAULT, 'Calgary Tower', 'Its calgary trademark and visitors attraction', 51.0443, -114.0631 , point(51.0443, -114.0631), 1);
INSERT INTO maps
	(id, title, description, longitude, latitude, location, owner_id)
VALUES
	(DEFAULT, 'Calgary Zoo', 'Kids just adore the penguins and pandas', 51.0459, -114.0237 , point(51.0459,-114.0237), 2);
INSERT INTO maps
	(id, title, description, longitude, latitude, location, owner_id)
VALUES
	(DEFAULT, 'Calgary library', 'Time to get serious, read something nice', 51.046494, -114.057732 , point(51.046494, -114.057732), 3);
INSERT INTO maps
	(id, title, description, longitude, latitude, location, owner_id)
VALUES
	(DEFAULT, 'Calgary museum', 'Its the famous firefighter museum of calgary', 51.0186, -114.0359 , point(51.0186, -114.0359), 3);INSERT INTO maps
	(id, title, description, longitude, latitude, location, owner_id)
VALUES
	(DEFAULT, 'Calgary National Park', 'A place to spend time with your family', 51.4968, -115.9281, point(51.4968, -115.9281), 3);

-- markers
INSERT INTO markers
	(id, title, description, image_url, longitude, latitude, location, owner_id, map_id)
VALUES
	(DEFAULT, 'marker1', 'this is a sample description', 'http://www.google.com', 51.4968, -115.9281, point
(51.4968, -115.9281), 3, 5);
INSERT INTO markers
	(id, title, description, image_url, longitude, latitude, location, owner_id, map_id)
VALUES
	(DEFAULT, 'marker2', 'this is a sample description', 'http://www.google.com', 51.0186, -114.0359 , point
(51.0186, -114.0359), 3, 4);
INSERT INTO markers
	(id, title, description, image_url, longitude, latitude, location, owner_id, map_id)
VALUES
	(DEFAULT, 'marker3', 'this is a sample description', 'http://www.google.com', 51.0459, -114.0237 , point
(51.0459,-114.0237), 2, 2);

-- Favorites
INSERT INTO favorites
	(id, user_id, map_id)
VALUES
	(DEFAULT, 1, 1);
INSERT INTO favorites
	(id, user_id, map_id)
VALUES
	(DEFAULT, 2, 2);
INSERT INTO favorites
	(id, user_id, map_id)
VALUES
	(DEFAULT, 3, 3);

-- Collaborations
INSERT INTO collaborations
	(id, user_id, map_id)
VALUES
	(DEFAULT, 1, 1);
INSERT INTO collaborations
	(id, user_id, map_id)
VALUES
	(DEFAULT, 2, 2);
INSERT INTO collaborations
	(id, user_id, map_id)
VALUES
	(DEFAULT, 3, 3);