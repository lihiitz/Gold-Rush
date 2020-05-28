class Player{
    constructor(name, pos){//pos = {row: x, col: y}
        this.name = name
        this.currPos = pos
        this.score = 0
    }

    move(newPos){
        this.pos = newPos
    }
}

// module.exports = Player