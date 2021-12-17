import * as _ from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type Target = {
        start: TVector;
        end: TVector;
    }

    const result = [...data[0].matchAll(/(-?[0-9]+)/g)];

    const target: Target = {
        start: {
            x: parseInt(result[0][0]),
            y: parseInt(result[2][0]),
        },
        end: {
            x: parseInt(result[1][0]),
            y: parseInt(result[3][0]),
        }
    }

    const potentialX = findPotentialX();
    const maxShot = {
        height: 0,
        shot: {
            x: 0,
            y: 0
        } as TVector
    }

    let maxY = 100;
    let currentY = 1;

    while (currentY < maxY) {


        currentY++;
    }
    console.log(potentialX);

    function findPotentialX() {
        const xLaunch = [];

        for (let x = target.start.x; x > 0; x--) {
            if (isLaunchXInTarget(x)) {
                xLaunch.push(x);
            }
        }
        return xLaunch;
    }

    function isLaunchXInTarget(y: number) {
        let speed = y;
        let position = speed;

        while (position <= target.end.x && speed > 0) {
            if (position >= target.start.x) {
                return true;
            }
            speed = Math.max(speed - 1, 0);
            position += speed;
        }

        return false;
    }

    function isShotInTarget(shot: TVector) {
        const position: TVector = {x: 0, y: 0};

        while (position.x <= target.end.x && position.y <= target.end.y) {
            if (position.x >= target.end.x && position.y >= target.end.y) {
                return true;
            }

            position.x += shot.x;
            position.y += shot.y;

            shot.x = Math.max(shot.x - 1, 0);
            shot.y--;
        }

        return false;
    }

    return 0;
}

function run2(_data: Array<string>): number {
    return 0;
}

export { run1, run2 };
