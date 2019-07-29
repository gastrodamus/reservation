COPY reservations (
  id, 
  time, 
  party,
  user 
) 
 FROM
 '/Users/josefberthoud/Desktop/SDC/reservation/reservations.csv'
 WITH DELIMITER=','
 AND HEADER=FALSE;