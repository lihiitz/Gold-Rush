class Matrix{
    constructor(row, col){
        this.matrix = []
        this.row = row
        this.col = col
        this.generateMatrix(row, col)
    }

    generateMatrix(row, col){
        for (let i = 0; i < row; i++)
        {
            let currRow = []
            for (let j = 0; j < col; j++)
            {
                currRow.push(" ")
            }
            this.matrix.push(currRow)
        }
    }
    print(){
        for(let i = 0; i < this.row; i++){
            let str = ''
            for(let j = 0; j < this.col; j++){
                str += this.matrix[i][j] + '\t'
            }
            console.log(str)    
        }
    }
    get(row, col){
        return this.matrix[row][col]
    }
    alter(row, col, item){
        this.matrix[row][col] = item
    }
    printColumn(col){
        let str = ''
        for (let i = 0; i < this.row; i++){
            str += this.matrix[i][col] + `\t`
        }
        console.log(str)    
    }
    printRow(row){
        let str = ''
        for (let i = 0; i < this.col; i ++)
        {
            str += this.matrix[row][i] + '\t'
        }
        console.log(str)    
    }
    findCoordinate(item){
        for (let i = 0; i < this.row; i++){
            for (let j = 0; j < this.col; j++){
                if (this.matrix[i][j] === item){
                    return {x: j, y: i}
                }
            }
        }
    }
}