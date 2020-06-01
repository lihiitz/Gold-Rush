const express = require(`express`)
const app = express()
const path = require(`path`)
const bodyParser = require(`body-parser`)
// const api = require(`./server/routes/api`)
const http = require('http').createServer(app)
const io = require(`socket.io`)(http)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, `dist`)))
app.use(express.static(path.join(__dirname, `node_modules`)))
// app.use(`/`, api)

let rooms = 0
function sendHeartbeat(){
  setTimeout(sendHeartbeat, 500);
  io.sockets.emit('ping', { beat : 1 });
}

setTimeout(sendHeartbeat, 500)


///////////////////////////////////////////////////////////////////////////////////////

// io.on(`connection`, (socket) => {
//   // Create a new game room and notify the creator of game
//   socket.on(`createGame`, function(data){
//     socket.join(`room-` + ++rooms)
//     socket.emit(`newGame`, {name: data.name, room: `room-`+rooms})
//   })
//   // Connect Player 2 to the room he requested. Show error if room full
//   socket.on(`joinGame`, function(data){
//     let room = io.nsps[`/`].adapter.rooms[data.room]
//     if (room && room.length === 1){
//       socket.join(data.room)
//       socket.broadcast.to(data.room).emit(`player1`, {})
//       socket.emit(`player2`, {name: data.name, room: data.room})
//     }else{
//       socket.emit(`err`, {message: `sorry, the room is full!`})
//     }
//   })
//   // Handle the turn played by either player and notify the other
//   socket.on(`playTurn`, function(data){
//     socket.broadcast.to(data.room).emit(`turnPlayed`, {tile: data.tile, room: data.room})
//   })
//   // Notify the players about the victor
//   socket.on(`gameEnded`, function(data){
//     socket.broadcast.to(data.room).emit(`gameEnd`, data)
//   })
// })

// io.on('connection', (socket) => {
//     socket.on('init', (game) => {
//       io.emit('init', game)
//     })
//   })

// io.on('connection', (socket) => {
//     socket.on('movement', (game) => {
//       io.emit('movement', game)
//     })
//   })

io.on('connection', (socket) => {
  socket.on('pong', function(data){
    console.log("Pong received from client");
})
  console.log('a user connected')
  socket.on(`movement`, (game) => {
    console.log(`in server`)    
    // socket.broadcast.emit(game)
    io.emit(`movement`, game)
  })
})

///////////////////////////////////////////////////////////////////////////////////////




const PORT = 3000
http.listen(process.env.PORT || PORT, function(){
    console.log(`running on port ${PORT}`)  
})