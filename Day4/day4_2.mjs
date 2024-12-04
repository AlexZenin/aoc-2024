import fs from 'fs'

// Input is a x by y grid of characters
const input = fs.readFileSync('./input_data.txt', 'utf8')
const rows = input.split('\n')
rows.pop()

const directions = {
    'diagonalUpRight': (x, y) => [x + 1, y + 1],
    'diagonalDownRight': (x, y) => [x + 1, y - 1],
}

const isInBounds = (x, y, rows) => x >= 0 && x < rows[0].length && y >= 0 && y < rows.length

const isMasString = (x, y, rows, getNextCoordinate) => {
    let nextX = x
    let nextY = y
    let potentialMas = ''
    for (let i = 0; i < 3; i++) {
        if (isInBounds(nextX, nextY, rows)) {
            potentialMas += rows[nextY][nextX]
        } else {
            return false
        }
        [nextX, nextY] = getNextCoordinate(nextX, nextY)
    }
    return potentialMas === "MAS" || potentialMas === "SAM"
}

let count = 0
for (let x = 0; x < rows[0].length; x++) {
    for (let y = 0; y < rows.length; y++) {
        if (isMasString(x-1, y+1, rows, directions['diagonalDownRight'])
            && isMasString(x-1, y-1, rows, directions['diagonalUpRight'])) {
            count++
        }
    }
}

console.log(count)
