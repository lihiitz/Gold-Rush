const socket = io()
const render = new Renderer()
let p1, p2, game

socket.on('ping', function(data){
    socket.emit('pong', {beat: 1});
  })

socket.on(`movement`, function(_game){
    // const [player1, player2] = _game.players
    // const { name, currPos } = _game.players[0]
    p1 = new Player(_game.players[0].name, _game.players[0].currPos, _game.players[0].currentTurn, _game.players[0].score)
    p2 = new Player(_game.players[1].name, _game.players[1].currPos, _game.players[1].currentTurn, _game.players[1].score)
    game = new GoldRush(_game.row, _game.col, [p1, p2])
    // game = new GoldRush(_game.row, _game.col, _game.players)
    
    game.copy(_game)
    // renderAll()
    console.log(game.players);
    
    renderAll()

})




Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})

$(`#startGame`).on(`click`, function(){
    let numOfRows = $(`#rowsInput`).val()
    let numOfCols = $(`#colsInput`).val()
    $(`#board`).css("grid-template-columns", `repeat(${numOfCols}, 1fr)`)
    $(`#board`).css("grid-template-rows", `repeat(${numOfRows}, 1fr)`)
    p1 = new Player("1", { row: 0, col: 0 }, true, 0)
    p2 = new Player("2", { row: numOfRows - 1, col: numOfCols - 1 }, false, 0)
    game = new GoldRush(numOfRows, numOfCols, [p1, p2])
    /////////////////////////////////////////////////////
    socket.emit('movement', game);
    // console.log(game);
    
    /////////////////////////////////////////
    renderAll()
    startGame()
})

const finishGame = function(){
    let winner
    if (game.players[0].score > game.players[1].score){
        winner = game.players[0].name
    }else if (game.players[1].score > game.players[0].score){
        winner = game.players[1].name
    }else{
        winner = null
    }
    render.renderGameOver(winner)    
}

const renderAll = function(){
    render.renderBoard(game.matrix)
    render.renderScore(p1.score, p2.score)        
    if (game.coinsOnBoard === 0){
        finishGame()
    } 
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
        game.movePlayer(p, move)        
        socket.emit(`movement`, game)
        
        
        renderAll() 
    })
}
