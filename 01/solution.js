const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

const parsed = raw.split("\n")

/** PART 1 */

function getCalibration(str) {
    const d = str.match(/\d/g)
    return d.length === 1 ?
        parseInt(d[0] + d[0]) :
        parseInt(d[0] + d[d.length - 1])
}

const calibrations = parsed.map(row => getCalibration(row))

const reduced = calibrations.reduce((a, b) => a + b)

console.log("PART 1")
console.log(reduced)

/** PART 2 */

function getCalibrationsWithText(str) {
    const d = str.match(/\d|one|two|three|four|five|six|seven|eight|nine/g)
    const dp = parseDigits(d)
    return dp.length === 1 ?
        parseInt(dp[0] + dp[0]) :
        parseInt(dp[0] + dp[dp.length - 1])
}

const digitMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    zero: "0"
}

function parseDigits(digArr) {
    return digArr.map(d => Object.keys(digitMap).includes(d) ? digitMap[d] : d)
}

console.log("PART 2")
console.log(parsed.map(row => getCalibrationsWithText(row)).reduce((a, b) => a + b))
