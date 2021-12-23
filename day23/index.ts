import { cloneDeep } from "lodash";

function run1(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TPlayer = {
        id: string;
        location: TVector;
        targetRoom: number;
        locked: boolean;
        cost: number;
    }

    type TState = {
        cost: number;
        players: Array<TPlayer>;
        locked: number;
        moves: Array<any>;
    }

    enum ERoomType {
        Hallway = "h",
        Door = "d",
        Room = "r"
    }

    const players: Array<TPlayer> = [];

    const map: Record<string, ERoomType> = {};

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if ([".", "A", "B", "C", "D"].includes(data[y][x])) {
                if (["A", "B", "C", "D"].includes(data[y][x])) {
                    const id = data[y][x];
                    players.push({
                        id,
                        location: { x, y },
                        targetRoom: getTargetRoom(id),
                        cost: getCost(id),
                        locked: (y === 3 && x === getTargetRoom(id))
                    });
                }

                const key = vectorToString({ x, y });
                if (y > 1) {
                    map[key] = ERoomType.Room;
                    continue;
                }

                if ([3, 5, 7, 9].includes(x)) {
                    map[key] = ERoomType.Door;
                    continue;
                }

                map[key] = ERoomType.Hallway;
            }
        }
    }

    const initialState: TState = {
        cost: 0,
        players,
        locked: players.filter((player) => player.locked).length,
        moves: []
    };

    let winScore = 0;

    const states = [initialState];
    let currentLock = 0;

    while (!winScore) {
        solve();
    }

    return winScore;


    function solve() {
        states.sort((s1, s2) => getMaxStateCost(s2) - getMaxStateCost(s1));

        const state = states.pop() as TState;

        if (state.locked > currentLock) {
            currentLock = state.locked;
            console.log(currentLock);
            console.log(state.moves);
        }

        if (state.locked === 8) {
            winScore = state.cost;
            console.log(state.moves);
            console.log("win");
            return;
        }

        for (let p = 0; p < state.players.length; p++) {
            const player = state.players[p];
            if (player.locked) {
                continue;
            }

            if (isPlayerInRoom(player)) {
                if (!canPlayerMove(player)) {
                    continue;
                }

                const moves = getPlayerPossibleMove(player);

                for (const move of moves) {
                    const moveCost = getCost(player, move);

                    const newState = cloneDeep(state);
                    newState.players[p].location = move;
                    newState.cost += moveCost;
                    newState.moves.push({ player: newState.players[p].id, location: move, cost: moveCost });
                    states.push(newState);
                }
                continue;
            }

            if (isTargetRoomReady(player)) {
                const hasAlreadyPlayer = state.players.findIndex((otherPlayer) => otherPlayer.location.x === player.targetRoom) >= 0;
                const target = {
                    x: player.targetRoom,
                    y: hasAlreadyPlayer ? 2 : 3
                };

                const moveCost = getCost(player, target);

                const newState = cloneDeep(state);
                newState.players[p].location = target;
                newState.players[p].locked = true;
                newState.locked++;
                newState.cost += moveCost;
                newState.moves.push({ player: newState.players[p].id, location: target, cost: moveCost, locked: true });
                states.push(newState);
            }
        }

        function isPlayerInRoom(player: TPlayer) {
            return player.location.y > 1;
        }

        function canPlayerMove(player: TPlayer) {
            if ((player.location.y === 3) && !isEmpty({ x: player.location.x, y: 2 })) {
                return false;
            }
            return true;
        }

        function getPlayerPossibleMove(player: TPlayer) {
            const moves: Array<TVector> = [];
            const y = 1;
            let x = player.location.x;
            while (map[vectorToString({ x: x + 1, y })]) {

                x++;
                if (map[vectorToString({ x, y })] === ERoomType.Door) {
                    continue;
                }

                if (isEmpty({ x, y })) {
                    moves.push({ x, y });
                }
                else {
                    break;
                }
            }
            x = player.location.x;
            while (map[vectorToString({ x: x - 1, y })]) {
                x--;
                if (map[vectorToString({ x, y })] === ERoomType.Door) {
                    continue;
                }

                if (isEmpty({ x, y })) {
                    moves.push({ x, y });
                }
                else {
                    break;
                }
            }
            return moves;
        }

        function isEmpty(location: TVector) {
            return state.players.findIndex((player) => player.location.x === location.x && player.location.y === location.y) < 0;
        }

        function getCost(player: TPlayer, to: TVector) {
            return (Math.abs(player.location.x - to.x) + Math.abs(player.location.y - to.y)) * player.cost;
        }

        function isTargetRoomReady(player: TPlayer) {
            const cursor = { x: player.location.x, y: player.location.y };
            const movement = Math.sign(player.targetRoom - cursor.x);

            const playersInRoom = state.players.filter((otherPlayer) => otherPlayer.location.x === player.targetRoom);

            for (const playerInRoom of playersInRoom) {
                if (!playerInRoom.locked) {
                    return false;
                }
            }

            while (cursor.x !== player.targetRoom) {
                if (!isEmpty({ x: cursor.x + movement, y: cursor.y })) {
                    return false;
                }
                cursor.x += movement;
            }

            return true;
        }
    }

    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y}`;
    }

    function getTargetRoom(id: string) {
        return { A: 3, B: 5, C: 7, D: 9 }[id] || -1;
    }

    function getCost(id: string) {
        return { A: 1, B: 10, C: 100, D: 1000 }[id] || -1;
    }

    function getMaxStateCost(state: TState) {
        let stateCost = state.cost;
        for (let player of state.players) {
            if (!player.locked) {
                if (player.targetRoom === player.location.x) {
                    stateCost += (player.location.y + 2) * player.cost;
                }
                else {
                    stateCost += ((player.location.y - 1) + Math.abs(player.targetRoom - player.location.x) + 1) * player.cost;
                }
            }
            else {
                stateCost -= player.cost; // Probably not admissible, but don't care
            }
        }
        return stateCost;
    }
}

function run2(data: Array<string>): number {
    type TVector = {
        x: number;
        y: number;
    }

    type TPlayer = {
        id: string;
        location: TVector;
        targetRoom: number;
        locked: boolean;
        cost: number;
    }

    type TState = {
        cost: number;
        maxCost: number;
        players: Array<TPlayer>;
        locked: number;
        moves: Array<any>;
    }

    enum ERoomType {
        Hallway = "h",
        Door = "d",
        Room = "r"
    }

    const players: Array<TPlayer> = [];

    const map: Array<Array<ERoomType>> = [];
    const mapHeight = data.length - 2;

    console.log(mapHeight);

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            if ([".", "A", "B", "C", "D"].includes(data[y][x])) {
                if (["A", "B", "C", "D"].includes(data[y][x])) {
                    const id = data[y][x];
                    players.push({
                        id,
                        location: { x, y },
                        targetRoom: getTargetRoom(id),
                        cost: getCost(id),
                        locked: (y === mapHeight && x === getTargetRoom(id))
                    });
                }

                if (!map[y]) {
                    map[y] = [];
                }

                if (y > 1) {
                    map[y][x] = ERoomType.Room;
                    continue;
                }

                if ([3, 5, 7, 9].includes(x)) {
                    map[y][x] = ERoomType.Door;
                    continue;
                }

                map[y][x] = ERoomType.Hallway;
            }
        }
    }

    const initialState: TState = {
        maxCost: 0,
        cost: 0,
        players,
        locked: players.filter((player) => player.locked).length,
        moves: []
    };

    const cache: Record<string, number> = {};

    let winScore = 0;

    let states: Array<TState> = [];
    addState(initialState);
    let currentLock = 0;

    while (!winScore) {
        solve();
    }

    return winScore;

    function getStateHash(state: TState) {
        return state.players.map((player) => vectorToString(player.location)).join("/");
    }

    function addState(state: TState) {
        const hash = getStateHash(state);
        if (cache[hash] && cache[hash] <= state.cost) {
            return;
        }
        cache[hash] = state.cost;
        state.maxCost = getMaxStateCost(state);
        states.push(state);
    }


    function solve() {
        states.sort((s1, s2) => s2.maxCost - s1.maxCost);

        const state = states.pop() as TState;


        if (state.locked > currentLock) {
            currentLock = state.locked;
            console.log(currentLock);
            console.log(state.moves);
            console.log(state.cost, state.maxCost);
        }

        if (state.locked === players.length) {
            winScore = state.cost;
            console.log(state.moves);
            console.log("win");
            return;
        }

        for (let p = 0; p < state.players.length; p++) {
            const player = state.players[p];
            if (player.locked) {
                continue;
            }

            if (isPlayerInRoom(player)) {
                if (!canPlayerMove(player)) {
                    continue;
                }

                const moves = getPlayerPossibleMove(player);

                for (const move of moves) {
                    const moveCost = getCost(player, move);

                    const newState = cloneDeep(state);
                    newState.players[p].location = move;
                    newState.cost += moveCost;
                    newState.moves.push({ player: newState.players[p].id, location: move, cost: moveCost });
                    addState(newState);
                }
                continue;
            }

            if (isTargetRoomReady(player)) {
                const alreadyPlayers = state.players.filter((otherPlayer) => otherPlayer.location.x === player.targetRoom).length;
                const target = {
                    x: player.targetRoom,
                    y: mapHeight - alreadyPlayers
                };

                const moveCost = getCost(player, target);

                const newState = cloneDeep(state);
                newState.players[p].location = target;
                newState.players[p].locked = true;
                newState.locked++;
                newState.cost += moveCost;
                newState.moves.push({ player: newState.players[p].id, location: target, cost: moveCost, locked: true });
                addState(newState);
            }
        }

        function isPlayerInRoom(player: TPlayer) {
            return player.location.y > 1;
        }

        function canPlayerMove(player: TPlayer) {
            for (let y = player.location.y - 1; y > 0; y--) {
                if (!isEmpty({ x: player.location.x, y })) {
                    return false;
                }
            }
            return true;
        }

        function getPlayerPossibleMove(player: TPlayer) {
            const moves: Array<TVector> = [];
            const y = 1;
            let x = player.location.x;
            while (map[y][x + 1]) {
                x++;

                if (map[y][x] === ERoomType.Door) {
                    continue;
                }

                if (isEmpty({ x, y })) {
                    moves.push({ x, y });
                }
                else {
                    break;
                }
            }
            x = player.location.x;
            while (map[y][x - 1]) {
                x--;
                if (map[y][x] === ERoomType.Door) {
                    continue;
                }

                if (isEmpty({ x, y })) {
                    moves.push({ x, y });
                }
                else {
                    break;
                }
            }
            return moves;
        }

        function isEmpty(location: TVector) {
            return state.players.findIndex((player) => player.location.x === location.x && player.location.y === location.y) < 0;
        }

        function getCost(player: TPlayer, to: TVector) {
            return (Math.abs(player.location.x - to.x) + Math.abs(player.location.y - to.y)) * player.cost;
        }

        function isTargetRoomReady(player: TPlayer) {
            const cursor = { x: player.location.x, y: player.location.y };
            const movement = Math.sign(player.targetRoom - cursor.x);

            const playersInRoom = state.players.filter((otherPlayer) => otherPlayer.location.x === player.targetRoom);

            for (const playerInRoom of playersInRoom) {
                if (!playerInRoom.locked) {
                    return false;
                }
            }

            while (cursor.x !== player.targetRoom) {
                if (!isEmpty({ x: cursor.x + movement, y: cursor.y })) {
                    return false;
                }
                cursor.x += movement;
            }

            return true;
        }
    }

    function vectorToString(vector: TVector): string {
        return `${vector.x},${vector.y}`;
    }

    function getTargetRoom(id: string) {
        return { A: 3, B: 5, C: 7, D: 9 }[id] || -1;
    }

    function getCost(id: string) {
        return { A: 1, B: 10, C: 100, D: 1000 }[id] || -1;
    }

    function getMaxStateCost(state: TState) {
        let stateCost = state.cost;
        const lockedPlayers: Array<number> = [];

        for (let player of state.players) {
            if (!player.locked) {
                stateCost += ((player.location.y - 1) + Math.abs(player.targetRoom - player.location.x)) * player.cost;
            }
            else {
                lockedPlayers[player.targetRoom] = (lockedPlayers[player.targetRoom] ?? 0) + 1;
                stateCost -= 10; // Not admissible, no care given
            }
        }

        for (let player of state.players) {
            if (!player.locked) {
                stateCost += (mapHeight - (lockedPlayers[player.targetRoom] ?? 0) - 1) * player.cost;
                lockedPlayers[player.targetRoom] = (lockedPlayers[player.targetRoom] ?? 0) + 1;
            }
        }

        return stateCost;
    }
}

export { run1, run2 };
