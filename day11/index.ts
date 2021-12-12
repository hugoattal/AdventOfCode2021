import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TOctopus = {
        value: number;
        hasFlashed: boolean;
        location: TVector;
    }

    let totalFlash = 0;

    const map = data.map((line) => line.split("").map((value) => {
        return {
            value: parseInt(value),
            hasFlashed: false
        } as TOctopus;
    }));

    const mapSize = {
        x: map[0].length,
        y: map.length
    };

    for (let y = 0; y < mapSize.y; y++) {
        for (let x = 0; x < mapSize.x; x++) {
            map[y][x].location = { x, y };
        }
    }

    //console.log(map.map((line) => line.reduce((a, b) => a + b.value, "")));

    for (let i = 0; i < 100; i++) {
        step();
        resetFlash();
        flash();

        //console.log(map.map((line) => line.reduce((a, b) => a + b.value, "")));
    }

    return totalFlash;

    function step() {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                map[y][x].value++;
            }
        }
    }

    function flash() {
        let flashFlag = false;

        for (let y = 0; y < mapSize.y; y++) {
            for (let x = 0; x < mapSize.x; x++) {
                if (map[y][x].value >= 10) {
                    flashFlag = true;

                    totalFlash++;
                    map[y][x].hasFlashed = true;
                    map[y][x].value = 0;
                    update({ x, y });
                }
            }
        }

        if (flashFlag) {
            flash();
        }
    }

    function resetFlash() {
        for (let y = 0; y < mapSize.y; y++) {
            for (let x = 0; x < mapSize.x; x++) {
                map[y][x].hasFlashed = false;
            }
        }
    }

    function update(target: TVector) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }

                const location = {
                    x: target.x + dx,
                    y: target.y + dy
                };

                if (location.y >= mapSize.y || location.x >= mapSize.x || location.y < 0 || location.x < 0) {
                    continue;
                }

                if (map[location.y][location.x].hasFlashed) {
                    continue;
                }

                map[location.y][location.x].value++;
            }
        }
    }
}

function run2(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TOctopus = {
        value: number;
        hasFlashed: boolean;
        location: TVector;
    }


    const map = data.map((line) => line.split("").map((value) => {
        return {
            value: parseInt(value),
            hasFlashed: false
        } as TOctopus;
    }));

    const mapSize = {
        x: map[0].length,
        y: map.length
    };

    for (let y = 0; y < mapSize.y; y++) {
        for (let x = 0; x < mapSize.x; x++) {
            map[y][x].location = { x, y };
        }
    }

    //console.log(map.map((line) => line.reduce((a, b) => a + b.value, "")));


    let stepFlash = 0;
    let stepNumber = 0;

    while (stepFlash < mapSize.x*mapSize.y) {
        stepFlash = 0;
        step();
        resetFlash();
        flash();
        stepNumber++;

        //console.log(map.map((line) => line.reduce((a, b) => a + b.value, "")));
    }

    return stepNumber;

    function step() {
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                map[y][x].value++;
            }
        }
    }

    function flash() {
        let flashFlag = false;

        for (let y = 0; y < mapSize.y; y++) {
            for (let x = 0; x < mapSize.x; x++) {
                if (map[y][x].value >= 10) {
                    flashFlag = true;

                    stepFlash++;
                    map[y][x].hasFlashed = true;
                    map[y][x].value = 0;
                    update({ x, y });
                }
            }
        }

        if (flashFlag) {
            flash();
        }
    }

    function resetFlash() {
        for (let y = 0; y < mapSize.y; y++) {
            for (let x = 0; x < mapSize.x; x++) {
                map[y][x].hasFlashed = false;
            }
        }
    }

    function update(target: TVector) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }

                const location = {
                    x: target.x + dx,
                    y: target.y + dy
                };

                if (location.y >= mapSize.y || location.x >= mapSize.x || location.y < 0 || location.x < 0) {
                    continue;
                }

                if (map[location.y][location.x].hasFlashed) {
                    continue;
                }

                map[location.y][location.x].value++;
            }
        }
    }
}

export { run1, run2 };
