const fs = require('fs');
const faker = require('faker');
const restaurantWriter = fs.createWriteStream('restaurants.csv');
const reservationWriter = fs.createWriteStream('reservations.csv');
const reservationWriter2 = fs.createWriteStream('reservations2.csv');
const reservationWriter3 = fs.createWriteStream('reservations3.csv');
const reservationWriter4 = fs.createWriteStream('reservations4.csv');
const reservationWriter5 = fs.createWriteStream('reservations5.csv');
const reservationWriter6 = fs.createWriteStream('reservations6.csv');
const reservationWriter7 = fs.createWriteStream('reservations7.csv');
const reservationWriter8 = fs.createWriteStream('reservations8.csv');

var count = 0;
var originalTime = 1564642800; // August 1st 2019 at 12 AM Pacific in Unix Time
var startTime = 1564707600 // August 1st 2019 at 6 PM Pacific in Unix Time
function randomRange(min, max) { // random number between min (inclusive) and max (exclusive);
 return Math.floor(Math.random() * (max - min)) + min;
}
//makes one restaurant
//and 20-70 data entries for each
const randomRestaurant = () => {
  count += 1;
  
  let restaurant = [];
  let restaurant_name = faker.name.lastName();
  let open = 5 + Math.floor(Math.random() * 10); // opens between 500 and 1400
  let close = 17 + Math.floor(Math.random() * 6); // closes between 1700 and 2200
  let step = 60 + Math.floor(Math.random() * 4) * 15; // increments of 30min, refers to reservation length
  let min_party = 2 + Math.floor(Math.random() * 3); // 2-4
  let max_party = 4 + Math.floor(Math.random() * 5); // 4-8
  let max = 5 * (3 + Math.floor(Math.random() * 8)); //15 to 50 in increments of 5
  restaurant.push(count, restaurant_name, open, close, step, min_party, max_party, max, 0, 0, 0);
  restaurant = restaurant.join(',');
  restaurant = restaurant + '\n';

  let likelihood1 = Math.random();
   let reservation_count;
   if (likelihood1 > 0.9) {
     reservation_count = 90 + Math.floor(Math.random()*20);
   } else if (likelihood1 > 0.5) {
      reservation_count = 20 + Math.floor(Math.random()*20);
   } else {
      reservation_count = 1 + Math.floor(Math.random()*3);
   }
  //50% of restaurants will have 0-5 reservations
  //45% will have 10-20
  //5% will have 70-90
  let reservations = '';
  let timestamp;
  let reservation_id = 1;
  //party size, time, day
  for (let i = 0; i < reservation_count; i++) {
    let reservationsArr = [];
    let likelihood = Math.random();
    if (likelihood > 0.3) {
      timestamp = startTime + (Math.floor(Math.random()*3) * 3600) + (Math.floor(Math.random()*4) * 86400)
    } else {
      let timeframe = close - open;
      timestamp = originalTime + (open * 3600) + (Math.floor(Math.random()*timeframe)*3600);
    }
    const reservation_size = randomRange(min_party, max_party + 1);

    reservationsArr.push(count, timestamp, reservation_size, faker.internet.userName());
    let reservationEntry = reservationsArr.join(',');
    reservationEntry += '\n';
    reservations += reservationEntry;
    reservation_id += 1;
  }
  //restaurant will be a string, reservations will be a massive string
  return [restaurant, reservations];
};

var data = 0;
const writeAll = (restaurantWriter, reservationWriter, data, encoding, callback) => {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      data = randomRestaurant();
      restaurantData = data[0];
      reservationData = data[1];
      //make if statements to write to one of 8 reservation csvs
      // if (i < 1250000) {
      //   reservationWriter = reservationWriter8;
      // } else if (i < 2500000) {
      //   reservationWriter = reservationWriter7;
      // } else if (i < 3750000) {
      //   reservationWriter = reservationWriter6;
      // } else if (i < 5000000) {
      //   reservationWriter = reservationWriter5;
      // } else if (i < 6250000) {
      //   reservationWriter = reservationWriter4;
      // } else if (i < 7500000) {
      //   reservationWriter = reservationWriter3;
      // } else if (i < 8750000) {
      //   reservationWriter = reservationWriter2;
      // } else {
      //   reservationWriter = reservationWriter;
      // }
      if (i === 0) {
        // Last time!
        restaurantWriter.write(restaurantData, encoding, callback);
        reservationWriter.write(reservationData, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        restaurantWriter.write(restaurantData, encoding, callback);
        ok = reservationWriter.write(reservationData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      reservationWriter.once('drain', write);
    }
  }
};

writeAll(restaurantWriter, reservationWriter, data, 'utf8');
