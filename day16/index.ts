import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TPackage = {
        version: number;
        type: number;
    }

    type TLiteralPackage = TPackage & {
        value: number;
    }

    type TOperatorPackage = TPackage & {
        LTI: 0 | 1;
        children: Array<TPackage>;
    }

    let bin = data[0].split("").map(
        (char) => parseInt(char, 16).toString(2).padStart(4, "0")
    ).join("");

    const analyzedPackage = analyse();

    return getVersionNumberTotal(analyzedPackage);

    function analyse(): TPackage {
        const version = getNextNumber(3);
        const type = getNextNumber(3);

        if (type === 4) {
            const value = getLiteralValue();
            return {
                version,
                type,
                value
            } as TLiteralPackage;
        }

        const currentPackage = {
            version,
            type,
            LTI: getNextNumber(1),
            children: []
        } as TOperatorPackage;

        if (currentPackage.LTI === 0) {
            const length = getNextNumber(15);
            const targetLength = bin.length - length;
            while (bin.length > targetLength + 4) {
                currentPackage.children.push(analyse());
            }
        }
        else {
            const packetNumber = getNextNumber(11);
            for (let i = 0; i < packetNumber; i++) {
                currentPackage.children.push(analyse());
            }
        }

        return currentPackage;
    }

    function getNextNumber(length: number) {
        const result = (parseInt(bin.substr(0, length), 2));
        bin = bin.substr(length);
        return result;
    }

    function getLiteralValue() {
        let result = "";
        while (true) {
            result += bin.substr(1, 4);
            if (bin[0] !== "1") {
                bin = bin.substr(5);
                break;
            }
            bin = bin.substr(5);
        }
        return parseInt(result, 2);
    }

    function getVersionNumberTotal(data: TPackage) {
        let result = data.version;

        if ((data as TOperatorPackage).children) {
            for (const child of (data as TOperatorPackage).children) {
                result += getVersionNumberTotal(child);
            }
        }

        return result;
    }
}

function run2(data: Array<string>): number {
    type TPackage = {
        version: number;
        type: number;
    }

    type TLiteralPackage = TPackage & {
        value: number;
    }

    type TOperatorPackage = TPackage & {
        LTI: 0 | 1;
        children: Array<TPackage>;
    }

    let bin = data[0].split("").map(
        (char) => parseInt(char, 16).toString(2).padStart(4, "0")
    ).join("");

    const analyzedPackage = analyse();

    return getResult(analyzedPackage);

    function analyse(): TPackage {
        const version = getNextNumber(3);
        const type = getNextNumber(3);

        if (type === 4) {
            const value = getLiteralValue();
            return {
                version,
                type,
                value
            } as TLiteralPackage;
        }

        const currentPackage = {
            version,
            type,
            LTI: getNextNumber(1),
            children: []
        } as TOperatorPackage;

        if (currentPackage.LTI === 0) {
            const length = getNextNumber(15);
            const targetLength = bin.length - length;
            while (bin.length > targetLength) {
                currentPackage.children.push(analyse());
            }
        }
        else {
            const packetNumber = getNextNumber(11);
            for (let i = 0; i < packetNumber; i++) {
                currentPackage.children.push(analyse());
            }
        }

        return currentPackage;
    }

    function getNextNumber(length: number) {
        const result = (parseInt(bin.substr(0, length), 2));
        bin = bin.substr(length);
        return result;
    }

    function getLiteralValue() {
        let result = "";
        while (true) {
            result += bin.substr(1, 4);
            if (bin[0] !== "1") {
                bin = bin.substr(5);
                break;
            }
            bin = bin.substr(5);
        }
        return parseInt(result, 2);
    }

    function getResult(data: TPackage): number {
        if ((data as TLiteralPackage).value) {
            return (data as TLiteralPackage).value;
        }

        const operatorData = data as TOperatorPackage;

        switch (operatorData.type) {
            case 0:
                return operatorData.children.reduce((a, b) => a + getResult(b), 0);
            case 1:
                return operatorData.children.reduce((a, b) => a * getResult(b), 1);
            case 2:
                return operatorData.children.reduce((a, b) => Math.min(a, getResult(b)), Number.POSITIVE_INFINITY);
            case 3:
                return operatorData.children.reduce((a, b) => Math.max(a, getResult(b)), 0);
            case 5:
                return getResult(operatorData.children[0]) > getResult(operatorData.children[1]) ? 1 : 0;
            case 6:
                return getResult(operatorData.children[0]) < getResult(operatorData.children[1]) ? 1 : 0;
            case 7:
                return getResult(operatorData.children[0]) === getResult(operatorData.children[1]) ? 1 : 0;
        }

        return 0;
    }
}

export { run1, run2 };
