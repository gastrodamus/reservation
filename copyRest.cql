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
  party
)
 FROM 
 '/Users/josefberthoud/Desktop/SDC/reservation/restaurants.csv' 
 WITH DELIMITER=',' 
 AND HEADER=FALSE;