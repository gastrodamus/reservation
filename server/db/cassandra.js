
const client = require('./index.js');

// takes input in the form of a unix time for a requested reservation time
// returns all current slots within 3 hours of suggested time
const getReservation = (req, res) => {
  let { time } = req.query;
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

const postReservation = (req, res) => {
  let code = Math.floor(Date.now() / 1000);
  let { party, user } = req.query;
  let { id } = req.params;
  let query = `insert into reservations ( id, user, code, party, time ) values ( ${Number(id)}, '${user}', ${code}, ${Number(party)}, ${code});`
  client.execute(query)
    .then(result => {
      if (result) {
        res.send(201);
      }
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    })
};

// currently only changes time of a reservation by given user at given restaurant
// can refactor to add other modification options: party, username, etc
const changeReservation = (req, res) => {
  let code = Math.floor(Date.now() / 1000);
  let { user } = req.query;
  let { id } = req.params;
  let query = `update reservations set time = ${code} where user = '${user}' and id = ${id} IF EXISTS;`
  client.execute(query)
    .then(result => {
      if (result) {
        res.send(200);
      }
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    })
};

const cancelReservation = (req, res) => {
  console.log('received request to cancel');
  let { user } = req.query;
  let { id } = req.params;
  let query = `DELETE FROM reservations WHERE id=${id} and user='${user}' IF EXISTS;`;
  client.execute(query)
    .then(result => {
      if (result) {
        res.send(200);
      }
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    })
};

module.exports = {
  getReservation,
  postReservation,
  changeReservation,
  cancelReservation,
}