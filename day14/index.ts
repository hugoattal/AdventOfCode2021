import * as _ from "lodash";

function run1(data: Array<string>): number {
    const input = data[0];
    const inserts = {} as Record<string, string>;

    let flagInsert = false;

    for (const line of data) {
        if (line === "") {
            flagInsert = true;
            continue;
        }

        if (flagInsert) {
            const insert = line.split(" -> ");
            inserts[insert[0]] = insert[1];
        }
    }

    let polymer = {} as Record<string, number>;
    let swapPolymer = {} as Record<string, number>;

    for (let i = 1; i < input.length; i++) {
        const double = input[i - 1] + input[i];

        addToKey(polymer, double, 1);
    }

    const maxStep = 10;

    for (let step = 0; step < maxStep; step++) {
        for (const key of Object.keys(polymer)) {
            if (inserts[key]) {
                addToKey(swapPolymer, key[0]+inserts[key], polymer[key]);
                addToKey(swapPolymer, inserts[key]+key[1], polymer[key]);
            }
            else {
                addToKey(swapPolymer, key, polymer[key]);
            }
        }

        polymer = swapPolymer;
        swapPolymer = {};
    }

    return getScore();

    function addToKey(object: Record<string, number>, key: string, number: number) {
        if (!object[key]) {
            object[key] = 0;
        }

        object[key] += number;
    }

    function getScore() {
        const letterMap = {} as Record<string, number>;
        for (const key of Object.keys(polymer)) {
            addToKey(letterMap, key[0], polymer[key]);
        }

        addToKey(letterMap, input[input.length-1], 1);

        const letterArray =  Object.keys(letterMap).map(key => ({ key, value: letterMap[key] }));
        letterArray.sort((a,b)=> a.value - b.value);

        return letterArray[letterArray.length-1].value - letterArray[0].value;
    }
}

function run2(data: Array<string>): number {
    const input = data[0];
    const inserts = {} as Record<string, string>;

    let flagInsert = false;

    for (const line of data) {
        if (line === "") {
            flagInsert = true;
            continue;
        }

        if (flagInsert) {
            const insert = line.split(" -> ");
            inserts[insert[0]] = insert[1];
        }
    }

    let polymer = {} as Record<string, number>;
    let swapPolymer = {} as Record<string, number>;

    for (let i = 1; i < input.length; i++) {
        const double = input[i - 1] + input[i];

        addToKey(polymer, double, 1);
    }

    const maxStep = 40;

    for (let step = 0; step < maxStep; step++) {
        for (const key of Object.keys(polymer)) {
            if (inserts[key]) {
                addToKey(swapPolymer, key[0]+inserts[key], polymer[key]);
                addToKey(swapPolymer, inserts[key]+key[1], polymer[key]);
            }
            else {
                addToKey(swapPolymer, key, polymer[key]);
            }
        }

        polymer = swapPolymer;
        swapPolymer = {};
    }

    return getScore();

    function addToKey(object: Record<string, number>, key: string, number: number) {
        if (!object[key]) {
            object[key] = 0;
        }

        object[key] += number;
    }

    function getScore() {
        const letterMap = {} as Record<string, number>;
        for (const key of Object.keys(polymer)) {
            addToKey(letterMap, key[0], polymer[key]);
        }

        addToKey(letterMap, input[input.length-1], 1);

        const letterArray =  Object.keys(letterMap).map(key => ({ key, value: letterMap[key] }));
        letterArray.sort((a,b)=> a.value - b.value);

        return letterArray[letterArray.length-1].value - letterArray[0].value;
    }
}

export { run1, run2 };
