import { readInput } from "../utils";
import { run1, run2 } from "./index";

test("day19 - run 1", () => {
    const data = readInput(__dirname);

    const response = run1(data);

    console.log(response);
});

test("day19 - run 2", () => {
    const data = readInput(__dirname);

    const response = run2(data);

    console.log(response);
});
