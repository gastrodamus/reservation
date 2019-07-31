DROP TABLE reservations;
DROP TABLE restaurants;

CREATE TABLE IF NOT EXISTS restaurants (
    id         SERIAL PRIMARY KEY,
    name       varchar(40) NOT NULL,
    open       smallint NOT NULL,
    close      smallint NOT NULL,
    step       smallint NOT NULL,
    min_party  smallint NOT NULL,
    max_party  smallint NOT NULL,
    max        smallint NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
  id     int NOT NULL,
  time   int NOT NULL,
  name   varchar(40) NOT NULL,
  party  smallint NOT NULL
);

COPY restaurants (
  name,
  open,
  close,
  step,
  min_party,
  max_party,
  max
) FROM
'/Users/josefberthoud/Desktop/SDC/reservation/postRest.csv'
DELIMITER ',';

COPY reservations (
  id,
  time,
  name,
  party
) FROM
'/Users/josefberthoud/Desktop/SDC/reservation/postRes.csv'
DELIMITER ',';

ALTER TABLE reservations ADD CONSTRAINT fk_links_res_rest FOREIGN KEY (id) references restaurants(id);
