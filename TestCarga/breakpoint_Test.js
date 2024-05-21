import http from 'k6/http';
import { sleep } from 'k6';

/** 
 * @type {import('k6/options').Options}
 */

export const options = {
    scenarios: {
        breakpoint: {
            // Key configurations for breakpoint in this section
            executor: 'ramping-arrival-rate', // Incrementa la carga exponencial
            preAllocatedVUs: 1000, //VUs alocados inicialmente
            maxVUs: 1e7, //VUs maximo
            stages: [
                { duration: '10m', target: 100000 }, // just slowly ramp-up to a HUGE load
            ]
        }
    },
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<=0.01',
            abortOnFail: true,
        }],
    }
};
export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
};