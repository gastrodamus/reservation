const express = require('express');
const path = require('path')
// const db = require('./db/index');
const controllers = require('./db/cassandra.js');

const router = express.Router();
const app = express();
const port = 3001;

app.use('/', router);
app.use(express.json());

app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

router.get('/:id/restaurant', controllers.getRestaurantInfo);

router.get('/:id/reservation', controllers.getReservation);
router.post('/:id/reservation', controllers.postReservation);
router.put('/:id/reservation', controllers.changeReservation);
router.delete('/:id/reservation', controllers.cancelReservation);

app.listen(port, () => console.log(`reservations server listening on port ${port}`));
