
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

const changeReservation = (req, res) => {
  let code = Math.floor(Date.now() / 1000);
  let { user } = req.query;
  let { id } = req.params;
  // needs the id
  // needs the username
  // adjusts time? probably most common use case
  // or optionall have user request to change a specific column using the query param
  // i.e. change username or change time or change party size
  // just change time to the current time on insertion
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

module.exports = {
  getReservation,
  postReservation,
  changeReservation,
}