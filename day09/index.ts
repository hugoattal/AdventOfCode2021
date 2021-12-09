import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number
    }

    const map = data.map((line) => line.split("").map((location) => parseInt(location)));

    const height = map.length;
    const width = map[0].length;

    let sum = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isLocalLowest({ x, y })) {
                sum += 1 + map[y][x];
            }
        }
    }

    return sum;

    function isLocalLowest(location: TVector) {
        let flag = true;

        flag &&= isLowerThan(location, { x: location.x + 1, y: location.y });
        flag &&= isLowerThan(location, { x: location.x - 1, y: location.y });
        flag &&= isLowerThan(location, { x: location.x, y: location.y + 1 });
        flag &&= isLowerThan(location, { x: location.x, y: location.y - 1 });

        return flag;
    }

    function isLowerThan(location: TVector, target: TVector) {
        if (_.isUndefined(map[target.y]?.[target.x])) {
            return true;
        }

        return map[location.y][location.x] < map[target.y][target.x];
    }
}

function run2(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number
    }

    const map = data.map((line) => line.split("").map((height) => parseInt(height)));

    const height = map.length;
    const width = map[0].length;

    const bassinSize = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isLocalLowest({ x, y })) {
                bassinSize.push(getBassinSize({ x, y }));
            }
        }
    }

    bassinSize.sort((a, b) => b - a);

    return bassinSize[0] * bassinSize[1] * bassinSize[2];

    function isLocalLowest(location: TVector) {
        let flag = true;

        flag &&= isLowerThan(location, { x: location.x + 1, y: location.y });
        flag &&= isLowerThan(location, { x: location.x - 1, y: location.y });
        flag &&= isLowerThan(location, { x: location.x, y: location.y + 1 });
        flag &&= isLowerThan(location, { x: location.x, y: location.y - 1 });

        return flag;
    }

    function isLowerThan(location: TVector, target: TVector) {
        if (_.isUndefined(map[target.y]?.[target.x])) {
            return true;
        }

        return map[location.y][location.x] < map[target.y][target.x];
    }

    function getBassinSize(location: TVector) {
        const tMap = _.cloneDeep(map);
        let size = 0;
        const checkLocations = [location];

        while (checkLocations.length) {
            const check = checkLocations[0];
            checkLocations.splice(0, 1);

            if (tMap[check.y][check.x] < 0) {
                continue;
            }

            const checkHeight = tMap[check.y][check.x];
            tMap[check.y][check.x] = -1;

            [
                { x: check.x + 1, y: check.y },
                { x: check.x - 1, y: check.y },
                { x: check.x, y: check.y + 1 },
                { x: check.x, y: check.y - 1 }
            ].forEach((target) => {
                if (_.isUndefined(tMap[target.y]?.[target.x])) {
                    return;
                }

                if (tMap[target.y][target.x] < 0) {
                    return;
                }

                if (tMap[target.y][target.x] > checkHeight && tMap[target.y][target.x] < 9) {
                    checkLocations.push(target);
                }
            });

            size++;
        }
        return size;
    }
}

export { run1, run2 };
