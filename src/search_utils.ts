export type Cell = {
    value: string;
    row: number;
    col: number;
    adjacents: Cell[]
}

export const mapGrid = (grid: string[][]): Cell[] => {
    let map = grid.map((row, i) => {
        return row.map((item, ii) => {
            return {
                value: item,
                row: i,
                col: ii,
                adjacents: []
            }
        })
    })

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            for (let _row = -1; _row < 2; _row++) {
                for (let _col = -1; _col < 2; _col++) {
                    if (
                        (_row === -1 && _col === -1) ||
                        (_row === -1 && _col === 1) ||
                        (_row === 1 && _col === -1) ||
                        (_row === 1 && _col === 1)
                    ) {
                        continue;
                    }
                    if (
                        map[row + _row] &&
                        map[row + _row][col + _col] &&
                        ((row !== row + _row) || (col !== col + _col))
                    ) {
                        map[row][col].adjacents.push((map[row + _row][col + _col] as never))
                    }
                }
            }
        }
    }

    return map.flat();
}

export const searchAdjacents = (cell: Cell, word: string[], used: Cell[]): Cell[] => {
    if (!word.length) {
        return [...used, cell];
    }
    const remainder = [...word];
    const target = remainder.shift();
    let adjacents = cell.adjacents.filter(adjacent => {
        return adjacent.value === target &&
            !used.find(uCell =>
                `${uCell.row + 1}-${uCell.col + 1}` === `${adjacent.row + 1}-${adjacent.col + 1}`
            )
    })

    if (!adjacents.length) {
        return [];
    }

    for (let adjacent of adjacents) {
        let solution = searchAdjacents(adjacent, remainder, [...used, cell]);
        if (solution.length) {
            return solution;
        }
    }

    return [];
}

export const findPath = (map: Cell[], word: string): Cell[] => {
    if (!word.length) {
        return [];
    }

    let letters = word.split('');

    const target = letters.shift();
    const startingCells = map.filter(item => target === item.value)

    for (let scell of startingCells) {
        let solution = searchAdjacents(scell, letters, []);
        if (solution.length) {
            return solution;
        }
    }

    return [];
}

export function findSolution(board: string[][], word: string): Cell[] {
    const map = mapGrid(board)
    let solution = findPath(map, word)
    return solution;
};