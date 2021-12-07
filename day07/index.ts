function run1(data: Array<string>): number {
    const crabs = data[0].split(",")
        .map((value => parseInt(value)));

    const crabsNumber = crabs.length;
    const crabPositions = generateKeyArray(crabs);
    const target = getMedian(crabPositions, crabsNumber);

    let fuel = 0;

    for (const crab of crabs) {
        fuel += Math.abs(crab - target);
    }

    return fuel;

    // Yeah, that's a bunch of code only to get the median, but at least, it's linear!

    function generateKeyArray(input: Array<number>) {
        const keyArray = {} as Record<number, number>;

        for (const element of input) {
            if (!keyArray[element]) {
                keyArray[element] = 1;
            }
            else {
                keyArray[element]++;
            }
        }

        return keyArray;
    }

    function getMedian(keyArray: Record<number, number>, elementNumber: number) {
        const keys = Object.keys(keyArray);
        let cursor = 0;

        for (const key of keys) {
            cursor += keyArray[key as any];

            if (cursor > elementNumber / 2) {
                return parseInt(key);
            }
        }

        return 0;
    }
}

function run2(data: Array<string>): number {
    const crabs = data[0].split(",")
        .map((value => parseInt(value)));

    const target = getMean(crabs);

    let fuel = 0;

    for (const crab of crabs) {
        const difference = Math.abs(crab - target);
        fuel += difference * (difference + 1) / 2;
    }

    return fuel;

    function getMean(input: Array<number>) {
        return Math.floor(input.reduce((a, b) => a + b) / input.length);
    }
}

export { run1, run2 };
