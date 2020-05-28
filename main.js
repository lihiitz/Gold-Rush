// const GoldRush = require(`./GoldRush`)
// const Player = require(`./Player`)


const render = new Renderer()
let p1, p2, board

$(`#startGame`).on(`click`, function(){
    let numOfRows = $(`#rowsInput`).val()
    let numOfCols = $(`#colsInput`).val()
    p1 = new Player("1", { row: 0, col: 0 })
    p2 = new Player("2", { row: numOfRows - 1, col: numOfCols - 1 })
    board = new GoldRush(numOfRows, numOfCols, [p1, p2])
    render.renderBoard(board.matrix)
    startGame()
})

const startGame = function(){
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
        board.movePlayer(p, move)
        render.renderBoard(board.matrix)    
    })
}
