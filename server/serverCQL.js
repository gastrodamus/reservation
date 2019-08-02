const express = require('express');
const db = require('./db/index');
const controllers = require('./db/cassandra.js');

const router = express.Router();
const app = express();
const port = 3001;

app.use('/', router);
app.use(express.json());

router.get('/:id/reservation', controllers.getReservation);
router.post('/:id/reservation', controllers.postReservation);
router.put('/:id/reservation', controllers.changeReservation);
router.delete('/:id/reservation', controllers.cancelReservation);

app.listen(port, () => console.log(`reservations server listening on port ${port}`));
