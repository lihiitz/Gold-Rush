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


//You can paste the code from the lesson below to test your solution

// let m = new Matrix(3, 4)
// m.print()
// //prints
// /*
// 1       2       3       4
// 5       6       7       8
// 9       10      11      12
// */

// m.alter(0, 0, m.get(1, 1))
// m.printColumn(0) //prints 6, 5, 9 (separate lines)
// m.printRow(0) //prints 6, 2, 3, 4 (separate lines)

// let m = new Matrix(3, 4)
// console.log(m.findCoordinate(12)) //prints {x: 3, y: 2}
// console.log(m.findCoordinate(7)) //prints {x: 2, y: 1}


/* Do not remove the exports below */
// module.exports = Matrix