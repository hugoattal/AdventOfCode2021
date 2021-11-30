import { readFileSync } from "fs";

function readInput(directory: string): Array<string> {
    const input = readFileSync(directory + "/input.txt", "utf8");
    const data = input.toString().split("\r\n");
    data.splice(-1, 1);

    return data;
}

export { readInput }
