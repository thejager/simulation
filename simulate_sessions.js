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


(async () => {
    const SIMULATION_LENGTH_IN_MINUTES = 10;
    const SESSIONS_PER_PIVOT = 1;

    const simulationEndTime = now().add(SIMULATION_LENGTH_IN_MINUTES, 'minutes');
    const promises = [];

    while (now().isBefore(simulationEndTime)) {
        for (let i = 0; i < SESSIONS_PER_PIVOT; ++i) {
            promises.push(startSession(5));
        }
        await sleep(10);
    }

    await Promise.all(promises);
})();