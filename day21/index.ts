import * as _ from "lodash";
import { parseInt } from "lodash";

function run1(data: Array<string>): number {
    let diceConfig = {
        value: 1,
        rollNum: 0
    };

    type TPlayer = {
        location: number,
        score: number
    }

    const players = [
        {
            location: parseInt(_.last(data[0]) as string),
            score: 0
        } as TPlayer,
        {
            location: parseInt(_.last(data[1]) as string),
            score: 0
        } as TPlayer
    ];

    const game = {
        currentPlayer: 0
    };

    while (!hasPartyEnd()) {
        const movement = rollDice() + rollDice() + rollDice();
        players[game.currentPlayer].location = (players[game.currentPlayer].location + movement - 1) % 10 + 1;
        players[game.currentPlayer].score += players[game.currentPlayer].location;

        game.currentPlayer = (game.currentPlayer + 1) % 2;
    }

    return getResult();

    function rollDice() {
        diceConfig.rollNum++;
        const value = diceConfig.value;
        diceConfig.value = diceConfig.value % 100 + 1;
        return value;
    }

    function hasPartyEnd() {
        return players[0].score >= 1000 || players[1].score >= 1000;
    }

    function getResult() {
        return Math.min(players[0].score, players[1].score) * diceConfig.rollNum;
    }
}

function run2(data: Array<string>): number {
    type TPlayer = {
        location: number,
        score: number,
    }

    const players = [
        {
            location: parseInt(_.last(data[0]) as string),
            score: 0
        } as TPlayer,
        {
            location: parseInt(_.last(data[1]) as string),
            score: 0
        } as TPlayer
    ];

    const wins = [
        [] as Array<number>,
        [] as Array<number>
    ];

    play(players[0], 1, 0, 0);
    play(players[1], 1, 0, 1);

    function play(player: TPlayer, probability: number, turn: number, playerId: number) {
        if (player.score >= 21) {
            wins[playerId][turn] = (wins[playerId][turn] ?? 0) + probability;
            return;
        }

        const universes = {
            3: 1,
            4: 3,
            5: 6,
            6: 7,
            7: 6,
            8: 3,
            9: 1
        } as Record<string, number>;

        for (const key of Object.keys(universes)) {
            const newPlayer = _.cloneDeep(player);
            newPlayer.location = (newPlayer.location + parseInt(key) - 1) % 10 + 1;
            newPlayer.score += newPlayer.location;

            play(newPlayer, probability * universes[key], turn + 1, playerId);
        }
    }

    const winners = [0, 0];
    let multipliers = [1, 1];

    for (let turn = 1; turn < wins[0].length; turn++) {
        {
            const winNow = (wins[0][turn] ?? 0);
            winners[0] += winNow * multipliers[0];

            multipliers[1] = (27 * multipliers[1] - winNow);
        }
        {
            const winNow = (wins[1][turn] ?? 0);
            winners[1] += winNow * multipliers[1];

            multipliers[0] = (27 * multipliers[0] - winNow);
        }
    }

    return Math.max(...winners);
}

export { run1, run2 };
