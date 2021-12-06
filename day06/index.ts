function run1(data: Array<string>): number {
    const fishArray = data[0].split(",")
        .map((value => parseInt(value)));

    const fishGlobal = [] as Array<number>;

    for (let i = 0; i <= 8; i++) {
        fishGlobal[i] = fishArray.filter((age) => age === i).length;
    }

    for (let day = 0; day < 80; day++) {
        const newFishes = fishGlobal[0];

        for (let i = 1; i <= 8; i++) {
            fishGlobal[i - 1] = fishGlobal[i];
        }
        fishGlobal[6] += newFishes;
        fishGlobal[8] = newFishes;
    }

    return fishGlobal.reduce((a, b)=> a+b);
}

function run2(data: Array<string>): number {
    const fishArray = data[0].split(",")
        .map((value => parseInt(value)));

    const fishGlobal = [] as Array<number>;

    for (let i = 0; i <= 8; i++) {
        fishGlobal[i] = fishArray.filter((age) => age === i).length;
    }

    for (let day = 0; day < 256; day++) {
        const newFishes = fishGlobal[0];

        for (let i = 1; i <= 8; i++) {
            fishGlobal[i - 1] = fishGlobal[i];
        }
        fishGlobal[6] += newFishes;
        fishGlobal[8] = newFishes;
    }

    return fishGlobal.reduce((a, b)=> a+b);
}

export { run1, run2 }
