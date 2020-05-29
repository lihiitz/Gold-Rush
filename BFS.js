class BFS {
    constructor(matrix){
        this.matrix = matrix
        this.N = matrix.length
        this.M = matrix[0].length
    }

    minDistance(coinPos, playerName) {
        let source = new QItem(coinPos.row, coinPos.col, 0)
        // To keep track of visited QItems. Marking 
        // blocked cells as visited.
        let visited = []
        for (let i = 0; i < this.N; i++) {
            let row = []
            for (let j = 0; j < this.M; j++) {
                    if (this.matrix[i][j] === 'W') {
                    row[j] = true
                } else {
                    row[j] = false
                }
            }
            visited.push(row)
        }
        // applying BFS on matrix cells starting from source 
        let q = new Queue()  //item is QItem type
        q.enqueue(source)
        visited[source.row][source.col] = true;
        while (!q.isEmpty()) {
            let temp = q.dequeue()
            let p = new QItem(temp.row, temp.col, temp.dist)
            // Destination found; 
            if (this.matrix[p.row][p.col] == playerName)
                return p.dist;
            // moving up 
            if (p.row - 1 >= 0 &&
                visited[p.row - 1][p.col] === false) {
                q.enqueue(new QItem(p.row - 1, p.col, p.dist + 1))
                visited[p.row - 1][p.col] = true
            }
            // moving down 
            if (p.row + 1 < this.N &&
                visited[p.row + 1][p.col] === false) {
                q.enqueue(new QItem(p.row + 1, p.col, p.dist + 1))
                visited[p.row + 1][p.col] = true
            }
            // moving left 
            if (p.col - 1 >= 0 &&
                visited[p.row][p.col - 1] === false) {
                q.enqueue(new QItem(p.row, p.col - 1, p.dist + 1))
                visited[p.row][p.col - 1] = true
            }
            // moving right 
            if (p.col + 1 < this.M &&
                visited[p.row][p.col + 1] === false) {
                q.enqueue(new QItem(p.row, p.col + 1, p.dist + 1))
                visited[p.row][p.col + 1] = true
            }
        }
        return -1;
    }
} 
