-- Markers
-- INSERT INTO markers
-- 	(id, title, description, image_url, longitude, latitude, owner_id, map_id)
-- VALUES
-- 	(DEFAULT, 'marker1', 'this is a sample description', 'http://www.google.com', 51.505, -0.09, 1, 1);
-- INSERT INTO markers
-- 	(id, title, description, image_url, longitude, latitude, owner_id, map_id)
-- VALUES
-- 	(DEFAULT, 'marker2', 'this is a sample description', 'http://www.google.com', 51.505, -0.09, 1, 1);
-- INSERT INTO markers
-- 	(id, title, description, image_url, longitude, latitude, owner_id, map_id)
-- VALUES
-- 	(DEFAULT, 'marker3', 'this is a sample description', 'http://www.google.com', 51.505, -0.09, 1, 3);


	INSERT INTO markers
	(id, title, description, image_url, longitude, latitude, location, owner_id, map_id)
VALUES
	(DEFAULT, 'marker1', 'this is a sample description', 'http://www.google.com', 51.505, -0.09, point(51.505, -0.09), 1, 1);
INSERT INTO markers
	(id, title, description, image_url, longitude, latitude, location, owner_id, map_id)
VALUES
	(DEFAULT, 'marker2', 'this is a sample description', 'http://www.google.com', 51.505, -0.10, point(51.505, -0.09), 1, 1);
INSERT INTO markers
	(id, title, description, image_url, longitude, latitude, location, owner_id, map_id)
VALUES
	(DEFAULT, 'marker3', 'this is a sample description', 'http://www.google.com', 51.505, -0.11, point(51.505, -0.09), 1, 3);
