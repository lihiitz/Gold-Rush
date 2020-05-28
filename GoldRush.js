// const Matrix = require(`./Matrix`)
// const Player = require(`./Player`)

class GoldRush extends Matrix {
    constructor(row, col, players) {
        super(row, col)
        this.players = players //players[0] = {name: "", currPos: {row: x, col: y}}
        this.prevPlayer = null
        this.coin = {name: "C", total: this.randNumOfCoins(), value: 10, poses: []}
        this.wall = {name: "W", total: this.randNumOfWalls(), poses: []}
        this.createBoard()
    }

    randNumOfCoins(){
        let min = 1        
        let max = (this.row * this.col) - this.players.length//all slots on board - players slots
        let num = Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
        return num
    }

    randNumOfWalls(){
        let min = 1
        let max = (this.row * this.col) - 
            this.players.length - this.coin.total//all slots on board - players slots - coins slots
        let num = Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
        return num
    }
    randCoinsPos(){
        let noCoin = [
            `${this.players[0].currPos.row}` + `${this.players[0].currPos.col}`,
            `${this.players[1].currPos.row}` + `${this.players[1].currPos.col}`
        ]
        let row = Math.floor(Math.random() * this.row)
        let col = Math.floor(Math.random() * this.col)        
        return (noCoin.includes(`${row}` + `${col}`) ? this.randCoinsPos() : {row, col})
    }

    randWallPos(){
        let noWall = [
            `${this.players[0].currPos.row}` + `${this.players[0].currPos.col}`,
            `${this.players[1].currPos.row}` + `${this.players[1].currPos.col}`
        ]
        this.coin.poses.forEach(element => {
            noWall.push(`${element.row}` + `${element.col}`)
        })
        
        let row = Math.floor(Math.random() * this.row)
        let col = Math.floor(Math.random() * this.col)        
        return (noWall.includes(`${row}` + `${col}`) ? this.randWallPos() : {row, col})
    }

    loadCoins(){
        for (let i = 0; i < this.coin.total; i++){
            let pos = this.randCoinsPos()
            this.coin.poses.push(pos)
            super.alter(pos.row, pos.col, this.coin.name)
        }
    }

    loadWalls(){
        for (let i = 0; i < this.wall.total; i++){
            let pos = this.randWallPos()
            this.wall.poses.push(pos)
            super.alter(pos.row, pos.col, this.wall.name)
        }
    }

    createBoard() {
        let newMatrix = []
        for (let i = 0; i < this.row; i++) {
            let row = []
            for (let j = 0; j < this.col; j++) {
                row.push(` `)
            }
            newMatrix.push(row)
        }
        this.matrix = newMatrix
        super.alter(this.players[0].currPos.row, this.players[0].currPos.col, this.players[0].name)
        super.alter(this.players[1].currPos.row, this.players[1].currPos.col, this.players[1].name)
        this.loadCoins()//dont change order of loads(walls need to be after coins etc)
        this.loadWalls()
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

    isOutOfBounds(pos){
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
        return true
    }

    isWall(pos){
        let wallPos = this.wall.poses.find(
            p => (p.row === pos.row && p.col === pos.col))
        if (wallPos){
            return true
        }else{
            return false
        }
    }

    isOtherPlayer(pos){
        if (this.matrix[pos.row][pos.col] === this.players[0].name) {
            return true
        }
        if (this.matrix[pos.row][pos.col] === this.players[1].name) {
            return true
        }
        return false
    }
    isLegal(pos) {
        if (!this.isOutOfBounds(pos)){
            return false
        }
        if (this.isWall(pos)){
            return false
        }
        if (this.isOtherPlayer(pos)){
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
        super.alter(prevPos.row, prevPos.col, " ")
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