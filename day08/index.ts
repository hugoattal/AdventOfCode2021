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
        const splitLine = line.split(" | ").map((value) => value.split(" "));
        const input = splitLine[0];
        const output = splitLine[1];

        const traductor = {} as Record<number, string>;
        const segment = {} as Record<string, string>;

        const digit6 = [] as Array<string>;
        const digit5 = [] as Array<string>;

        for (const digit of input) {
            switch (digit.length) {
                case 2:
                    traductor[1] = digit;
                    break;
                case 4:
                    traductor[4] = digit;
                    break;
                case 3:
                    traductor[7] = digit;
                    break;
                case 7:
                    traductor[8] = digit;
                    break;
                case 5:
                    digit5.push(digit);
                    break;
                case 6:
                    digit6.push(digit);
                    break;
            }
        }

        const segmentA = findDifferenceChars(traductor[1], traductor[7])[0];
        segment[segmentA] = "a";

        const segmentB = findDifferenceChars(traductor[4], traductor[1]);

        if (digit5.join().split(segmentB[0]).length > digit5.join().split(segmentB[1]).length) {
            segment[segmentB[0]] = "d";
            segment[segmentB[1]] = "b";
        }
        else {
            segment[segmentB[0]] = "b";
            segment[segmentB[1]] = "d";
        }

        traductor[3] = digit5.find((digit) => (findCommonChars(digit, traductor[1]).length === 2)) as string;
        digit5.splice(digit5.indexOf(traductor[3]), 1);
        traductor[5] = digit5.find((digit) => (findCommonChars(digit, traductor[3] + traductor[4]).length === 5)) as string;
        traductor[2] = digit5.find((digit) => (findCommonChars(digit, traductor[5]).length === 3)) as string;
        traductor[6] = digit6.find((digit) => (findCommonChars(digit, traductor[1]).length === 1)) as string;
        traductor[0] = digit6.find((digit) => !digit.includes(getKeyByValue(segment, "d") as string)) as string;
        traductor[9] = digit6.find((digit) => ![traductor[0], traductor[6]].includes(digit)) as string;

        let resultString = "";

        for (const digit of output) {
            for (let i = 0; i < 10; i++) {
                if (traductor[i].length === digit.length && findCommonChars(digit, traductor[i]).length === digit.length) {
                    resultString += i;
                    break;
                }
            }
        }

        total += parseInt(resultString);
    }

    return total;

    function findCommonChars(a: string, b: string) {
        const common = [];
        for (const char of a) {
            if (b.includes(char)) {
                common.push(char);
            }
        }
        return common;
    }

    function findDifferenceChars(a: string, b: string) {
        const difference = [];
        const common = findCommonChars(a, b);
        const full = a + b;
        for (const char of full) {
            if (!common.includes(char)) {
                difference.push(char);
            }
        }
        return difference;
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
}

export { run1, run2 };
