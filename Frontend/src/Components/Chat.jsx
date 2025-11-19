// Frontend/src/Components/Chat.jsx
import { useState } from 'react';
import './Chat.css';

const Chat = ({ activeChannel }) => {
    const [textInput, setTextInput] = useState('');

    // 1. Create a "Database" in state so we can remember messages for every room
    // Keys match the room names from ChatRoom.jsx
    const [chatData, setChatData] = useState({
        "Main Chat": [
            { id: 1, sender: 'them', text: 'Welcome to the main server!' },
            { id: 2, sender: 'you', text: 'Thanks!' }
        ],
        "Greg": [
            { id: 1, sender: 'them', text: 'Yo did you see the game?' },
        ],
        "Basketball": [
            { id: 1, sender: 'them', text: 'Lakers are losing again...' },
        ],
        "Memes": [
            { id: 1, sender: 'them', text: 'Check this out lol' },
        ]
    });

    // 2. Helper to get messages for the CURRENT room
    // If the room is empty/undefined, return an empty array []
    const currentMessages = chatData[activeChannel] || [];

    const handleSend = (e) => {
        e.preventDefault();
        if (!textInput.trim()) return;

        // Create the new message object
        const newMessage = {
            id: Date.now(),
            sender: 'you',
            text: textInput
        };

        // Update the "Database" state
        // We copy the old data, find the specific room, and add the new message to it
        setChatData(prevData => ({
            ...prevData, // Keep other rooms the same
            [activeChannel]: [...(prevData[activeChannel] || []), newMessage] // Update ONLY current room
        }));

        setTextInput('');
    };

    return (
        <div className="Chat-Container">
            <div className="Chat-Header">
                <h2># {activeChannel}</h2>
            </div>

            <div className="Messages-List">
                {/* 3. Map through the CURRENT messages only */}
                {currentMessages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={msg.sender === 'you' ? 'MessageBubbleYou' : 'MessageBubbleThem'}
                    >
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>

            <form className="Text-Bar" onSubmit={handleSend}>
                <input 
                    type="text" 
                    placeholder={`Message #${activeChannel}`} 
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <button className="SendBtn" type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat;