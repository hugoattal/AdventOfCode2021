import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TCave = {
        isBig: boolean
        connections: Array<string>
        isVisited: boolean
    }

    type TMap = Record<string, TCave>

    type TPath = {
        cursor: string;
        map: TMap
    }

    const map = {} as TMap;

    for (const line of data) {
        const caves = line.split("-");

        if (!map[caves[0]]) {
            map[caves[0]] = {
                isBig: /[A-Z]+/.test(caves[0]),
                connections: [],
                isVisited: false
            };
        }

        if (!map[caves[1]]) {
            map[caves[1]] = {
                isBig: /[A-Z]+/.test(caves[1]),
                connections: [],
                isVisited: false
            };
        }

        map[caves[0]].connections.push(caves[1]);
        map[caves[1]].connections.push(caves[0]);
    }

    const path = {
        cursor: "start",
        map
    } as TPath;

    let pathNumber = 0;
    const paths = [path];

    while (paths.length) {
        const path = paths.pop() as TPath;

        if (path.cursor === "end") {
            pathNumber++;
            continue;
        }

        path.map[path.cursor].isVisited = true;

        for (const nextLocation of path.map[path.cursor].connections) {
            if (!path.map[nextLocation].isBig && path.map[nextLocation].isVisited) {
                continue;
            }

            paths.push({
                cursor: nextLocation,
                map: _.cloneDeep(path.map)
            });
        }
    }

    return pathNumber;
}

function run2(data: Array<string>): number {
    type TCave = {
        isBig: boolean
        connections: Array<string>
        remainingVisit: number
    }

    type TMap = Record<string, TCave>

    type TPath = {
        cursor: string;
        map: TMap;
        hasVisitedSmallCave: boolean
    }

    const map = {} as TMap;

    for (const line of data) {
        const caves = line.split("-");

        if (!map[caves[0]]) {
            map[caves[0]] = {
                isBig: /[A-Z]+/.test(caves[0]),
                connections: [],
                remainingVisit: 2
            };
        }

        if (!map[caves[1]]) {
            map[caves[1]] = {
                isBig: /[A-Z]+/.test(caves[1]),
                connections: [],
                remainingVisit: 2
            };
        }

        map[caves[0]].connections.push(caves[1]);
        map[caves[1]].connections.push(caves[0]);
    }


    const path = {
        cursor: "start",
        map,
        hasVisitedSmallCave: false
    } as TPath;

    path.map["start"].remainingVisit = 1;

    let pathNumber = 0;
    const paths = [path];

    while (paths.length) {
        const path = paths.pop() as TPath;

        if (path.cursor === "end") {
            pathNumber++;
            continue;
        }

        path.map[path.cursor].remainingVisit--;
        if (!path.map[path.cursor].isBig && path.map[path.cursor].remainingVisit === 0 && path.cursor !== "start") {
            path.hasVisitedSmallCave = true;
        }

        for (const nextLocation of path.map[path.cursor].connections) {
            if (!path.map[nextLocation].isBig) {
                if (path.hasVisitedSmallCave) {
                    if (path.map[nextLocation].remainingVisit <= 1) {
                        continue;
                    }
                }
                if (path.map[nextLocation].remainingVisit <= 0) {
                    continue;
                }
            }

            paths.push({
                cursor: nextLocation,
                map: _.cloneDeep(path.map),
                hasVisitedSmallCave: path.hasVisitedSmallCave
            });
        }
    }

    return pathNumber;
}

export { run1, run2 };
