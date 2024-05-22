import http from 'k6/http';
import { sleep } from 'k6';

/** 
 * @type {import('k6/options').Options}
 */


export const options = {
    stages: [
        { duration: '3m', target: 80000 }, 
        { duration: '3m', target: 80000 }, 
        { duration: '2m', target: 0 },
        ],
    thresholds: {
    http_req_failed: [{
    threshold: 'rate<=0}.01',
    abortOnFail: true,
    }],
    http_req_duration: ['p(100)<100'], // 100% of requests should be below 100ms
        checks: ["rate==1"]                // All checks must pass
} 
};

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
};