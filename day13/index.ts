import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TFold = {
        axis: "x" | "y";
        coordinate: number;
    }

    let flagFold = false;

    const map = {} as Record<string, boolean>;
    const folds = [] as Array<TFold>;

    for (const line of data) {
        if (line === "") {
            flagFold = true;
            continue;
        }

        if (flagFold) {
            const fold = line.substring("fold along ".length).split("=");
            folds.push({
                axis: fold[0] as any,
                coordinate: parseInt(fold[1])
            });
        }
        else {
            const location = line.split(",").map((value) => parseInt(value));
            map[getKey({ x: location[0], y: location[1] })] = true;
        }
    }

    for (const fold of folds) {
        for (const key of Object.keys(map)) {
            const vector = getVector(key);

            switch (fold.axis) {
                case "x":
                    vector.x = getFold(vector.x, fold.coordinate);
                    break;
                case "y":
                    vector.y = getFold(vector.y, fold.coordinate);
                    break;
            }

            delete map[key];
            map[getKey(vector)] = true;
        }

        break;
    }

    return Object.keys(map).length;

    function getKey(location: TVector) {
        return location.x + ";" + location.y;
    }

    function getVector(key: string): TVector {
        const location = key.split(";").map((value) => parseInt(value));
        return {
            x: location[0],
            y: location[1]
        };
    }

    function getFold(current: number, target: number) {
        return (current > target) ? 2 * target - current : current;
    }
}

function run2(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TFold = {
        axis: "x" | "y";
        coordinate: number;
    }

    let flagFold = false;

    const map = {} as Record<string, boolean>;
    const folds = [] as Array<TFold>;

    for (const line of data) {
        if (line === "") {
            flagFold = true;
            continue;
        }

        if (flagFold) {
            const fold = line.substring("fold along ".length).split("=");
            folds.push({
                axis: fold[0] as any,
                coordinate: parseInt(fold[1])
            });
        }
        else {
            const location = line.split(",").map((value) => parseInt(value));
            map[getKey({ x: location[0], y: location[1] })] = true;
        }
    }

    for (const fold of folds) {
        for (const key of Object.keys(map)) {
            const vector = getVector(key);

            switch (fold.axis) {
                case "x":
                    vector.x = getFold(vector.x, fold.coordinate);
                    break;
                case "y":
                    vector.y = getFold(vector.y, fold.coordinate);
                    break;
            }

            delete map[key];
            map[getKey(vector)] = true;
        }
    }

    displayMap();

    return 0;

    function getKey(location: TVector) {
        return location.x + ";" + location.y;
    }

    function getVector(key: string): TVector {
        const location = key.split(";").map((value) => parseInt(value));
        return {
            x: location[0],
            y: location[1]
        };
    }

    function getFold(current: number, target: number) {
        return (current > target) ? 2 * target - current : current;
    }

    function displayMap() {
        const size = getMapSize();
        const display = [];

        for (let y = 0; y <= size.y; y++) {
            let line = "";

            for (let x = 0; x <= size.x; x++) {
                line += map[x + ";" + y] ? "#" : " ";
            }
            display.push(line);
        }
        console.log(display);
    }

    function getMapSize(): TVector {
        const size = {
            x: 0,
            y: 0
        };

        for (const key of Object.keys(map)) {
            const vector = getVector(key);
            size.x = Math.max(size.x, vector.x);
            size.y = Math.max(size.y, vector.y);
        }

        return size;
    }
}

export { run1, run2 };
