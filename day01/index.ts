function run1(data: Array<string>): number {
    let increasedMeasurement = 0;

    for (let i = 1; i < data.length; i++) {
        if (parseInt(data[i]) > parseInt(data[i-1])) {
            increasedMeasurement++;
        }
    }

    return increasedMeasurement;
}

function run2(data: Array<string>): number {
    let increasedMeasurement = 0;

    for (let i = 3; i < data.length; i++) {
        if (parseInt(data[i]) > parseInt(data[i-3])) {
            increasedMeasurement++;
        }
    }

    return increasedMeasurement;
}

export { run1, run2 }
