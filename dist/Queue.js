class Queue{
    constructor(){
        this.queue = []
        this.length = 0
    }
    isEmpty(){
        if (this.length === 0){
            return true
        }else{
            return false
        }
    }
    print(){
        let str = ``
        for (let i = 0; i < this.length; i++){
            str += this.queue[i] + `, `
        }
        const final = str.substring(0, str.length - 2)
        console.log(`[` + final + `]`)
    }
    enqueue(item){
        this.queue[this.length] = item
        this.length++
    }
    dequeue(){
        if (this.length === 0){
            return null
        }
        const itemToDelete = this.queue[0]
        this.queue.splice(0, 1)
        this.length --
        return itemToDelete
    }
    peek(){
        if (this.length === 0){
            return null
        }
        return this.queue[0]
    }
}