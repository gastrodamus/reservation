DROP KEYSPACE IF EXISTS gastrodamus;
DROP TABLE IF EXISTS gastrodamus.reservations;

-- CREATE KEYSPACE IF NOT EXISTS gastrodamus WITH REPLICATION = { 
--   'class' : 'SimpleStrategy', 
--   'replication_factor' : 1 
-- };

CREATE KEYSPACE IF NOT EXISTS gastrodamus WITH REPLICATION = { 
  'class' : 'NetworkTopologyStrategy', 
  'us-east-2' : 2 
};

CREATE TABLE gastrodamus.reservations (
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
  PRIMARY KEY (id, user)
);

COPY gastrodamus.reservations (
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
  user
)
FROM 
'/Users/josefberthoud/Desktop/SDC/reservation/restaurants.csv' 
WITH DELIMITER=',' 
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations.csv'
WITH DELIMITER=','
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations2.csv'
WITH DELIMITER=','
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations3.csv'
WITH DELIMITER=','
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations4.csv'
WITH DELIMITER=','
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations5.csv'
WITH DELIMITER=','
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations6.csv'
WITH DELIMITER=','
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations7.csv'
WITH DELIMITER=','
AND HEADER=FALSE;

COPY gastrodamus.reservations (
  id, 
  time, 
  party,
  user
) 
FROM
'/Users/josefberthoud/Desktop/SDC/reservation/reservations8.csv'
WITH DELIMITER=','
AND HEADER=FALSE;