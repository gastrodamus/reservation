COPY reservations (
  id,
  time,
  party
) 
 FROM
 '/Users/josefberthoud/Desktop/SDC/reservation/reservations.csv'
 WITH DELIMITER=','
 AND HEADER=FALSE;