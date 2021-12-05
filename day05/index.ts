function run1(data: Array<string>): number {
    const map = {} as Record<string, number>;
    let overlap = 0;

    for (const line of data) {
        const points = line.split(" -> ")
            .map(point => point.split(",")
                .map(coordinate => parseInt(coordinate)));

        if (!(points[0][0] === points[1][0] || points[0][1] === points[1][1])) {
            continue;
        }

        const direction = {
            x: Math.sign(points[1][0] - points[0][0]),
            y: Math.sign(points[1][1] - points[0][1]),
        }

        const cursor = {
            x: points[0][0],
            y: points[0][1]
        }

        addPoints(cursor);

        while (cursor.x !== points[1][0] || cursor.y !== points[1][1]){
            cursor.x += direction.x;
            cursor.y += direction.y;
            addPoints(cursor);
        }
    }

    return overlap;

    function getKeyOfPoint(point: { x: number, y: number }) {
        return point.x + ";" + point.y;
    }

    function addPoints(point: { x: number, y: number }) {
        const key = getKeyOfPoint(point);
        if (!map[key]) {
            map[key] = 1;
        } else {
            if (map[key] === 1) {
                overlap++;
            }
            map[key]++;
        }
    }
}

function run2(data: Array<string>): number {
    const map = {} as Record<string, number>;
    let overlap = 0;

    for (const line of data) {
        const points = line.split(" -> ")
            .map(point => point.split(",")
                .map(coordinate => parseInt(coordinate)));

        const direction = {
            x: Math.sign(points[1][0] - points[0][0]),
            y: Math.sign(points[1][1] - points[0][1]),
        }

        const cursor = {
            x: points[0][0],
            y: points[0][1]
        }

        addPoints(cursor);

        while (cursor.x !== points[1][0] || cursor.y !== points[1][1]){
            cursor.x += direction.x;
            cursor.y += direction.y;
            addPoints(cursor);
        }
    }

    return overlap;

    function getKeyOfPoint(point: { x: number, y: number }) {
        return point.x + ";" + point.y;
    }

    function addPoints(point: { x: number, y: number }) {
        const key = getKeyOfPoint(point);
        if (!map[key]) {
            map[key] = 1;
        } else {
            if (map[key] === 1) {
                overlap++;
            }
            map[key]++;
        }
    }
}

export { run1, run2 }
