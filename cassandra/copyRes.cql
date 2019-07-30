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