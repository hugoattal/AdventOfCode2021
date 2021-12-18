import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TNumber = {
        0: number | TNumber;
        1: number | TNumber;
    }

    type TPath = Array<0 | 1>;

    const lines = data.map((line) => JSON.parse(line) as TNumber);

    let result: TNumber = null as any as TNumber;
    for (const line of lines) {
        if (!result) {
            result = line;
            reduce(result);
            continue;
        }
        result = [result, line];
        reduce(result);
    }

    return reduceToMagnitude(result);

    function reduce(number: TNumber) {
        const reducePath = findFirstReducePair(number, []);
        if (reducePath) {
            reducePair(number, reducePath);
            reduce(number);
            return;
        }

        const bigPath = findFirstBigRegular(number, []);
        if (bigPath) {
            splitRegular(number, bigPath);
            reduce(number);
            return;
        }
    }

    function findFirstReducePair(number: TNumber, path: TPath): TPath | void {
        if (Array.isArray(number[0])) {
            const newPath = findFirstReducePair(number[0] as TNumber, [...path, 0]);
            if (newPath) {
                return newPath;
            }
        }
        if (Array.isArray(number[1])) {
            const newPath = findFirstReducePair(number[1] as TNumber, [...path, 1]);
            if (newPath) {
                return newPath;
            }
        }
        if (typeof number[0] === "number" && typeof number[1] === "number") {
            if (path.length >= 4) {
                return path;
            }
        }
    }

    function findFirstBigRegular(number: TNumber, path: TPath): TPath | void {
        if (Array.isArray(number[0])) {
            const newPath = findFirstBigRegular(number[0] as TNumber, [...path, 0]);
            if (newPath) {
                return newPath;
            }
        }
        else {
            if (number[0] >= 10) {
                return [...path, 0];
            }
        }

        if (Array.isArray(number[1])) {
            const newPath = findFirstBigRegular(number[1] as TNumber, [...path, 1]);
            if (newPath) {
                return newPath;
            }
        }
        else {
            if (number[1] >= 10) {
                return [...path, 1];
            }
        }
    }

    function reducePair(number: TNumber, path: TPath) {
        const pair = _.get(number, path);
        _.set(number, path, 0);

        const pathLeft = getPathLeft(number, path);
        if (pathLeft) {
            _.set(number, pathLeft, _.get(number, pathLeft) + pair[0]);
        }

        const pathRight = getPathRight(number, path);
        if (pathRight) {
            _.set(number, pathRight, _.get(number, pathRight) + pair[1]);
        }
    }

    function getPathLeft(number: TNumber, path: TPath): TPath | void {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === 1) {
                const newPath = path.slice(0, i);
                newPath[i] = 0;
                while (Array.isArray(_.get(number, newPath))) {
                    newPath.push(1);
                }
                return newPath;
            }
        }
    }

    function getPathRight(number: TNumber, path: TPath): TPath | void {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === 0) {
                const newPath = path.slice(0, i);
                newPath[i] = 1;
                while (Array.isArray(_.get(number, newPath))) {
                    newPath.push(0);
                }
                return newPath;
            }
        }
    }

    function splitRegular(number: TNumber, path: TPath) {
        const regular = _.get(number, path);
        _.set(number, path, [Math.floor(regular / 2), Math.ceil(regular / 2)]);
    }

    function reduceToMagnitude(number: TNumber): number {
        if (Array.isArray(number[0])) {
            number[0] = reduceToMagnitude(number[0] as TNumber);
        }
        if (Array.isArray(number[1])) {
            number[1] = reduceToMagnitude(number[1] as TNumber);
        }
        return (number[0] as number) * 3 + (number[1] as number) * 2;
    }
}

