declare function readline(): string; //test

const myTeamId: number = parseInt(readline()); // 0 or 1

const goal = [
    { x: 16000, y: 3250 },
    { x: 0, y: 3250 }
];

interface Entity {
    id: number;
    entityType: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    state: number;
}

function distance(a: { x: number, y: number }, b: { x: number, y: number }): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function findClosestSnaffle(wizard: Entity, snaffles: Entity[]): Entity | null {
    let closestSnaffle: Entity | null = null;
    let minDistance = Infinity;

    for (const snaffle of snaffles) {
        const dist = distance(wizard, snaffle);
        if (dist < minDistance) {
            minDistance = dist;
            closestSnaffle = snaffle;
        }
    }

    return closestSnaffle;
}

function avoidCollision(wizard: Entity, snaffles: Entity[], myWiz: Entity[]): Entity | null {
    let bestSnaffle: Entity | null = null;
    let minDistance = Infinity;

    for (const snaffle of snaffles) {
        let isSafe = true;
        for (const otherWiz of myWiz) {
            if (otherWiz.id !== wizard.id && distance(otherWiz, snaffle) < distance(wizard, snaffle)) {
                isSafe = false;
                break;
            }
        }
        if (isSafe) {
            const dist = distance(wizard, snaffle);
            if (dist < minDistance) {
                minDistance = dist;
                bestSnaffle = snaffle;
            }
        }
    }

    return bestSnaffle;
}

// game loop
while (true) {
    let inputs: string[] = readline().split(' ');
    const myScore: number = parseInt(inputs[0]);
    const myMagic: number = parseInt(inputs[1]);
    
    inputs = readline().split(' ');
    const opponentScore: number = parseInt(inputs[0]);
    const opponentMagic: number = parseInt(inputs[1]);
    
    const entities: number = parseInt(readline());
    let snaffles: Entity[] = [];
    let myWiz: Entity[] = [];

    for (let i = 0; i < entities; i++) {
        inputs = readline().split(' ');
        const entityId: number = parseInt(inputs[0]);
        const entityType: string = inputs[1];
        const x: number = parseInt(inputs[2]);
        const y: number = parseInt(inputs[3]);
        const vx: number = parseInt(inputs[4]);
        const vy: number = parseInt(inputs[5]);
        const state: number = parseInt(inputs[6]);

        const entity: Entity = { id: entityId, entityType, x, y, vx, vy, state };

        if (entityType === 'SNAFFLE') {
            snaffles.push(entity);
        } else if (entityType === 'WIZARD') {
            myWiz.push(entity);
        }
    }

    for (let i = 0; i < 2; i++) {
        const wizard = myWiz[i];
        const target = goal[myTeamId];

        if (wizard.state === 1) {
            console.log(`THROW ${target.x} ${target.y} 500`);
        } else {
            const closestSnaffle = findClosestSnaffle(wizard, snaffles);
            const safeSnaffle = avoidCollision(wizard, snaffles, myWiz);

            if (safeSnaffle) {
                console.log(`MOVE ${safeSnaffle.x} ${safeSnaffle.y} 150`);
            } else if (closestSnaffle) {
                console.log(`MOVE ${closestSnaffle.x} ${closestSnaffle.y} 150`);
            } else {
                console.log(`MOVE ${target.x} ${target.y} 150`);
            }
        }
    }
}