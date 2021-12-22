import { parseInt } from "lodash";

function run1(data: Array<string>): number {
    type TStep = {
        on: boolean
        region: TRegion
    }

    type TVector = {
        x: number;
        y: number;
        z: number;
    }

    type TRegion = {
        start: TVector;
        end: TVector;
    }

    const steps: Array<TStep> = [];

    for (const line of data) {
        const locations = [...line.matchAll(/(-?[0-9]+)/g)].map((match) => parseInt(match[0]));

        steps.push({
            on: line.startsWith("on"),
            region: {
                start: { x: locations[0], y: locations[2], z: locations[4] },
                end: { x: locations[1], y: locations[3], z: locations[5] }
            }
        });
    }

    let count = 0;

    const updates: Array<TStep> = [];

    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const updateLength = updates.length;

        for (let j = 0; j < updateLength; j++) {
            const intersection = getIntersection(step.region, updates[j].region);

            if (intersection) {
                updates.push({
                    on: !updates[j].on,
                    region: intersection
                });
                count += getRegionCount(intersection) * (!updates[j].on ? 1 : -1);
            }
        }

        if (step.on) {
            updates.push(step);
            count += getRegionCount(step.region);
        }
    }

    return count;


    function getIntersection(a: TRegion, b: TRegion): TRegion | null {
        const c = {
            start: {
                x: Math.max(a.start.x, b.start.x),
                y: Math.max(a.start.y, b.start.y),
                z: Math.max(a.start.z, b.start.z)
            },
            end: {
                x: Math.min(a.end.x, b.end.x),
                y: Math.min(a.end.y, b.end.y),
                z: Math.min(a.end.z, b.end.z)
            }
        };

        if ((c.end.x < c.start.x) || (c.end.y < c.start.y) || (c.end.z < c.start.z)) {
            return null;
        }

        return c;
    }

    function getRegionCount(region: TRegion) {
        return (region.end.x - region.start.x + 1) * (region.end.y - region.start.y + 1) * (region.end.z - region.start.z + 1);
    }
}

function run2(_data: Array<string>): number {
    return 0;
}

export { run1, run2 };
