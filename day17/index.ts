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
        for (const currentX of potentialX) {
            const shot: TVector = {
                x: currentX,
                y: currentY
            };
            if (isShotInTarget(shot)) {
                const shotHeight = getShotHeight(shot);
                if (shotHeight > maxShot.height) {
                    maxShot.height = shotHeight;
                    maxShot.shot = shot;
                    maxY = Math.max(maxY, shot.y * 5);
                }
            }
        }

        currentY++;
    }

    return maxShot.height;

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
            speed = Math.max(speed - 1, 0);
            if (position >= target.start.x && speed === 0) {
                return true;
            }
            position += speed;
        }

        return false;
    }

    function isShotInTarget(shot: TVector) {
        const position: TVector = {x: 0, y: 0};
        const speed = _.cloneDeep(shot);

        while (position.x <= target.end.x && position.y >= target.start.y) {
            if (position.x >= target.start.x && position.y <= target.end.y) {
                return true;
            }

            position.x += speed.x;
            position.y += speed.y;

            speed.x = Math.max(speed.x - 1, 0);
            speed.y--;
        }

        return false;
    }

    function getShotHeight(shot: TVector) {
        let height = 0;
        for (let i = 1; i <= shot.y; i++) {
            height += i;
        }
        return height;
    }
}

function run2(data: Array<string>): number {
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
    let currentY = target.start.y;
    let count = 0;

    while (currentY < maxY) {
        for (const currentX of potentialX) {
            const shot: TVector = {
                x: currentX,
                y: currentY
            };
            if (isShotInTarget(shot)) {
                count++;
                const shotHeight = getShotHeight(shot);
                if (shotHeight > maxShot.height) {
                    maxShot.height = shotHeight;
                    maxShot.shot = shot;
                    maxY = Math.max(maxY, shot.y * 5);
                }
            }
        }

        currentY++;
    }

    return count;

    function findPotentialX() {
        const xLaunch = [];

        for (let x = target.end.x; x > 0; x--) {
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
            speed = Math.max(speed - 1, 0);
            if (position >= target.start.x) {
                return true;
            }
            position += speed;
        }

        return false;
    }

    function isShotInTarget(shot: TVector) {
        const position: TVector = {x: 0, y: 0};
        const speed = _.cloneDeep(shot);

        while (position.x <= target.end.x && position.y >= target.start.y) {
            if (position.x >= target.start.x && position.y <= target.end.y) {
                return true;
            }

            position.x += speed.x;
            position.y += speed.y;

            speed.x = Math.max(speed.x - 1, 0);
            speed.y--;
        }

        return false;
    }

    function getShotHeight(shot: TVector) {
        let height = 0;
        for (let i = 1; i <= shot.y; i++) {
            height += i;
        }
        return height;
    }
}

export { run1, run2 };
