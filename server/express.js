const express = require("express")
const app = express()
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) =>{
    console.log(`conectioned:  ${socket.id}` )
    socket.on("join-room", (data) => {
        console.log(`User with ID ${socket.id} just joined room ${data}`)
        socket.join(data)



    socket.on("send-message", (data) =>{
        socket.to(data.join).emit("receive-message", data)
    })

    })
    socket.on("disconnect", () =>{
        console.log("user disconnected", socket.id)
      })
})

// io.on("connection", (socket) =>{
//     console.log(`conectioned:  ${socket.id}` )
//     socket.on("join-room", (data) => {
//         console.log(`User with ID ${socket.id} just joined room ${data}`)
//         socket.join(data)})



//     socket.on("send-message", (data) =>{
//         socket.emit("receive-message", data)
//     })


//     socket.on("disconnect", () =>{
//         console.log("user disconnected", socket.id)
//       })
// })


server.listen(3001, () =>{
    console.log("server is runnin")
})