function run2(data: Array<string>): number {
    type TNumber = {
        0: number | TNumber;
        1: number | TNumber;
    }

    type TPath = Array<0 | 1>;

    const lines = data.map((line) => JSON.parse(line) as TNumber);


    let maxMagnitude = 0;

    for (let a = 0; a < lines.length; a++) {
        for (let b = 0; b < lines.length; b++) {
            if (a === b) {
                continue;
            }
            {
                const result = [_.cloneDeep(lines[a]), _.cloneDeep(lines[b])] as TNumber;
                reduce(result);
                const magnitude = reduceToMagnitude(result);
                maxMagnitude = Math.max(maxMagnitude, magnitude)
            }
            {
                const result = [_.cloneDeep(lines[b]), _.cloneDeep(lines[a])] as TNumber;
                reduce(result);
                const magnitude = reduceToMagnitude(result);
                maxMagnitude = Math.max(maxMagnitude, magnitude)
            }
        }

    }

    return maxMagnitude;

    function reduce(number: TNumber) {
        const reducePath = findFirstReducePair(number, []);
        if (reducePath) {
            reducePair(number, reducePath);
            reduce(number);
            return;
        }

        const bigPath = findFirstBigRegular(number, []);
        if (bigPath) {
            splitRegular(number, bigPath);
            reduce(number);
            return;
        }
    }

    function findFirstReducePair(number: TNumber, path: TPath): TPath | void {
        if (Array.isArray(number[0])) {
            const newPath = findFirstReducePair(number[0] as TNumber, [...path, 0]);
            if (newPath) {
                return newPath;
            }
        }
        if (Array.isArray(number[1])) {
            const newPath = findFirstReducePair(number[1] as TNumber, [...path, 1]);
            if (newPath) {
                return newPath;
            }
        }
        if (typeof number[0] === "number" && typeof number[1] === "number") {
            if (path.length >= 4) {
                return path;
            }
        }
    }

    function findFirstBigRegular(number: TNumber, path: TPath): TPath | void {
        if (Array.isArray(number[0])) {
            const newPath = findFirstBigRegular(number[0] as TNumber, [...path, 0]);
            if (newPath) {
                return newPath;
            }
        }
        else {
            if (number[0] >= 10) {
                return [...path, 0];
            }
        }

        if (Array.isArray(number[1])) {
            const newPath = findFirstBigRegular(number[1] as TNumber, [...path, 1]);
            if (newPath) {
                return newPath;
            }
        }
        else {
            if (number[1] >= 10) {
                return [...path, 1];
            }
        }
    }

    function reducePair(number: TNumber, path: TPath) {
        const pair = _.get(number, path);
        _.set(number, path, 0);

        const pathLeft = getPathLeft(number, path);
        if (pathLeft) {
            _.set(number, pathLeft, _.get(number, pathLeft) + pair[0]);
        }

        const pathRight = getPathRight(number, path);
        if (pathRight) {
            _.set(number, pathRight, _.get(number, pathRight) + pair[1]);
        }
    }

    function getPathLeft(number: TNumber, path: TPath): TPath | void {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === 1) {
                const newPath = path.slice(0, i);
                newPath[i] = 0;
                while (Array.isArray(_.get(number, newPath))) {
                    newPath.push(1);
                }
                return newPath;
            }
        }
    }

    function getPathRight(number: TNumber, path: TPath): TPath | void {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === 0) {
                const newPath = path.slice(0, i);
                newPath[i] = 1;
                while (Array.isArray(_.get(number, newPath))) {
                    newPath.push(0);
                }
                return newPath;
            }
        }
    }

    function splitRegular(number: TNumber, path: TPath) {
        const regular = _.get(number, path);
        _.set(number, path, [Math.floor(regular / 2), Math.ceil(regular / 2)]);
    }

    function reduceToMagnitude(number: TNumber): number {
        if (Array.isArray(number[0])) {
            number[0] = reduceToMagnitude(number[0] as TNumber);
        }
        if (Array.isArray(number[1])) {
            number[1] = reduceToMagnitude(number[1] as TNumber);
        }
        return (number[0] as number) * 3 + (number[1] as number) * 2;
    }
}

export { run1, run2 };
