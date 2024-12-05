import fs from 'fs'

// Input is a x by y grid of characters
const input = fs.readFileSync('./input.txt', 'utf8')

const rows = input.split('\n')
rows.pop()

const splitPoint = rows.findIndex(row => row === '')
const rules = rows.slice(0, splitPoint)
const updates = rows.slice(splitPoint + 1)

const rulesSet = new Set(rules)

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
    const brokenRules = updatesRules.intersection(rulesSet)
    if (brokenRules.size > 0) {
        return [...brokenRules.values()][0]
    }
    return true
}

/**
 *
 * @param {Array<number>} update
 */
function reorderUpdate(update) {
    let newUpdate = [...update]
    while (isUpdateValid(newUpdate) !== true) {
        const [a, b] = isUpdateValid(newUpdate).split('|')
        newUpdate = swapNumbers(newUpdate, a, b)
    }
    return newUpdate
}

function swapNumbers(update, a, b) {
    const i = update.indexOf(a)
    const j = update.indexOf(b)
    const newUpdate = [...update]
    const temp = newUpdate[i]
    newUpdate[i] = newUpdate[j]
    newUpdate[j] = temp
    return newUpdate
}

let total = 0
for (const update of updates) {
    if (isUpdateValid(update.split(',')) !== true) {
        const reorderedUpdate = reorderUpdate(update.split(','))
        total += Number(reorderedUpdate[Math.floor(reorderedUpdate.length / 2)])
    }
}

console.log(total)

// 97, 13, 75, 29, 47
// 97, 75, 47, 29, 13

// 4801 -> too low
// 4884 -> correct
