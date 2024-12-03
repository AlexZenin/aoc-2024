import fs from 'fs'

const lines = fs.readFileSync('./input_data.txt', 'utf8')

const input = lines.split('\n')
input.pop()
// console.log(input)
const regex = /mul\(\d{1,3},\d{1,3}\)/g

const output = input.map(line => {
    // console.log(line)
 const matches = line.match(regex)
    return matches.map(match => {
        const [x, y] = match.match(/\d{1,3}/g)
        return x * y
    }).reduce((prev, curr) => prev + curr, 0)
}).reduce((prev, curr) => prev + curr, 0)

console.log(output)
