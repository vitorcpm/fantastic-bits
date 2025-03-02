/**
 * Grab Snaffles and try to throw them through the opponent's goal!
 * Move towards a Snaffle and use your team id to determine where you need to throw it.
 **/

const myTeamId: number = parseInt(readline()); // if 0 you need to score on the right of the map, if 1 you need to score on the left

const goal = [
    { x: 16000, y: 3250 },
    { x: 0, y: 3250 }
];

// game loop
while (true) {
    let inputs: string[] = readline().split(' ');
    const myScore: number = parseInt(inputs[0]);
    const myMagic: number = parseInt(inputs[1]);
    
    inputs = readline().split(' ');
    const opponentScore: number = parseInt(inputs[0]);
    const opponentMagic: number = parseInt(inputs[1]);
    
    const entities: number = parseInt(readline()); // number of entities still in game
    let snaffles: any[] = [];
    let myWiz: any[] = []; // my wizards
    
    for (let i = 0; i < entities; i++) {
        inputs = readline().split(' ');
        const entityId: number = parseInt(inputs[0]); // entity identifier
        const entityType: string = inputs[1]; // "WIZARD", "OPPONENT_WIZARD" or "SNAFFLE" (or "BLUDGER" after first league)
        const x: number = parseInt(inputs[2]); // position
        const y: number = parseInt(inputs[3]); // position
        const vx: number = parseInt(inputs[4]); // velocity
        const vy: number = parseInt(inputs[5]); // velocity
        const state: number = parseInt(inputs[6]); // 1 if the wizard is holding a Snaffle, 0 otherwise

        const entity = { id: entityId, entityType, x, y, vx, vy, state };

        if (entityType === 'SNAFFLE') {
            snaffles.push(entity);
        } else if (entityType === 'WIZARD') {
            myWiz.push(entity);
        }
    }

    for (let i = 0; i < 2; i++) { 
        const target = goal[myTeamId]; // target indicates side the wizard will throw the ball
        const snaffle = snaffles[i % snaffles.length]; // created to make each wizard chase a different snaffle

        if (myWiz[i].state === 0) {
            console.log(`MOVE ${snaffle.x} ${snaffle.y} 100`);
        } else {
            console.log(`THROW ${target.x} ${target.y} 500`);
        }
    }
}
