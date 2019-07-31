const fs = require('fs');
const faker = require('faker');
const restWriter = fs.createWriteStream('postRest.csv');
const resWriter = fs.createWriteStream('postRes.csv');

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
  //one line of csv for restaurant
  //comma separated values
  //with a \n at the end of each line
  //make array of values
  //join with commas which casts all the numbers to strings
  //add a '\n' behind
  let restaurant = [];
  let restaurant_name = faker.name.lastName();
  let open = 5 + Math.floor(Math.random() * 10); // opens between 500 and 1400
  let close = 17 + Math.floor(Math.random() * 6); // closes between 1700 and 2200
  let step = 60 + Math.floor(Math.random() * 4) * 15; // increments of 30min, refers to reservation length
  let min_party = 2 + Math.floor(Math.random() * 3); // 2-4
  let max_party = 4 + Math.floor(Math.random() * 5); // 4-8
  let max = 5 * (3 + Math.floor(Math.random() * 8)); //15 to 50 in increments of 5
  restaurant.push(restaurant_name, open, close, step, min_party, max_party, max);
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
    reservationsArr.push(count, timestamp, faker.name.lastName(), reservation_size);
    let reservationEntry = reservationsArr.join(',');
    reservationEntry += '\n';
    reservations += reservationEntry;
  }
  //restaurant will be a string, reservations will be a massive string
  return [restaurant, reservations];
};

var data = 0;
const writeAll = (restWriter, resWriter, data, encoding, callback) => {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      data = randomRestaurant();
      restaurantData = data[0];
      reservationData = data[1];
      if (i === 0) {
        // Last time!
        restWriter.write(restaurantData, encoding, callback);
        resWriter.write(reservationData, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        restWriter.write(restaurantData, encoding, callback);
        ok = resWriter.write(reservationData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      resWriter.once('drain', write);
    }
  }
};

writeAll(restWriter, resWriter, data, 'utf8');
