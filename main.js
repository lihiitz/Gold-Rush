// const GoldRush = require(`./GoldRush`)
// const Player = require(`./Player`)


const render = new Renderer()

let p1 = new Player("1", { row: 0, col: 0 })
let p2 = new Player("2", { row: 7, col: 7 })
let board = new GoldRush(8, 8, [p1, p2])

render.renderBoard(board.matrix)

$(document).keypress(function (e) {
    let move
    let p
    switch (e.which) {
        case 119:
            move = "up"
            p = p1
            break
        case 115:
            move = "down"
            p = p1
            break
        case 97:
            move = "left"
            p = p1
            break
        case 100:
            move = "right"
            p = p1
            break
        case 105:
            move = "up"
            p = p2
            break
        case 107:
            move = "down"
            p = p2
            break
        case 106:
            move = "left"
            p = p2
            break
        case 108:
            move = "right"
            p = p2
            break
        default:
            break;
    }
    // if (e.which === 119) {
    //     move = "up"
    // } else if (e.which === 115) {
    //     move = "down"
    // } else if (e.which === 97) {
    //     move = "left"
    // } else if (e.which === 100) {
    //     move = "right"
    // } else if ()
    board.movePlayer(p, move)
    render.renderBoard(board.matrix)

    console.log(e.which)

})

// board.movePlayer(p1, "down")
// console.log(`-----------------------------------------------------------`);
// board.print()

// board.movePlayer(p2, "up")
// console.log(`-----------------------------------------------------------`);
// board.print()

// // board.movePlayer(p1, "down")
// board.movePlayer(p1, "down")
// console.log(`-----------------------------------------------------------`);
// board.print()


// board.movePlayer(p2, "left")
// console.log(`-----------------------------------------------------------`);
// board.print()

// board.movePlayer(p1, "up")
// console.log(`-----------------------------------------------------------`);
// board.print()

// board.movePlayer(p2, "down")
// console.log(`-----------------------------------------------------------`);
// board.print()

// board.movePlayer(p1, "left")
// console.log(`-----------------------------------------------------------`);
// board.print()

// board.movePlayer(p2, "right")
// board.movePlayer(p1, "left")
// board.print()
