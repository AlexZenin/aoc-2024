import fs from 'fs'

const lines = fs.readFileSync('./input_data.txt', 'utf8')

const input = lines.split('\n').slice(0, 1)
const regex = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))/g

/**
 *
 * @param {Array<string>} arr
 * @returns
 */
function parseArray(arr) {
    const stack = []
    let shouldPush = true
    for (const instruction of arr) {
        if (instruction === 'do()') {
            shouldPush = true
        } else if (instruction === "don't()") {
            shouldPush = false
        } else {
            if (shouldPush) {
                stack.push(instruction)
            }
        }
    }

    return stack.map(instruction => {
        const [x, y] = instruction.match(/\d{1,3}/g)
        return x * y
    }).reduce((prev, curr) => prev + curr, 0)
}

const output = input.map(line => {
    return parseArray(line.match(regex))
}).reduce((prev, curr) => prev + curr, 0)

console.log(output)
