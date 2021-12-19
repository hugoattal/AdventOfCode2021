import * as _ from "lodash";
import { clone } from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
        z: number;
    }

    type TTransform = {
        translation: TVector,
        rotation: TVector,
        mirrored: boolean
    }

    const scannerMap = {} as Record<number, Record<string, boolean>>

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

        scannerMap[currentScanner][line] = true;
    }

    const map = scannerMap[0];
    delete scannerMap[0];

    const transforms: Array<TTransform> = [];

    for (let rotX = 0; rotX < 4; rotX++) {
        for (let rotY = 0; rotY < 4; rotY++) {
            for (let rotZ = 0; rotZ < 4; rotZ++) {
                transforms.push({
                    translation: {x: 0, y: 0, z: 0},
                    rotation: {x: rotX, y: rotY, z: rotZ},
                    mirrored: false
                })
                transforms.push({
                    translation: {x: 0, y: 0, z: 0},
                    rotation: {x: rotX, y: rotY, z: rotZ},
                    mirrored: true
                })
            }
        }
    }

    while (Object.keys(scannerMap).length > 0) {
        for (let scannerId of Object.keys(scannerMap)) {


        }
    }

    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y},${vector.z}`;
    }

    function stringToVector(string: string): TVector {
        const split = string.split(",").map(parseInt);
        return {
            x: split[0],
            y: split[1],
            z: split[2]
        };
    }

    function transformVector(vector: TVector, transform: TTransform) {
        const newVector = _.clone(vector);
        if (transform.mirrored) {
            newVector.x *= -1;
        }

        for (let rotX = 0; rotX < transform.rotation.x; rotX++) {
            let temp = newVector.y;
            newVector.y = newVector.z;
            newVector.z = -temp;
        }

        for (let rotY = 0; rotY < transform.rotation.y; rotY++) {
            let temp = newVector.x;
            newVector.x = newVector.z;
            newVector.z = -temp;
        }

        for (let rotZ = 0; rotZ < transform.rotation.z; rotZ++) {
            let temp = newVector.x;
            newVector.x = newVector.y;
            newVector.y = -temp;
        }
    }
}

function run2(_data: Array<string>): number {
    return 0;
}

export { run1, run2 };
