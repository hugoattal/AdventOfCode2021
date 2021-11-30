import { readInput } from "../utils";
import { run1 } from "./index";

test("day01 - run 1", () => {
    const data = readInput(__dirname);

    const response = run1(data);

    expect(response).toBe("456");
});
