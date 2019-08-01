DROP KEYSPACE IF EXISTS gastrodamus;
DROP TABLE IF EXISTS gastrodamus.reservations;

CREATE KEYSPACE IF NOT EXISTS gastrodamus WITH REPLICATION = { 
  'class' : 'SimpleStrategy', 
  'replication_factor' : 1 
};

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

COPY reservations (
  id,
  restaurant_name,
  open,
  close,
  step,
  min_party,
  max_party,
  max,
  time,
  party,
  user,
  code
)
FROM 
'/Users/josefberthoud/Desktop/SDC/reservation/restaurants.csv' 
WITH DELIMITER=',' 
AND HEADER=FALSE;

COPY reservations (
  id, 
  time, 
  party,
  user,
  code  
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations.csv'
WITH DELIMITER=','
AND HEADER=FALSE;