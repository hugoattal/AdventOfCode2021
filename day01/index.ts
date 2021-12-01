function run1(data: Array<string>): number {
    let previousMeasurement = 1000000;
    let increasedMeasurement = 0;

    for (const line of data) {
        const measurement = parseInt(line);
        if (measurement > previousMeasurement) {
            increasedMeasurement++;
        }
        previousMeasurement = measurement
    }

    return increasedMeasurement;
}

function run2(data: Array<string>): number {
    let previousWindow = 1000000;
    let increasedWindow = 0;

    for (let i = 2; i < data.length; i++) {
        const window = parseInt(data[i - 2]) + parseInt(data[i - 1]) + parseInt(data[i]);
        if (window > previousWindow) {
            increasedWindow++;
        }
        previousWindow = window
    }

    return increasedWindow;
}

export { run1, run2 }
