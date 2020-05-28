// const Matrix = require(`./Matrix`)
// const Player = require(`./Player`)

class GoldRush extends Matrix {
    constructor(row, col, players) {
        super(row, col)
        this.players = players //players[0] = {name: "", currPos: {row: x, col: y}}
        this.prevPlayer = null
        this.coin = {name: "C", total: 3, value: 10}
        this.loadBoard()
    }

    randPos(){
        let noCoin = [
            `${this.players[0].currPos.row}` + `${this.players[0].currPos.col}`,
            `${this.players[1].currPos.row}` + `${this.players[1].currPos.col}`
        ]
        let row = Math.floor(Math.random() * this.row)
        let col = Math.floor(Math.random() * this.col)        
        return (noCoin.includes(`${row}` + `${col}`) ? this.randPos() : {row, col})
    }

    loadCoins(){
        for (let i = 0; i < this.coin.total; i++){
            let pos = this.randPos()
            super.alter(pos.row, pos.col, this.coin.name)
        }
    }

    loadBoard() {
        let newMatrix = []
        for (let i = 0; i < this.row; i++) {
            let row = []
            for (let j = 0; j < this.col; j++) {
                row.push(`.`)
            }
            newMatrix.push(row)
        }
        this.matrix = newMatrix
        super.alter(this.players[0].currPos.row, this.players[0].currPos.col, this.players[0].name)
        super.alter(this.players[1].currPos.row, this.players[1].currPos.col, this.players[1].name)
        this.loadCoins()
    }

    updatePos(pos, dir) {
        if (dir === 'up') {
            pos.row --
        } else if (dir === 'down') {
            pos.row ++
        } else if (dir === 'left') {
            pos.col--
        } else {//right
            pos.col++
        }
    }

    isLegal(pos) {
        if (pos.row > this.row - 1) {
            return false
        }
        if (pos.row < 0) {
            return false
        }
        if (pos.col > this.col - 1) {
            return false
        }
        if (pos.col < 0) {
            return false
        }
        if (this.matrix[pos.row][pos.col] === this.players[0].name) {
            return false
        }
        if (this.matrix[pos.row][pos.col] === this.players[1].name) {
            return false
        }
        return true
    }

    isPlayerTurn(player) {
        if (this.prevPlayer !== null && player.name === this.prevPlayer.name) {
            return false
        }
        return true
    }

    makeMove(player, pos, prevPos){
        let sign = super.get(pos.row, pos.col)
        super.alter(pos.row, pos.col, player.name)
        if (sign === this.coin.name){
            player.score += this.coin.value
        }
        super.alter(prevPos.row, prevPos.col, ".")
        this.prevPlayer = player
    }

    movePlayer(player, dir) {
        let tempPos = {row: player.currPos.row, col: player.currPos.col}
        let prevPos = {row: tempPos.row, col: tempPos.col}
        this.updatePos(tempPos, dir)
        if (!this.isLegal(tempPos)) {
            console.log(`invalid move`)
        } else if (!this.isPlayerTurn(player)) {
            console.log(`not your turn`)
        } else {//legal move and my turn:
            player.currPos = tempPos
            this.makeMove(player, player.currPos, prevPos)
        }
    }
}

// module.exports = GoldRush