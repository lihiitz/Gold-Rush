class Player{
    constructor(name, pos, turn, score){//pos = {row: x, col: y}
        this.name = name
        this.currPos = pos
        this.score = score
        this.currentTurn = turn
    }

    setPlayerTurn(turn){
        this.currentTurn = turn
    }

    getPlayerTurn(){
        return this.currentTurn
    }
    move(newPos){
        this.pos = newPos
    }
}

// module.exports = Player