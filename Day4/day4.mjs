import fs from 'fs'

// Input is a x by y grid of characters
const input = fs.readFileSync('./input_data.txt', 'utf8')

const rows = input.split('\n')
rows.pop()

const directions = {
    'right': (x,y) => [x+1, y],
    'left': (x,y) => [x-1, y],
    'down': (x,y) => [x, y+1],
    'up': (x,y) => [x, y-1],
    'downRight': (x,y) => [x+1, y+1],
    'downLeft': (x,y) => [x-1, y+1],
    'upRight': (x,y) => [x+1, y-1],
    'upLeft': (x,y) => [x-1, y-1],
}

const isInBounds = (x,y, rows) => x >= 0 && x < rows[0].length && y >= 0 && y < rows.length

const isXmasString = (x,y, rows, getNextCoordinate) => {
    let nextX = x
    let nextY = y
    let potentialXmas = ''
    for (let i = 0; i < 4; i++) {
        if (isInBounds(nextX, nextY, rows)) {
            potentialXmas += rows[nextY][nextX]
        } else {
            return false
        }
        [nextX, nextY] = getNextCoordinate(nextX, nextY)
    }
    return potentialXmas === "XMAS"
}

let count = 0
for (let x = 0; x < rows[0].length; x++) {
    for (let y = 0; y < rows.length; y++) {
        for (const getNextCoordinate of Object.values(directions)) {
            if (isXmasString(x,y, rows, getNextCoordinate)) {
                count++
            }
        }
    }
}

console.log(count)
