import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:4000');
const mainUrl = 'http://10.80.4.55:8000';

export default function SocketTest() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (msg) {
            socket.emit('sendMessage', { msg, room, username });
            setMsg("");
        }
    };
    
    // const featchMessages = ()=>{
    //     axios.get(`${mainUrl}/api/method/novelaichatassist.api.test.get_chat`)
    //     .then((res)=>{
    //         console.log(res.data.messsage);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        // featchMessages();

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const joinRoom = () => {
        if (room && username) {
            socket.emit("join_room", { room, username });
            setMessages([]);
        }
    };

    const leaveRoom = () => {
        if (room && username) {
            socket.emit("leave_room", { room, username });
            setMessages([]);
            setRoom("");
        }
    };

    return (
        <div>
            <h2>Chat Application</h2>
            {room && <h5>Joined Room  = {room}</h5>}
            <div>
                <input
                    type="text"
                    placeholder='Enter your name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder='Room number'
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button onClick={joinRoom} disabled={!room || !username}>Join Room</button>
                <button onClick={leaveRoom} disabled={!room || !username}>Leave Room</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder='Message...'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button onClick={sendMessage} disabled={!msg}>Send Message</button>
            </div>
            <div>
                <h3>Messages:</h3>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}><strong>{message.username}:</strong> {message.msg} (Room: {message.room})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
