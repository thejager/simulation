const axios = require('axios');
const moment = require('moment');


function now() {
    return new moment();
}

async function sleep(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    })
}

async function startSession(sessionLengthInMinutes) {
    console.log(`Starting session of length ${sessionLengthInMinutes}`);

    const stoppingTime = now().add(sessionLengthInMinutes, 'minutes');

    while (now().isBefore(stoppingTime)) {
        console.log('Sending request');
        await axios.get('http://localhost:5000/')

        await sleep(1 + (Math.random() - .5));
    }
}

function requestsPerMinute(minute) {
    const BASE_TRAFFIC_PER_MINUTE = 30;

    const trafficMultiplier = -Math.cos(4 * minute / Math.PI) + 2;

    return trafficMultiplier * BASE_TRAFFIC_PER_MINUTE;
}

function secondsSince(time) {
    return now().diff(time, 'seconds');
}

(async () => {
    const SIMULATION_LENGTH_IN_MINUTES = 10;

    const simulationStartTime = now();
    const simulationEndTime = simulationStartTime
        .clone()
        .add(SIMULATION_LENGTH_IN_MINUTES, 'minutes');
    const promises = [];

    let nRequests = 0;
    const TICKS_PER_SECONDS = 1000;

    while (now().isBefore(simulationEndTime)) {
        const minute = secondsSince(simulationStartTime) / 60;
        const probability = requestsPerMinute(minute) / (TICKS_PER_SECONDS * 60);

        if (Math.random() < probability) {
            ++nRequests;
            console.log('Sending request', minute, nRequests);
            axios.get('http://localhost:5000/');
        }

        await sleep(1000 / TICKS_PER_SECONDS);
    }

    await Promise.all(promises);
})();