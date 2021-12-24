import { max } from "lodash";

function run1(data: Array<string>): number {
    enum EOperationType { inp = "inp", add = "add", mul = "mul", div = "div", mod = "mod", eql = "eql" }

    type TParameter = string | number

    type TOperation = {
        type: EOperationType,
        parameters: Array<TParameter>
    }

    const operations: Array<TOperation> = [];

    for (const line of data) {
        const instruction = line.split(" ");

        const parameters: Array<TParameter> = [];

        parameters.push(instruction[1])

        if (instruction[2]) {
            if (/[-0-9]+/.test(instruction[2])) {
                parameters.push(parseInt(instruction[2]))
            } else {
                parameters.push(instruction[2])
            }
        }

        const operation: TOperation = {
            type: instruction[0] as EOperationType,
            parameters
        }

        operations.push(operation);
    }

    const input:Array<number> = [];

    // Part 1
    input[0] = 5;  // 0 - Push 5 + 16 = 21
    input[1] = 9;  // 1 - Push 9 + 3 = 12
    input[2] = 9;  // 2 - Push 9 + 2 = 11
    input[3] = 9;  // 3 - Push 9 + 7 = 16
    input[4] = 6;  // 3 - Pull 16 - 10 = 6
    input[5] = 9;  // 3 - Push 9 + 6 = 15
    input[6] = 1;  // 3 - Pull 15 - 14 = 1
    input[7] = 2;  // 3 - Push 2 + 11 = 13
    input[8] = 9;  // 3 - Pull 13 - 4 = 9
    input[9] = 8;  // 2 - Pull 11 - 3 = 8
    input[10] = 1; // 2 - Push 1 + 11 = 12
    input[11] = 9; // 2 - Pull 12 - 3 = 9
    input[12] = 3; // 1 - Pull 12 - 9 = 3
    input[13] = 9; // 0 - Pull 21 - 12 = 9

    // Part 2
    input[0] = 1;  // 0 - Push 1 + 16 = 17
    input[1] = 7;  // 1 - Push 7 + 3 = 10
    input[2] = 2;  // 2 - Push 2 + 2 = 4
    input[3] = 4;  // 3 - Push 4 + 7 = 11
    input[4] = 1;  // 3 - Pull 11 - 10 = 1
    input[5] = 9;  // 3 - Push 9 + 6 = 15
    input[6] = 1;  // 3 - Pull 15 - 14 = 1
    input[7] = 1;  // 3 - Push 1 + 11 = 12
    input[8] = 8;  // 3 - Pull 12 - 4 = 8
    input[9] = 1;  // 2 - Pull 4 - 3 = 1
    input[10] = 1; // 2 - Push 1 + 11 = 12
    input[11] = 9; // 2 - Pull 12 - 3 = 9
    input[12] = 1; // 1 - Pull 10 - 9 = 1
    input[13] = 5; // 0 - Pull 17 - 12 = 5

    const maxNumber = input.join("");

    console.log(compute(maxNumber));
    return parseInt(maxNumber);


    /* [ Useless bruteforce ]


        let maxNumber = "";
        let currentNumber = 9;

        function getMaxNumber() {
            return (maxNumber + currentNumber.toString()).padEnd(14, "9")
        }


        let count = 8;

        while (maxNumber.length < 14) {
            if (compute(getMaxNumber(), maxNumber.length + 2) !== 0) {
                currentNumber--;
            } else {
                console.log("find", currentNumber);
                maxNumber += currentNumber.toString();
                currentNumber = 9;
            }

            if (count-- === 0) {
                break;
            }
        }

        console.log(maxNumber);
    */

    function compute(input: string) {
        const inputNumbers = input.split("").map((value) => parseInt(value));
        const memory: Record<string, number> = {
            w: 0, x: 0, y: 0, z: 0
        };

        for (const operation of operations) {
            switch (operation.type) {
                case EOperationType.inp:
                    console.log(memory, memory.z%26);
                    memory[operation.parameters[0]] = inputNumbers.shift() as number;
                    break;
                case EOperationType.add:
                    memory[operation.parameters[0]] += getParameterValue(operation.parameters[1]);
                    break;
                case EOperationType.mul:
                    memory[operation.parameters[0]] *= getParameterValue(operation.parameters[1]);
                    break;
                case EOperationType.div:
                    memory[operation.parameters[0]] = Math.trunc(memory[operation.parameters[0]]/getParameterValue(operation.parameters[1]));
                    break;
                case EOperationType.mod:
                    memory[operation.parameters[0]] %= getParameterValue(operation.parameters[1]);
                    break;
                case EOperationType.eql:
                    memory[operation.parameters[0]] = (memory[operation.parameters[0]] === getParameterValue(operation.parameters[1])) ? 1 : 0;
                    break;
            }
            //console.log(operation, memory);
        }

        return memory.z;

        function getParameterValue(parameter: TParameter): number {
            return Number.isInteger(parameter) ? parameter as number : memory[parameter];
        }
    }

    /* [ Useless nonsense ]

    type TValue = {
        value: string | number
    } | TValueOperation;

    type TValueOperation = {
        type: EOperationType,
        values: Array<TValue>
    }

    type TModel = Record<string, TValue>

    const model: TModel = {
        w: {value: 0},
        x: {value: 0},
        y: {value: 0},
        z: {value: 0},
    }

    console.log(model);

    for (let i = 0; i <= 35; i++) {
        backtrack(model, i);
    }

    console.log(JSON.stringify(model, null, 2));

    function backtrack(model: TModel, step: number) {

        const operation = operations[step];

        const p0 = operation.parameters[0] as string;
        const p1 = operation.parameters[1];

        switch (operation.type) {
            case EOperationType.inp:
                model[p0] = {value: "inp"};
                break;
            case EOperationType.add:
            case EOperationType.mul:
            case EOperationType.div:
            case EOperationType.mod:
            case EOperationType.eql:
                model[p0] = simplify({
                    type: operation.type,
                    values: [
                        model[p0],
                        Number.isInteger(p1) ? {value: p1} : model[p1 as string]
                    ]
                })
                break;
        }
    }

    function simplify(value: TValue): TValue {
        if ((value as TValueOperation).type) {
            const operation = value as TValueOperation;

            operation.values[0] = simplify(operation.values[0]);
            operation.values[1] = simplify(operation.values[1]);

            // @ts-ignore
            if (operation.type === EOperationType.div && operation.values[1].value === 1) {
                return simplify(operation.values[0]);
            }

            // @ts-ignore
            if (operation.type === EOperationType.mul && operation.values[1].value === 1) {
                return simplify(operation.values[0]);
            }

            // @ts-ignore
            if (operation.type === EOperationType.mul && (operation.values[1].value === 0 || operation.values[0].value === 0)) {
                return {value: 0};
            }

            // @ts-ignore
            if (operation.type === EOperationType.add && Number.isInteger(operation.values[0].value) && Number.isInteger(operation.values[1].value)) {
                // @ts-ignore
                return {value: operation.values[0].value + operation.values[1].value}
            }

            // @ts-ignore
            if (operation.type === EOperationType.add && operation.values[1].value === 0) {
                return simplify(operation.values[0]);
            }

            // @ts-ignore
            if (operation.type === EOperationType.add && operation.values[0].value === 0) {
                return simplify(operation.values[1]);
            }

            // @ts-ignore
            if (operation.type === EOperationType.mod && operation.values[0].value === 0) {
                return simplify(operation.values[0]);
            }

            // @ts-ignore
            if (operation.type === EOperationType.eql && operation.values[0].value === "inp") {
                if (operation.values[1].value > 9) {
                    return {value: 0};
                }
            }

            // @ts-ignore
            if (operation.type === EOperationType.eql && operation.values[1].value === "inp") {
                if (operation.values[0].value > 9) {
                    return {value: 0};
                }
            }

            // @ts-ignore
            if (operation.type === EOperationType.eql && operation.values[0].value === operation.values[1].value) {
                return {value: 1};
            }
        }

        return value;
    }
    */
}

function run2(_data: Array<string>): number {
    return 0;
}

export { run1, run2 };
