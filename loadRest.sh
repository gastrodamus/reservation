cassandra-loader -f /Users/josefberthoud/Desktop/SDC/reservation/restaurants.csv
 -host localhost 
 -schema "gastrodamus.reservations(id,
  restaurant_name,
  open,
  close,
  step,
  min_party,
  max_party,
  max,
  time,
  party,
  reservation_id)"