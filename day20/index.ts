import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TMap = Record<string, boolean>;

    const enhancer: Array<boolean> = [];
    let map: TMap = {};
    let background = false;

    for (const char of data[0]) {
        enhancer.push(char === "#");
    }

    for (let i = 2; i < data.length; i++) {
        const y = i - 2;
        for (let x = 0; x < data[i].length; x++) {
            map[vectorToString({ x, y })] = (data[i][x] === "#");
        }
    }

    for (let i = 0; i < 2; i++) {
        const { min, max } = getMapBoundaries(map);
        min.x--;
        min.y--;
        max.x++;
        max.y++;
        const newMap: TMap = {};

        for (let y = min.y; y <= max.y; y++) {
            for (let x = min.x; x <= max.x; x++) {
                const number = getNumber(map, { x, y }, background);
                newMap[vectorToString({ x, y })] = enhancer[number];
            }
        }

        background = enhancer[background ? 511 : 0];

        map = newMap;
    }

    //displayMap(map);

    return countPixels(map);

    function getNumber(map: TMap, location: TVector, background: boolean) {
        let bin = "";

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const key = vectorToString({
                    x: location.x + dx,
                    y: location.y + dy
                });
                if (_.isUndefined(map[key])) {
                    bin += background ? 1 : 0;
                }
                else {
                    bin += map[key] ? 1 : 0;
                }
            }
        }

        return parseInt(bin, 2);
    }

    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y}`;
    }

    function stringToVector(string: string): TVector {
        const split = string.split(",").map((value) => parseInt(value));
        return {
            x: split[0],
            y: split[1]
        };
    }

    function getMapBoundaries(map: TMap) {
        let min: TVector = { x: 0, y: 0 };
        let max: TVector = { x: 0, y: 0 };

        for (const key of Object.keys(map)) {
            const location = stringToVector(key);
            min.x = Math.min(min.x, location.x);
            min.y = Math.min(min.y, location.y);
            max.x = Math.max(max.x, location.x);
            max.y = Math.max(max.y, location.x);
        }

        return { min, max };
    }

    function displayMap(map: TMap) {
        const { min, max } = getMapBoundaries(map);

        let draw = "";

        for (let y = min.y; y <= max.y; y++) {
            for (let x = min.x; x <= max.x; x++) {
                draw += (map[vectorToString({ x, y })] ? "#" : " ");
            }
            draw += "\n";
        }

        console.log(draw);
    }

    function countPixels(map: TMap) {
        const { min, max } = getMapBoundaries(map);

        let count = 0;

        for (let y = min.y; y <= max.y; y++) {
            for (let x = min.x; x <= max.x; x++) {
                if (map[vectorToString({ x, y })]) {
                    count++;
                }
            }
        }

        return count;
    }
}

function run2(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TMap = Record<string, boolean>;

    const enhancer: Array<boolean> = [];
    let map: TMap = {};
    let background = false;

    for (const char of data[0]) {
        enhancer.push(char === "#");
    }

    for (let i = 2; i < data.length; i++) {
        const y = i - 2;
        for (let x = 0; x < data[i].length; x++) {
            map[vectorToString({ x, y })] = (data[i][x] === "#");
        }
    }

    for (let i = 0; i < 50; i++) {
        const { min, max } = getMapBoundaries(map);
        min.x--;
        min.y--;
        max.x++;
        max.y++;
        const newMap: TMap = {};

        for (let y = min.y; y <= max.y; y++) {
            for (let x = min.x; x <= max.x; x++) {
                const number = getNumber(map, { x, y }, background);
                newMap[vectorToString({ x, y })] = enhancer[number];
            }
        }

        background = enhancer[background ? 511 : 0];

        map = newMap;
    }

    //displayMap(map);

    return countPixels(map);

    function getNumber(map: TMap, location: TVector, background: boolean) {
        let bin = "";

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const key = vectorToString({
                    x: location.x + dx,
                    y: location.y + dy
                });
                if (_.isUndefined(map[key])) {
                    bin += background ? 1 : 0;
                }
                else {
                    bin += map[key] ? 1 : 0;
                }
            }
        }

        return parseInt(bin, 2);
    }

    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y}`;
    }

    function stringToVector(string: string): TVector {
        const split = string.split(",").map((value) => parseInt(value));
        return {
            x: split[0],
            y: split[1]
        };
    }

    function getMapBoundaries(map: TMap) {
        let min: TVector = { x: 0, y: 0 };
        let max: TVector = { x: 0, y: 0 };

        for (const key of Object.keys(map)) {
            const location = stringToVector(key);
            min.x = Math.min(min.x, location.x);
            min.y = Math.min(min.y, location.y);
            max.x = Math.max(max.x, location.x);
            max.y = Math.max(max.y, location.x);
        }

        return { min, max };
    }

    function displayMap(map: TMap) {
        const { min, max } = getMapBoundaries(map);

        let draw = "";

        for (let y = min.y; y <= max.y; y++) {
            for (let x = min.x; x <= max.x; x++) {
                draw += (map[vectorToString({ x, y })] ? "#" : " ");
            }
            draw += "\n";
        }

        console.log(draw);
    }

    function countPixels(map: TMap) {
        const { min, max } = getMapBoundaries(map);

        let count = 0;

        for (let y = min.y; y <= max.y; y++) {
            for (let x = min.x; x <= max.x; x++) {
                if (map[vectorToString({ x, y })]) {
                    count++;
                }
            }
        }

        return count;
    }
}

export { run1, run2 };
