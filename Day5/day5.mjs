import fs from 'fs'

// Input is a x by y grid of characters
const input = fs.readFileSync('./input.txt', 'utf8')

const rows = input.split('\n')
rows.pop()

const splitPoint = rows.findIndex(row => row === '')
const rules = rows.slice(0, splitPoint)
const updates = rows.slice(splitPoint + 1)

const rulesSet = new Set(rules)

/**
 *
 * @param {Array<number>} update
 */
function isUpdateValid(update) {
    const updatesRules = new Set()
    for (let i = 0; i < update.length; i++) {
        for (let j = 0; j < update.length; j++) {
            if (i === j) continue
            if (j > i) {
                updatesRules.add(`${update[j]}|${update[i]}`)
            } else {
                updatesRules.add(`${update[i]}|${update[j]}`)
            }
        }
    }
    const intersection = updatesRules.intersection(rulesSet)
    if (intersection.size > 0) {
        return false
    }
    return Number(update[Math.floor(update.length / 2)])
}

const output = updates.reduce((total, update) => {
    const x = isUpdateValid(update.split(','))
    return x ? total + x : total
}, 0)

console.log(output)
