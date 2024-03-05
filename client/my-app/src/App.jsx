import React from 'react';
import  io  from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io.connect("http://localhost:3001")

function App() {
 const [join, setJoin] = useState("")
const handleJoin = (e) =>{
  setJoin(e.target.value)
}
 const [message, receive] = useState('')
 const [receiveText, setReceiveText] = useState('')
 const handleReceive = (e) =>{
  receive(e.target.value)
 }
  const send = () =>{
  socket.emit("send-message", {message, join})
  }
  const joinRoom = () =>{
    if(join !== "")
    socket.emit("join-room", join)
  }
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setReceiveText(data.message)
    })
  }, [socket])
  return (
    <div className="App">
     <div className="chat">
      <input type="text" placeholder='join room' onChange={handleJoin} /> <button onClick={joinRoom}>Join room</button>
      <input type="text" value={message} onChange={handleReceive} />
      <button onClick={send}>send</button>
     </div>
     <h2>texts: {receiveText}</h2>
    </div>
  );
}

export default App;
