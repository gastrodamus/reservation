CREATE TABLE reservations (
  id int,
  restaurant_name varchar,
  open smallint,
  close smallint,
  step smallint,
  min_party tinyint,
  max_party tinyint,
  max tinyint,
  time int,
  party tinyint,
  user varchar, 
  code int, 
  PRIMARY KEY (id, user)
);