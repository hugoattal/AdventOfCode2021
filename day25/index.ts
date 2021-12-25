import { cloneDeep } from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TMap = Record<string, string>;

    let map: TMap = {};
    const mapSize = {
        x: data[0].length,
        y: data.length
    };

    for (let y = 0; y < mapSize.y; y++) {
        for (let x = 0; x < mapSize.x; x++) {
            const element = data[y][x];
            if (element !== ".") {
                const vector: TVector = {x, y};
                map[vectorToString(vector)] = element;
            }
        }
    }

    let count = -1;
    let steps = 0;

    while (count !== 0) {
        count = 0;
        map = step(">", {x: 1, y: 0});
        map = step("v", {x: 0, y: 1});
        steps++;
    }

    return steps;

    function step(selector: string, direction: TVector): TMap {
        const newMap = cloneDeep(map);

        for (let y = 0; y < mapSize.y; y++) {
            for (let x = 0; x < mapSize.x; x++) {
                const element = map[vectorToString({x, y})];
                if (element === selector) {
                    const newVector = {x: (x + direction.x) % mapSize.x, y: (y + direction.y) % mapSize.y};
                    if (!map[vectorToString(newVector)]) {
                        count++;
                        delete newMap[vectorToString({x, y})];
                        newMap[vectorToString(newVector)] = element;
                    }
                }
            }
        }

        return newMap;
    }


    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y}`;
    }

    function printMap(map: TMap) {
        let result = "";
        for (let y = 0; y < mapSize.y; y++) {
            for (let x = 0; x < mapSize.x; x++) {
                if (map[vectorToString({x, y})]) {
                    result += map[vectorToString({x, y})]
                } else {
                    result += "."
                }
            }
            result += "\n";
        }
        console.log(result);
    }
}

function run2(_data: Array<string>): number {
    return 0;
}

export { run1, run2 };
