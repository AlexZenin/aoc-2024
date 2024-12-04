function getDiagonals(n) {
    const mainDiagonals = [];
    const antiDiagonals = [];

    // Collect main diagonals (top-left to bottom-right)
    for (let d = -n + 1; d < n; d++) {
        let mainDiagonal = [];
        for (let i = 0; i < n; i++) {
            let j = i + d;
            if (j >= 0 && j < n) {
                mainDiagonal.push([i, j]);  // (row, col) indices for main diagonal
            }
        }
        if (mainDiagonal.length > 0) {
            mainDiagonals.push(mainDiagonal);
        }
    }

    // Collect anti-diagonals (top-right to bottom-left)
    for (let d = 0; d < 2 * n - 1; d++) {
        let antiDiagonal = [];
        for (let i = 0; i < n; i++) {
            let j = d - i;
            if (j >= 0 && j < n) {
                antiDiagonal.push([i, j]);  // (row, col) indices for anti diagonal
            }
        }
        if (antiDiagonal.length > 0) {
            antiDiagonals.push(antiDiagonal);
        }
    }

    return { mainDiagonals, antiDiagonals };
}

console.log(JSON.stringify(getDiagonals(4), null, 2))
