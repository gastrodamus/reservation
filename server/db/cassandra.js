
const client = require('./index.js');

// takes input in the form of a unix time for a requested reservation time
// returns all current slots within 3 hours of suggested time
const getReservation = (req, res) => {
  let { time } = req.query
  let { id } = req.params;
  let startRange = Number(time) - 10800;
  let endRange = Number(time) + 10800;
  let query = `select * from reservations where id=${id} and time>=${startRange} and time<=${endRange} allow filtering;`;
  client.execute(query)
    .then(result => {
      if (result.rows.length >= 1) {
        res.send(result.rows);
      } else {
        res.send(`No reservations have been made at listing ${id}.`);
      }
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    })
};

module.exports = {
  getReservation
}