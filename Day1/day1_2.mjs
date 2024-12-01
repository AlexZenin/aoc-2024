// read the input file
import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf8');

// split the input into an array of lines
const lines = input.split('\n');

const firstColumn = []
const secondColumn = []
lines.forEach((line) => {
    const [first, second] = line.split('   ')
    firstColumn.push(first)
    secondColumn.push(second)
})

firstColumn.pop()
secondColumn.pop()

const secondColumnCountMap = new Map()
for (const num of secondColumn) {
    secondColumnCountMap.set(num, (secondColumnCountMap.get(num) || 0) + 1)
}

let total = 0
for (const num of firstColumn) {
    const count = secondColumnCountMap.get(num) || 0
    total += num * count
}

console.log("Total: ", total)
