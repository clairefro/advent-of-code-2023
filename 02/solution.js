const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

const gamesRaw = raw.split("\n")

const games = {}

gamesRaw.forEach(g => {
    const [_, id, gameStr] = g.match(/Game (\d+): (.*)/)
    games[id] = gameStr
})

function getColorMap(roundStr) {
    const colorStrs = roundStr.split(",")
    const map = {}
    colorStrs.forEach(cs => {
        const [_, cnt, col] = cs.match(/(\d+) (\w+)/)
        map[col] = parseInt(cnt)
    })
    return map
}

/** PART 1 */
/** Which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes */

function gameStrIsPossible(gameStr, constraints) {
    const rounds = gameStr.split(";")
    const colorMaps = rounds.map(getColorMap)

    const hasImpossibleColorMap = colorMaps.map(cm => {
        const e = Object.entries(cm)
        const hasImpossibleColorCnt = e.map(([col, cnt]) => {
            return cnt <= constraints[col]
        }).includes(false)

        return !hasImpossibleColorCnt
    }).includes(false)

    return !hasImpossibleColorMap
}

const constraints = {
    red: 12,
    green: 13,
    blue: 14
}

console.log("PART 1")

const gamePossibilities = {}

Object.entries(games).forEach(([id, gameStr]) => {
    gamePossibilities[id] = gameStrIsPossible(gameStr, constraints)
})

const possibleGames = Object.entries(gamePossibilities)
    .filter(([_, poss]) => poss === true)
    .map(([id]) => parseInt(id))

console.log("sum of game ids")
console.log(possibleGames.reduce((a, b) => a + b))

/** PART 2 */
/** what is the fewest number of cubes of each color that could have been in the bag to make the game possible? */

function minViableCubes(gameStr) {
    const rounds = gameStr.split(";")
    const colorMaps = rounds.map(getColorMap)

    const minViable = {}

    colorMaps.forEach(cm => {
        Object.entries(cm)
            .forEach(([col, val]) => {
                if (!minViable[col]) {
                    minViable[col] = val
                } else {
                    if (minViable[col] > val) {
                        minViable[col] = val
                    }
                }
            })
    })
    console.log(gameStr)
    console.log(minViable)
    console.log({ power: power(minViable) })
    console.log(" ")
    return minViable
}

function power(colorMap) {
    return Object.values(colorMap).reduce((a, b) => a * b)
}

function getPower(gameStr) {
    const minViable = minViableCubes(gameStr)
    return power(minViable)
}

console.log("PART 2")

const powers = Object.values(games).map(p => getPower(p))

console.log("Sum of powers")
console.log(powers.reduce((a, b) => a + b))

