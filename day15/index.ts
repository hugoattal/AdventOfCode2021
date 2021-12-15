import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TCell = {
        value: number;
        isVisited: boolean;
        totalRisk: number;
    }

    type TVector = {
        x: number;
        y: number;
    }

    const map = data.map((line) => line.split("").map((cell) => {
        return {
            value: parseInt(cell),
            isVisited: false,
            totalRisk: 0
        } as TCell;
    }));

    const mapSize: TVector = {
        x: map[0].length,
        y: map.length
    };

    const openLocations = [{ x: 0, y: 0 }];

    while (openLocations.length) {
        openLocations.sort((a, b) => {
            const hA = getCell(a).totalRisk + getDistanceFromTarget(a);
            const hB = getCell(b).totalRisk + getDistanceFromTarget(b);
            return hB - hA;
        });

        const currentLocation = openLocations.pop() as TVector;
        const currentCell = getCell(currentLocation);

        if (isTarget(currentLocation)) {
            return currentCell.totalRisk;
        }

        currentCell.isVisited = true;

        [
            { x: currentLocation.x + 1, y: currentLocation.y },
            { x: currentLocation.x - 1, y: currentLocation.y },
            { x: currentLocation.x, y: currentLocation.y + 1 },
            { x: currentLocation.x, y: currentLocation.y - 1 }
        ].forEach((location) => {
            if (isValidLocation(location)) {
                const nextCell = getCell(location);
                if (!nextCell.isVisited) {
                    nextCell.isVisited = true;
                    nextCell.totalRisk = currentCell.totalRisk + nextCell.value;
                    openLocations.push(location);
                }
                else {
                    const newRisk = currentCell.totalRisk + nextCell.value;
                    if (nextCell.totalRisk > newRisk) {
                        nextCell.totalRisk = newRisk;
                        openLocations.push(location);
                    }
                }
            }
        });
    }

    function getDistanceFromTarget(location: TVector) {
        return Math.abs(mapSize.x - 1 - location.x) + Math.abs(mapSize.y - 1 - location.y);
    }

    function getCell(location: TVector) {
        return map[location.y][location.x];
    }

    function isValidLocation(location: TVector) {
        return !!map[location.y]?.[location.x];
    }

    function isTarget(location: TVector) {
        return location.x === mapSize.x - 1 && location.y === mapSize.y - 1;
    }

    return 0;
}

function run2(data: Array<string>): number {
    type TCell = {
        value: number;
        isVisited: boolean;
        totalRisk: number;
    }

    type TVector = {
        x: number;
        y: number;
    }

    const map = data.map((line) => line.split("").map((cell) => {
        return {
            value: parseInt(cell),
            isVisited: false,
            totalRisk: 0
        } as TCell;
    }));

    const initialMapSize: TVector = {
        x: map[0].length,
        y: map.length
    };

    function extendMap() {
        for (let dx = 1; dx < 5; dx++) {
            const location = { x: 0, y: 0 };
            for (location.x = 0; location.x < initialMapSize.x; location.x++) {
                for (location.y = 0; location.y < initialMapSize.y; location.y++) {
                    map[location.y].push({
                        value: ((map[location.y][location.x].value + dx) - 1) % 9 + 1,
                        isVisited: false,
                        totalRisk: 0
                    });
                }
            }
        }
        for (let dy = 1; dy < 5; dy++) {
            const location = { x: 0, y: 0 };
            for (location.y = 0; location.y < initialMapSize.y; location.y++) {
                map.push([]);
                for (location.x = 0; location.x < map[0].length; location.x++) {
                    map[initialMapSize.y * dy + location.y].push({
                        value: ((map[location.y][location.x].value + dy) - 1) % 9 + 1,
                        isVisited: false,
                        totalRisk: 0
                    });
                }
            }
        }
    }

    extendMap();

    const mapSize: TVector = {
        x: map[0].length,
        y: map.length
    };

    const openLocations = [{ x: 0, y: 0 }];

    while (openLocations.length) {
        openLocations.sort((a, b) => {
            const hA = getCell(a).totalRisk + getDistanceFromTarget(a);
            const hB = getCell(b).totalRisk + getDistanceFromTarget(b);
            return hB - hA;
        });

        const currentLocation = openLocations.pop() as TVector;
        const currentCell = getCell(currentLocation);

        if (isTarget(currentLocation)) {
            return currentCell.totalRisk;
        }

        currentCell.isVisited = true;

        [
            { x: currentLocation.x + 1, y: currentLocation.y },
            { x: currentLocation.x - 1, y: currentLocation.y },
            { x: currentLocation.x, y: currentLocation.y + 1 },
            { x: currentLocation.x, y: currentLocation.y - 1 }
        ].forEach((location) => {
            if (isValidLocation(location)) {
                const nextCell = getCell(location);
                if (!nextCell.isVisited) {
                    nextCell.isVisited = true;
                    nextCell.totalRisk = currentCell.totalRisk + nextCell.value;
                    openLocations.push(location);
                }
                else {
                    const newRisk = currentCell.totalRisk + nextCell.value;
                    if (nextCell.totalRisk > newRisk) {
                        nextCell.totalRisk = newRisk;
                        openLocations.push(location);
                    }
                }
            }
        });
    }

    function getDistanceFromTarget(location: TVector) {
        return Math.abs(mapSize.x - 1 - location.x) + Math.abs(mapSize.y - 1 - location.y);
    }

    function getCell(location: TVector) {
        return map[location.y][location.x];
    }

    function isValidLocation(location: TVector) {
        return !!map[location.y]?.[location.x];
    }

    function isTarget(location: TVector) {
        return location.x === mapSize.x - 1 && location.y === mapSize.y - 1;
    }

    return 0;
}

export { run1, run2 };
