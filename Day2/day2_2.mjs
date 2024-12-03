import fs from 'fs'

const lines = fs.readFileSync('./input_data.txt', 'utf8')
const input = lines.split('\n')
input.pop()

/**
 *
 * @param {Array<number>} line
 * @returns {boolean}
 */
function isSafe(line, hasProblemDamperBeenUsed = false) {
  let direction = 0

  for (let i = 1; i < line.length; i++) {
    const diff = line[i] - line[i-1]
    if (diff === 0 || Math.abs(diff) > 3 || diff * direction < 0) {
        if (!hasProblemDamperBeenUsed) {
            return isSafe(line.toSpliced(i - 1, 1), true)
                || isSafe(line.toSpliced(i, 1), true)
                // This is in case of a change in direction with the first number. eg 7 4 6 7 8 10 13 15
                || (i-2 === 0 && isSafe(line.toSpliced(i-2, 1), true))
        }
        return false
    }
    direction = diff
  }
  return true
}

const output = input.reduce((total, line) => {
  return isSafe(line.split(' ')) ? total + 1 : total
}, 0)

console.log(output)
