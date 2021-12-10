import * as _ from "lodash";

function run1(data: Array<string>): number {
    let score = 0;
    const pointsTable = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    } as Record<string, number>;

    const chunks = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    } as Record<string, string>;

    for (const line of data) {
        const heap = [] as Array<string>;

        for (const char of line) {
            if (Object.keys(chunks).includes(char)) {
                heap.push(char);
                continue;
            }

            if (heap.length && (chunks[_.last(heap) as string] === char)) {
                heap.pop();
                continue;
            }

            score += pointsTable[char];
            break;
        }
    }

    return score;
}

function run2(data: Array<string>): number {
    let scores = [] as Array<number>;
    const pointsTable = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    } as Record<string, number>;

    const chunks = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    } as Record<string, string>;

    for (const line of data) {
        const heap = [] as Array<string>;
        let syntaxError = false;

        for (const char of line) {
            if (Object.keys(chunks).includes(char)) {
                heap.push(char);
                continue;
            }

            if (heap.length && (chunks[_.last(heap) as string] === char)) {
                heap.pop();
                continue;
            }

            syntaxError = true;
            break;
        }

        if (syntaxError) {
            continue;
        }

        let lineScore = 0;

        while (heap.length) {
            lineScore *= 5;
            lineScore += pointsTable[chunks[_.last(heap) as string]];
            heap.pop();
        }

        scores.push(lineScore);
    }

    scores.sort((a, b) => a - b);

    return scores[(scores.length - 1) / 2];
}

export { run1, run2 };
