CREATE TABLE reservations (
  id int,
  restaurant_name varchar,
  open smallint,
  close smallint,
  step tinyint,
  min_party tinyint,
  max_party tinyint,
  max tinyint,
  day int,
  time smallint,
  party tinyint,
  PRIMARY KEY (id, day, time, party)
);