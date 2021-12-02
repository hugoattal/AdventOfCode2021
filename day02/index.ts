function run1(data: Array<string>): number {
    const location = {
        x: 0,
        y: 0
    }

    for (const line of data) {
        const instruction = line.split(" ");
        const value = parseInt(instruction[1]);

        switch (instruction[0]) {
            case "forward":
                location.x += value;
                break;
            case "up" :
                location.y -= value;
                break;
            case "down":
                location.y += value;
                break;
        }
    }

    return location.x * location.y;
}

function run2(data: Array<string>): number {
    const location = {
        x: 0,
        y: 0
    }

    let aim = 0;

    for (const line of data) {
        const instruction = line.split(" ");
        const value = parseInt(instruction[1]);

        switch (instruction[0]) {
            case "forward":
                location.x += value;
                location.y += value * aim;
                break;
            case "up" :
                aim -= value;
                break;
            case "down":
                aim += value;
                break;
        }
    }

    return location.x * location.y;
}

export { run1, run2 }
