import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 40000 },   // Spike to 40000 users in 1 minute
        { duration: '1m', target: 0 },     // Ramp down to 0 users in 1 minute
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<=0.005',       // Requests with a failure rate less than 0.5%
            abortOnFail: true,
        }],
        http_req_duration: ['p(100)<100'], // 100% of requests should be below 100ms
        checks: ["rate==1"]                // All checks must pass
    }
}

export default function () {
    // Define URL
    const url = http.get('http://localhost:8080/medico/1');
}
