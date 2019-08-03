import http from "k6/http";
import faker from "cdnjs.com/libraries/Faker";

export let options = {
  vus: 150,
  duration: "1m"
};

// randomize 1 - 10mil id
// randomize a username
// randomize a party size 2-8
export default function() {
  let id = Math.floor(Math.random() * 10000000);
  let user = faker.internet.userName();
  let party = Math.floor(2 + (Math.random() * 7));
  http.post(`http://localhost:3001/${id}/reservation?party=${party}&user=${user}`);
};