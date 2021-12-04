function run1(data: Array<string>): number {
    type TNumber = {
        number: number,
        drawn: boolean
    }
    type TBoard = Array<Array<TNumber>>;

    const drawnNumbers = data[0].split(",").map((value) => parseInt(value));

    let boardCursor = 2;
    const boards = [] as Array<TBoard>;

    const numbers = {} as Record<number, TNumber>

    for (let i = 0; i < 100; i++) {
        numbers[i] = {number: i, drawn: false};
    }

    while (data[boardCursor]) {
        const board = [] as TBoard;

        for (let line = 0; line < 5; line++) {
            board.push(data[boardCursor + line].trim().split(/[ ]+/).map((value) => numbers[parseInt(value)]))
        }

        boards.push(board);
        boardCursor += 6;
    }

    for (let i = 0; i < drawnNumbers.length; i++) {
        const drawnNumber = drawnNumbers[i];
        numbers[drawnNumber].drawn = true;

        for (const board of boards) {

            if (hasBoardWon(board)) {
                return getScore(board, drawnNumber);
            }
        }
    }

    return 0;

    function hasBoardWon(board: TBoard) {
        for (let line = 0; line < 5; line++) {
            let hasWon = true;
            for (let column = 0; column < 5; column++) {
                hasWon &&= board[line][column].drawn;
                if (!hasWon) {
                    break;
                }
            }
            if (hasWon) {
                return true;
            }
        }

        for (let column = 0; column < 5; column++) {
            let hasWon = true;
            for (let line = 0; line < 5; line++) {
                hasWon &&= board[line][column].drawn;
                if (!hasWon) {
                    break;
                }
            }
            if (hasWon) {
                return true;
            }
        }

        return false;
    }

    function getScore(board: TBoard, drawnNumber: number) {
        let sum = 0;
        for (let line = 0; line < 5; line++) {
            for (let column = 0; column < 5; column++) {
                if (!board[line][column].drawn) {
                    sum += board[line][column].number;
                }
            }
        }
        return sum * drawnNumber;
    }
}

function run2(data: Array<string>): number {
    type TNumber = {
        number: number,
        drawn: boolean
    }
    type TBoard = {
        values:Array<Array<TNumber>>,
        hasWon: boolean
    };

    const drawnNumbers = data[0].split(",").map((value) => parseInt(value));

    let boardCursor = 2;
    const boards = [] as Array<TBoard>;

    const numbers = {} as Record<number, TNumber>

    for (let i = 0; i < 100; i++) {
        numbers[i] = {number: i, drawn: false};
    }

    while (data[boardCursor]) {
        const board = {
            values: [],
            hasWon: false
        } as TBoard;

        for (let line = 0; line < 5; line++) {
            board.values.push(data[boardCursor + line].trim().split(/[ ]+/).map((value) => numbers[parseInt(value)]))
        }

        boards.push(board);
        boardCursor += 6;
    }

    let remainingBoards = boards.length;

    for (let i = 0; i < drawnNumbers.length; i++) {
        const drawnNumber = drawnNumbers[i];
        numbers[drawnNumber].drawn = true;

        for (const board of boards) {
            if(board.hasWon) {
                continue;
            }

            if (hasBoardWon(board)) {
                board.hasWon = true;
                remainingBoards--;

                if (remainingBoards === 0) {
                    return getScore(board, drawnNumber);
                }
            }
        }
    }

    return 0;

    function hasBoardWon(board: TBoard) {
        for (let line = 0; line < 5; line++) {
            let hasWon = true;
            for (let column = 0; column < 5; column++) {
                hasWon &&= board.values[line][column].drawn;
                if (!hasWon) {
                    break;
                }
            }
            if (hasWon) {
                return true;
            }
        }

        for (let column = 0; column < 5; column++) {
            let hasWon = true;
            for (let line = 0; line < 5; line++) {
                hasWon &&= board.values[line][column].drawn;
                if (!hasWon) {
                    break;
                }
            }
            if (hasWon) {
                return true;
            }
        }

        return false;
    }

    function getScore(board: TBoard, drawnNumber: number) {
        let sum = 0;
        for (let line = 0; line < 5; line++) {
            for (let column = 0; column < 5; column++) {
                if (!board.values[line][column].drawn) {
                    sum += board.values[line][column].number;
                }
            }
        }
        return sum * drawnNumber;
    }
}

export { run1, run2 }
