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
    board = new GoldRush(numOfRows, numOfCols, [p1, p2])
    render.renderBoard(board.matrix)
    render.renderScore(0, 0)
    // do{
        startGame()
    // }while(board.coinsOnBoard !== 0)
    // alert("game over")
})
const finishGame = function(){
    let winner
    if (board.players[0].score > board.players[1].score){
        winner = board.players[0].name
    }else if (board.players[1].score > board.players[0].score){
        winner = board.players[1].name
    }else{
        winner = null
    }
    render.renderGameOver(winner)    
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
        if (board.coinsOnBoard === 0){
            finishGame()
        }   
    })
}
