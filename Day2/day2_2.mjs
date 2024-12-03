import fs from 'fs'

const lines = fs.readFileSync('./input_data.txt', 'utf8')

/**
 *
 * @param {Array<number>} line
 * @returns {boolean}
 */
function isSafe(line, hasProblemDamperBeenUsed = false) {

  let increasing = true
  let decreasing = true

//   console.log('\n')
//     console.log(line)
  for (let i = 1; i < line.length; i++) {
    const diff = line[i] - line[i-1]
    // console.log(line[i-1], line[i])

    if (diff === 0 || Math.abs(diff) > 3) {
        if (!hasProblemDamperBeenUsed) {
            return isSafe(line.toSpliced(i - 1, 1), true) || isSafe(line.toSpliced(i, 1), true)
        }
        return false
    }

    if (diff > 0 ) {
        if (increasing === false && !hasProblemDamperBeenUsed) {
            return isSafe(line.toSpliced(i-1, 1), true) || isSafe(line.toSpliced(i, 1), true)
        }
        decreasing = false
    }

    if (diff < 0) {
        if (decreasing === false && !hasProblemDamperBeenUsed) {
            return isSafe(line.toSpliced(i-1, 1), true) || isSafe(line.toSpliced(i, 1), true)
        }
        increasing = false
    }
  }


  if (increasing || decreasing) {
    // console.log('safe')
  } else {
    // console.log('\n')
    // console.log(line)
    // console.log('unsafe')
  }
  return increasing || decreasing
}

const input = lines.split('\n')
input.pop()

console.log(input.length)

const output = input.reduce((total, line) => {
//   const lineArray = line.split(' ')
//   let isSafeFlag = false
//   if (isSafe(lineArray)) {
//     isSafeFlag = true
//   }
//   for (let i = 0; i < lineArray.length; i++) {
//     if (isSafeFlag) {
//       break
//     }
//     if (isSafe(lineArray.toSpliced(i, 1))) {
//       isSafeFlag = true
//     }
//   }
//   if (isSafeFlag) {
//     return total + 1
//   }
//   return total
  if (isSafe(line.split(' '))) {
    return total + 1
  }
//   console.log('\n', line, 'unsafe')
  return total
}, 0)

console.log(output)
