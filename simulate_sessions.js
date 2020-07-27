const axios = require('axios');
const moment = require('moment');


function now() {
    return new moment();
}

async function sleep(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
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
    return 25;
}

function timeSince(time) {
    return now().subtract(time);
}

(async () => {
    const SIMULATION_LENGTH_IN_MINUTES = 10;

    const simulationStartTime = now();
    const simulationEndTime = simulationStartTime
        .clone()
        .add(SIMULATION_LENGTH_IN_MINUTES, 'minutes');
    const promises = [];

    let nRequests = 0;
    while (now().isBefore(simulationEndTime)) {
        const minute = timeSince(simulationStartTime).minutes();

        const probability = requestsPerMinute(minute) / 60;

        if (Math.random() < probability) {
            ++nRequests;
            axios.get('http://localhost:5000/');
        }

        await sleep(1);
    }

    await Promise.all(promises);
})();