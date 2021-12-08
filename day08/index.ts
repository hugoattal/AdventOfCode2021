import * as _ from "lodash";

function run1(data: Array<string>): number {
    let digits = 0;

    for (const line of data) {
        const output = line.split(" | ")[1].split(" ");
        digits += output.filter((digit) => [2, 4, 3, 7].includes(digit.length)).length;
    }

    return digits;
}

function run2(data: Array<string>): number {
    let total = 0;

    for (const line of data) {
        const [input, output] = line.split(" | ").map((value) => value.split(" "));

        const translator = {} as Record<number, string>;
        const digit6 = [] as Array<string>;
        const digit5 = [] as Array<string>;

        for (const digit of input) {
            switch (digit.length) {
                case 2:
                    translator[1] = digit;
                    break;
                case 4:
                    translator[4] = digit;
                    break;
                case 3:
                    translator[7] = digit;
                    break;
                case 7:
                    translator[8] = digit;
                    break;
                case 5:
                    digit5.push(digit);
                    break;
                case 6:
                    digit6.push(digit);
                    break;
            }
        }

        const segments = findDifferenceChars(translator[4], translator[1]);
        const segmentD = (digit5.join().split(segments[0]).length > digit5.join().split(segments[1]).length) ? segments[0] : segments[1];

        translator[3] = digit5.find((digit) => (findCommonChars(digit, translator[1]).length === 2)) as string;
        digit5.splice(digit5.indexOf(translator[3]), 1);
        translator[5] = digit5.find((digit) => (findCommonChars(digit, translator[3] + translator[4]).length === 5)) as string;
        translator[2] = digit5.find((digit) => (findCommonChars(digit, translator[5]).length === 3)) as string;
        translator[6] = digit6.find((digit) => (findCommonChars(digit, translator[1]).length === 1)) as string;
        translator[0] = digit6.find((digit) => !digit.includes(segmentD)) as string;
        translator[9] = digit6.find((digit) => ![translator[0], translator[6]].includes(digit)) as string;

        const inverter = {} as Record<string, number>;
        for (let i = 0; i < 10; i++) {
            inverter[getUniqueId(translator[i])] = i;
        }

        let resultString = "";
        for (const digit of output) {
            resultString += inverter[getUniqueId(digit)];
        }

        total += parseInt(resultString);
    }

    return total;

    function findCommonChars(a: string, b: string) {
        return _.intersection(a.split(""), b.split(""))
    }

    function findDifferenceChars(a: string, b: string) {
        return _.xor(a.split(""), b.split(""))
    }

    function getUniqueId(input: string) {
        return input.split("").sort().join("");
    }
}

export { run1, run2 };
