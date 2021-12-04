import { readInput } from "../utils";
import { run1, run2 } from "./index";

test("day02 - run 1", () => {
    const data = readInput(__dirname);

    const response = run1(data);

    console.log(response);
});

test("day02 - run 2", () => {
    const data = readInput(__dirname);

    const response = run2(data);

    console.log(response);
});