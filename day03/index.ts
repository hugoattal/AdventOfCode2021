function run1(data: Array<string>): number {
    const arrayBinaries = [] as Array<number>;
    const binaryLength = data[0].length;

    for (let i = 0; i < binaryLength; i++) {
        arrayBinaries.push(0);
    }

    for (const line of data) {
        for (let position = 0; position < binaryLength; position++) {
            if (line[position] === "1") {
                arrayBinaries[position]++;
            }
        }
    }

    let gammaRateBinary = "";

    for (let position = 0; position < binaryLength; position++) {
        if (arrayBinaries[position] > data.length / 2) {
            gammaRateBinary += "1";
        } else {
            gammaRateBinary += "0";
        }
    }

    const gammaRate = parseInt(gammaRateBinary, 2);
    const epsilonRate = Math.pow(2, binaryLength) - gammaRate - 1;
    return gammaRate * epsilonRate;
}

function run2(data: Array<string>): number {
    const binaryLength = data[0].length;

    const dataOxygen = [...data];
    const dataCarbon = [...data];

    for (let position = 0; position < binaryLength; position++) {
        let oneCounter = 0;
        const length = dataOxygen.length;

        for (let i = length - 1; i >= 0; i--) {
            if (dataOxygen[i][position] === "1") {
                oneCounter++;
            }
        }

        const forcedBinary = oneCounter >= length/2 ? "1" : "0";

        for (let i = length - 1; i >= 0; i--) {
            if (dataOxygen[i][position] !== forcedBinary) {
                dataOxygen.splice(i, 1);
            }
        }
    }

    for (let position = 0; position < binaryLength; position++) {
        let oneCounter = 0;
        const length = dataCarbon.length;

        for (let i = length - 1; i >= 0; i--) {
            if (dataCarbon[i][position] === "1") {
                oneCounter++;
            }
        }

        const forcedBinary = oneCounter < length/2 ? "1" : "0";

        for (let i = length - 1; i >= 0; i--) {
            if (dataCarbon[i][position] !== forcedBinary) {
                dataCarbon.splice(i, 1);
            }
        }

        if (dataCarbon.length === 1) {
            break;
        }
    }

    return parseInt(dataOxygen[0], 2) * parseInt(dataCarbon[0], 2);
}

export { run1, run2 }
