import fs from 'fs'

const lines = fs.readFileSync('./input_data.txt', 'utf8')

/**
 *
 * @param {Array<number>} line
 * @returns {boolean}
 */
function isSafe(line) {

  let increasing = true
  let decreasing = true

  for (let i = 1; i < line.length; i++) {

    const diff = line[i] - line[i - 1]

    if (diff === 0) {
        return false
    }

    if (Math.abs(diff) > 3) {
        return false
    }

    if (diff > 0 ) {
        decreasing = false
    }

    if (diff < 0) {
        increasing = false
    }
  }

  return increasing || decreasing
}

const input = lines.split('\n')
input.pop()

const output = input.reduce((prev, curr) => {
  if (isSafe(curr.split(' '))) {
    return prev + 1
  }
  return prev
}, 0)

console.log(output)
