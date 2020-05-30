// const GoldRush = require(`./GoldRush`)
// const Player = require(`./Player`)


const render = new Renderer()
let p1, p2, board

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})

$(`#startGame`).on(`click`, function(){
    let numOfRows = $(`#rowsInput`).val()
    let numOfCols = $(`#colsInput`).val()
    $(`#board`).css("grid-template-columns", `repeat(${numOfCols}, 1fr)`)
    $(`#board`).css("grid-template-rows", `repeat(${numOfRows}, 1fr)`)
    p1 = new Player("1", { row: 0, col: 0 })
    p2 = new Player("2", { row: numOfRows - 1, col: numOfCols - 1 })
    board = [
        ["1", "W", "W"],
        ["C", "W", "C"],
        [" ", "C", "2"]
    ]

    render.renderBoard(board)
    render.renderScore(0, 0)
    startGame()
})

const isValidWalls = function(board, coins){//for each coin - check if player1 and player2 can access
    const bfs = new BFS(board)
    for (let i = 0; i < coins.length; i++)
    {
        if (bfs.minDistance(coins[i], "1") === -1){
            return false
        }
        if (bfs.minDistance(coins[i], "2") === -1){
            return false
        }
    }
    // coins.forEach(element => {
    //     if (bfs.minDistance(element, "1") === -1){
    //         return false
    //     }
    //     if (bfs.minDistance(element, "2") === -1){
    //         return false
    //     }
    // })
    return true
}

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
        render.renderScore(p1.score, p2.score)    
    })
}
