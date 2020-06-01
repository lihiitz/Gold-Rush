class GoldRush extends Matrix {
    constructor(row, col, players) {
        super(row, col)
        this.players = players //players[0] = {name: "", currPos: {row: x, col: y}}
        // this.prevPlayer = {}
        this.coin = { name: "C", total: this.randNumOfCoins(), value: 10, poses: [] }
        this.wall = { name: "W", total: this.randNumOfWalls(), poses: [] }
        this.coinsOnBoard = 0
        this.createBoard()
        // this.roomId = roomId
    }

    // // USE FOR TESTS ONLY
    // constructor(row, col, players) {
    //     super(row, col)
    //     this.players = players //players[0] = {name: "", currPos: {row: x, col: y}}
    //     this.prevPlayer = null
    //     this.coin = { name: "C", total: 3, value: 10, poses: [{row: 1, col: 0}, {row: 2, col: 1}, {row: 1, col: 2}] }
    //     this.wall = { name: "W", total: 3, poses: [{row: 0, col: 1}, {row: 0, col: 2}, {row: 1, col: 1}] }
    //     this.coinsOnBoard = 0
    //     this.matrix = [
    //         ["1", "W", "W"],
    //         ["C", "W", "C"],
    //         [" ", "C", "2"]
    //     ]
    // }

    copy(game){
        // console.log(game.players);
        
        // this.players = game.players
        this.matrix = game.matrix
        // this.prevPlayer = game.prevPlayer
        this.coin = game.coin
        this.wall = game.wall
        this.coinsOnBoard = game.coinsOnBoard
    }
    
    randNumOfCoins() {
        let min = 1
        let max = (this.row * this.col) - this.players.length - 1//all slots on board - players slots - 1 (save at least 1 slot for wall)
        let num = Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
        return num
    }

    randNumOfWalls() {
        let min = 1
        let max = (this.row * this.col) -
            this.players.length - this.coin.total//all slots on board - players slots - coins slots
        let num = Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive        
        return num
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
                if (super.get(i, j) === 'W') {
                    super.alter(i, j, " ")
                }
            }
        }
    }

    loadWalls() {
        this.cleanOldWalls()
        this.wall.poses = []
        this.wall.total = this.randNumOfWalls()
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
        // this.coin.poses.forEach(element => {
        //     if (bfs.minDistance(element, this.players[0].name) === -1){
        //         return false
        //     }
        //     if (bfs.minDistance(element, this.players[1].name) === -1){
        //         return false
        //     }
        // })
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
        if (dir === 'up') {
            pos.row--
        } else if (dir === 'down') {
            pos.row++
        } else if (dir === 'left') {
            pos.col--
        } else {//right
            pos.col++
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

    isWall(pos) {
        let wallPos = this.wall.poses.find(
            p => (p.row === pos.row && p.col === pos.col))
        if (wallPos) {
            return true
        } else {
            return false
        }
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
        if (this.isWall(pos)) {
            return false
        }
        if (this.isOtherPlayer(pos)) {
            return false
        }
        return true
    }

    isOtherPlayerStuck(player){//if other player is stack - func will return false
        let otherPlayer
        player.name === "1" ? otherPlayer = this.players[1] : otherPlayer = this.players[0]
        let pos = {row: otherPlayer.currPos.row, col: otherPlayer.currPos.col}
        this.updatePos(pos, "up")
        if (this.isLegal(pos)){
            return true
        }
        pos = {row: otherPlayer.currPos.row, col: otherPlayer.currPos.col}
        this.updatePos(pos, "down")
        if(this.isLegal(pos)){
            return true
        }
        pos = {row: otherPlayer.currPos.row, col: otherPlayer.currPos.col}
        this.updatePos(pos, "left")
        if(this.isLegal(pos)){
            return true
        }
        pos = {row: otherPlayer.currPos.row, col: otherPlayer.currPos.col}
        this.updatePos(pos, "right")
        if(this.isLegal(pos)){
            return true
        }
        return false //meaning other player is stuck
    }

    isPlayerTurn(player) {
        // if (this.prevPlayer !== null && player.name === this.prevPlayer.name) {
            if (player.getPlayerTurn()){
                return true
            }else if (!this.isOtherPlayerStuck(player)){
                return true//not player turn but other player is stuck
            }
            return false//not player turn
    }

    makeMove(player, pos, prevPos) {
        let sign = super.get(pos.row, pos.col)
        super.alter(pos.row, pos.col, player.name)
        if (sign === this.coin.name) {
            player.score += this.coin.value
            this.coinsOnBoard --
        }
        super.alter(prevPos.row, prevPos.col, " ")
        player.setPlayerTurn(false)
        
        
        player.name === "1" ? this.players[1].setPlayerTurn(true) : this.players[0].setPlayerTurn(true)
    }

    movePlayer(player, dir) {
        let tempPos = { row: player.currPos.row, col: player.currPos.col }
        let prevPos = { row: tempPos.row, col: tempPos.col }
        this.updatePos(tempPos, dir)
        if (!this.isLegal(tempPos)) {
            console.log(`invalid move`)
        } else if (!this.isPlayerTurn(player)) {
            console.log(`not your turn`)
        } else {//legal move and current player turn:
            player.currPos = tempPos
            // console.log(player)
            
            this.makeMove(player, player.currPos, prevPos)
        }
    }
}