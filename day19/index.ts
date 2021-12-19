import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
        z: number;
    }

    type TOrientation = {
        x: {
            axis: string,
            orientation: 1 | -1
        },
        y: {
            axis: string,
            orientation: 1 | -1
        },
        z: {
            axis: string,
            orientation: 1 | -1
        }
    }

    type TTransform = {
        translation: TVector,
        orientation: TOrientation
    }

    const scannerMap = {} as Record<string, Record<string, TVector>>;

    let currentScanner = 0;

    for (const line of data) {
        if (line.startsWith("---")) {
            currentScanner = parseInt(line.match(/[0-9]+/)?.[0] as string);
            scannerMap[currentScanner] = {};
            continue;
        }

        if (line.trim() === "") {
            continue;
        }

        scannerMap[currentScanner][line] = stringToVector(line);
    }

    const map = scannerMap[0];
    delete scannerMap[0];

    const transforms: Array<TTransform> = [];

    const axis = ["+x", "+y", "+z", "-x", "-y", "-z"];

    axis.forEach((x) => {
        axis.forEach((y) => {
            if (x[1] === y[1]) {
                return;
            }
            axis.forEach((z) => {
                if (x[1] === z[1] || y[1] === z[1]) {
                    return;
                }
                transforms.push({
                    translation: { x: 0, y: 0, z: 0 },
                    orientation: {
                        x: { axis: x[1], orientation: x[0] === "+" ? 1 : -1 },
                        y: { axis: y[1], orientation: y[0] === "+" ? 1 : -1 },
                        z: { axis: z[1], orientation: z[0] === "+" ? 1 : -1 }
                    }
                });
            });
        });
    });

    while (Object.keys(scannerMap).length > 0) {
        console.log(Object.keys(scannerMap).length);
        scannerSearch();
    }

    return Object.keys(map).length;

    function scannerSearch() {
        for (let scannerId of Object.keys(scannerMap)) {
            for (let mapBeacon of Object.values(map)) {
                const scannerKeys = Object.keys(scannerMap[scannerId]);
                for (let matchKey = 0; matchKey < scannerKeys.length - 11; matchKey++) {
                    const matchBeaconVector = scannerMap[scannerId][scannerKeys[matchKey]];

                    for (let transform of transforms) {
                        transform.translation = { x: 0, y: 0, z: 0 };
                        const transformedMatch = transformVector(matchBeaconVector, transform);
                        transform.translation = {
                            x: mapBeacon.x - transformedMatch.x,
                            y: mapBeacon.y - transformedMatch.y,
                            z: mapBeacon.z - transformedMatch.z
                        };

                        let matchOrientation = 1;

                        for (let otherKey = matchKey + 1; otherKey < scannerKeys.length; otherKey++) {
                            const transformedString = vectorToString(transformVector(scannerMap[scannerId][scannerKeys[otherKey]], transform));
                            if (map[transformedString]) {
                                matchOrientation++;
                            }
                            if (scannerKeys.length - otherKey < 12 - matchOrientation) {
                                break;
                            }
                        }

                        if (matchOrientation >= 12) {
                            mergeToMap(scannerId, transform);
                            delete scannerMap[scannerId];
                            return;
                        }
                    }
                }
            }
        }
    }

    function mergeToMap(scannerId: string, transform: TTransform) {
        for (const beacon of Object.values(scannerMap[scannerId])) {
            const transformedBeacon = transformVector(beacon, transform);
            map[vectorToString(transformedBeacon)] = transformedBeacon;
        }
    }

    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y},${vector.z}`;
    }

    function stringToVector(string: string): TVector {
        const split = string.split(",").map((value) => parseInt(value));
        return {
            x: split[0],
            y: split[1],
            z: split[2]
        };
    }

    function transformVector(vector: TVector, transform: TTransform): TVector {
        return {
            x: vector[transform.orientation.x.axis as "x" | "y" | "z"] * transform.orientation.x.orientation + transform.translation.x,
            y: vector[transform.orientation.y.axis as "x" | "y" | "z"] * transform.orientation.y.orientation + transform.translation.y,
            z: vector[transform.orientation.z.axis as "x" | "y" | "z"] * transform.orientation.z.orientation + transform.translation.z
        };
    }
}

function run2(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
        z: number;
    }

    type TOrientation = {
        x: {
            axis: string,
            orientation: 1 | -1
        },
        y: {
            axis: string,
            orientation: 1 | -1
        },
        z: {
            axis: string,
            orientation: 1 | -1
        }
    }

    type TTransform = {
        translation: TVector,
        orientation: TOrientation
    }

    const scannerMap = {} as Record<string, Record<string, TVector>>;

    let currentScanner = 0;

    for (const line of data) {
        if (line.startsWith("---")) {
            currentScanner = parseInt(line.match(/[0-9]+/)?.[0] as string);
            scannerMap[currentScanner] = {};
            continue;
        }

        if (line.trim() === "") {
            continue;
        }

        scannerMap[currentScanner][line] = stringToVector(line);
    }

    const map = scannerMap[0];
    delete scannerMap[0];

    const transforms: Array<TTransform> = [];

    const axis = ["+x", "+y", "+z", "-x", "-y", "-z"];

    axis.forEach((x) => {
        axis.forEach((y) => {
            if (x[1] === y[1]) {
                return;
            }
            axis.forEach((z) => {
                if (x[1] === z[1] || y[1] === z[1]) {
                    return;
                }
                transforms.push({
                    translation: { x: 0, y: 0, z: 0 },
                    orientation: {
                        x: { axis: x[1], orientation: x[0] === "+" ? 1 : -1 },
                        y: { axis: y[1], orientation: y[0] === "+" ? 1 : -1 },
                        z: { axis: z[1], orientation: z[0] === "+" ? 1 : -1 }
                    }
                });
            });
        });
    });

    const scannerLocations: Array<TVector> = [{ x: 0, y: 0, z: 0 }];

    while (Object.keys(scannerMap).length > 0) {
        console.log(Object.keys(scannerMap).length);
        scannerSearch();
    }

    let maxDistance = 0;

    for (let i=0; i<scannerLocations.length; i++) {
        for (let j=i+1; j<scannerLocations.length; j++) {
            const distance = Math.abs(scannerLocations[j].x-scannerLocations[i].x)
                + Math.abs(scannerLocations[j].y-scannerLocations[i].y)
                + Math.abs(scannerLocations[j].z-scannerLocations[i].z);

            maxDistance = Math.max(distance, maxDistance);
        }
    }

    return maxDistance;

    function scannerSearch() {
        for (let scannerId of Object.keys(scannerMap)) {
            for (let mapBeacon of Object.values(map)) {
                const scannerKeys = Object.keys(scannerMap[scannerId]);
                for (let matchKey = 0; matchKey < scannerKeys.length - 11; matchKey++) {
                    const matchBeaconVector = scannerMap[scannerId][scannerKeys[matchKey]];
                    for (let transform of transforms) {
                        transform.translation = { x: 0, y: 0, z: 0 };
                        const transformedMatch = transformVector(matchBeaconVector, transform);
                        transform.translation = {
                            x: mapBeacon.x - transformedMatch.x,
                            y: mapBeacon.y - transformedMatch.y,
                            z: mapBeacon.z - transformedMatch.z
                        };

                        let matchOrientation = 1;

                        for (let otherKey = matchKey + 1; otherKey < scannerKeys.length; otherKey++) {
                            const transformedString = vectorToString(transformVector(scannerMap[scannerId][scannerKeys[otherKey]], transform));
                            if (map[transformedString]) {
                                matchOrientation++;
                            }
                            if (scannerKeys.length - otherKey < 12 - matchOrientation) {
                                break;
                            }
                        }

                        if (matchOrientation >= 12) {
                            scannerLocations.push(transform.translation);
                            mergeToMap(scannerId, transform);
                            delete scannerMap[scannerId];
                            return;
                        }
                    }
                }
            }
        }
    }

    function mergeToMap(scannerId: string, transform: TTransform) {
        for (const beacon of Object.values(scannerMap[scannerId])) {
            const transformedBeacon = transformVector(beacon, transform);
            map[vectorToString(transformedBeacon)] = transformedBeacon;
        }
    }

    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y},${vector.z}`;
    }

    function stringToVector(string: string): TVector {
        const split = string.split(",").map((value) => parseInt(value));
        return {
            x: split[0],
            y: split[1],
            z: split[2]
        };
    }

    function transformVector(vector: TVector, transform: TTransform): TVector {
        return {
            x: vector[transform.orientation.x.axis as "x" | "y" | "z"] * transform.orientation.x.orientation + transform.translation.x,
            y: vector[transform.orientation.y.axis as "x" | "y" | "z"] * transform.orientation.y.orientation + transform.translation.y,
            z: vector[transform.orientation.z.axis as "x" | "y" | "z"] * transform.orientation.z.orientation + transform.translation.z
        };
    }
}

export { run1, run2 };
