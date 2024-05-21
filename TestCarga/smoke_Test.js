import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    'vus': 5,
    'duration': '1m',
    thresholds: {
      http_req_failed: [{
          threshold: 'rate==0',
          abortOnFail: true,
      }],
      http_req_duration : ['p(100)<100'],
      checks: ["rate==1"]
    }
  }
  
  export default function () {
  
      // define URL and payload
      const url = "http://localhost:8080/medico/1";
  
      // send a post request and save response as a variable
      const res = http.get(url);
  
      // Log the request body
      //console.log(res.body);
      // check that response is 200
      check(res, {
          "response code was 200": (res) => res.status == 200,
      });
      //sleep(1);
  }