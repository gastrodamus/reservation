import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 150,
  duration: "1m"
};

export default function() {
  let id = Math.floor(Math.random() * 10000000);
  http.get(`http://localhost:3001/${id}`);
};