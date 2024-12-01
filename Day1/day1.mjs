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

const sortedFirst = firstColumn.toSorted()
const sortedSecond = secondColumn.toSorted()

let diff = 0
for (let i = 0; i < sortedFirst.length; i++) {
    diff += Math.abs(sortedSecond[i] - sortedFirst[i])
}

console.log(diff)
