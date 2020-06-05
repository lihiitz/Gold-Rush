class GoldRush extends Matrix {
    constructor(row, col, players) {
        super(row, col)
        this.players = players //players[0] = {name: "", currPos: {row: x, col: y}}
        this.coin = { name: "C", total: this.randNum(1, ((row * col) - players.length - 1)), value: 10, poses: [] }
        this.wall = { name: "W", total: this.randNum(1, ((row * col) - players.length - this.coin.total)), poses: [] }
        this.coinsOnBoard = 0
        this.createBoard()
    }

    copy(game){
        this.matrix = game.matrix
        this.coin = game.coin
        this.wall = game.wall
        this.coinsOnBoard = game.coinsOnBoard
    }
    
    randNum(min, max){
        return (Math.floor(Math.random() * (max - min + 1)) + min)
    }

    randCoinsPos() {
        let noCoin = [
            `${this.players[0].currPos.row}` + `${this.players[0].currPos.col}`,
            `${this.players[1].currPos.row}` + `${this.players[1].currPos.col}`
        ]
        this.coin.poses.forEach(element => {
            noCoin.push(`${element.row}` + `${element.col}`)
        })
        let row = Math.floor(Math.random() * this.row)
        let col = Math.floor(Math.random() * this.col)
        return (noCoin.includes(`${row}` + `${col}`) ? this.randCoinsPos() : { row, col })
    }

    randWallPos() {
        let noWall = [
            `${this.players[0].currPos.row}` + `${this.players[0].currPos.col}`,
            `${this.players[1].currPos.row}` + `${this.players[1].currPos.col}`
        ]
        this.coin.poses.forEach(element => {
            noWall.push(`${element.row}` + `${element.col}`)
        })
        this.wall.poses.forEach(element => {
            noWall.push(`${element.row}` + `${element.col}`)
        })
        let row = Math.floor(Math.random() * this.row)
        let col = Math.floor(Math.random() * this.col)
        return (noWall.includes(`${row}` + `${col}`) ? this.randWallPos() : { row, col })
    }

    loadCoins() {
        this.coin.poses = []
        for (let i = 0; i < this.coin.total; i++) {
            let pos = this.randCoinsPos()
            this.coin.poses.push(pos)
            super.alter(pos.row, pos.col, this.coin.name)
        }
    }

    cleanOldWalls() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if (super.get(i, j) === this.wall.name) {
                    super.alter(i, j, " ")
                }
            }
        }
    }

    loadWalls() {
        this.cleanOldWalls()
        this.wall.poses = []
        this.wall.total = this.randNum(1, (this.row * this.col) - this.players.length - this.coin.total)
        for (let i = 0; i < this.wall.total; i++) {
            let pos = this.randWallPos()
            this.wall.poses.push(pos)
            super.alter(pos.row, pos.col, this.wall.name)
        }
    }

    createBoard() {
        super.alter(this.players[0].currPos.row, this.players[0].currPos.col, this.players[0].name)
        super.alter(this.players[1].currPos.row, this.players[1].currPos.col, this.players[1].name)
        this.loadCoins()//don't change order of loads(walls need to be after coins etc)
        this.coinsOnBoard = this.coin.total
        do {
            this.loadWalls()
        } while (!this.isValidWalls())
    }

    isValidWalls() {//for each coin - check if player1 and player2 can access
        const bfs = new BFS(this.matrix)
        for (let i = 0; i < this.coin.poses.length; i++) {
            if (bfs.minDistance(this.coin.poses[i], this.players[0].name) === -1) {
                return false
            }
            if (bfs.minDistance(this.coin.poses[i], this.players[1].name) === -1) {
                return false
            }
        }
        return true
    }

    updatePos(pos, dir) {
        switch (dir) {
            case `up`:
                pos.row --
                break
            case 'down':
                pos.row ++
                break
            case `left`:
                pos.col --
                break
            case 'right':
                pos.col ++
                break
            default:
                break
        }
    }

    isOutOfBounds(pos) {
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

    isOtherPlayer(pos) {
        if (this.matrix[pos.row][pos.col] === this.players[0].name) {
            return true
        }
        if (this.matrix[pos.row][pos.col] === this.players[1].name) {
            return true
        }
        return false
    }

    isLegal(pos) {
        if (!this.isOutOfBounds(pos)) {
            return false
        }
        if (this.matrix[pos.row][pos.col] === this.wall.name){
            return false
        }
        if (this.isOtherPlayer(pos)) {
            return false
        }
        return true
    }

    updatePosAndCheckIfLegal(otherPlayer, dir){
        let pos = {...otherPlayer.currPos}
        this.updatePos(pos, dir)
        if (this.isLegal(pos)){
            return true
        }
    }

    isOtherPlayerStuck(player){
        let otherPlayer
        player.name === this.players[0].name ? otherPlayer = this.players[1] : otherPlayer = this.players[0]

        if (this.updatePosAndCheckIfLegal(otherPlayer, "up")){
            return false
        }
        if (this.updatePosAndCheckIfLegal(otherPlayer, "down")){
            return false
        }
        if (this.updatePosAndCheckIfLegal(otherPlayer, "left")){
            return false
        }
        if (this.updatePosAndCheckIfLegal(otherPlayer, "right")){
            return false
        }
        return true //meaning other player is stuck
    }

    isPlayerTurn(player) {
            if (player.getPlayerTurn()){
                return true
            }else if (this.isOtherPlayerStuck(player)){
                return true//not player turn but other player is stuck
            }
            return false//not player turn
    }

    makeMove(player, prevPos) {
        let pos = player.currPos
        let sign = super.get(pos.row, pos.col)
        super.alter(pos.row, pos.col, player.name)
        if (sign === this.coin.name) {
            player.score += this.coin.value
            this.coinsOnBoard --
        }
        super.alter(prevPos.row, prevPos.col, " ")
        player.setPlayerTurn(false)
        player.name === this.players[0].name ? this.players[1].setPlayerTurn(true) : this.players[0].setPlayerTurn(true)
    }

    movePlayer(player, dir) {
        let tempPos = {...player.currPos}
        let prevPos = {...player.currPos}
        this.updatePos(tempPos, dir)
        if (!this.isLegal(tempPos)) {
            console.log(`invalid move`)
        } else if (!this.isPlayerTurn(player)) {
            console.log(`not your turn`)
        } else {//legal move and current player turn:
            player.currPos = tempPos
            this.makeMove(player, prevPos)
        }
    }
}