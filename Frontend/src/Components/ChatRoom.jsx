// Frontend/src/Components/ChatRoom.jsx
import './ChatRoom.css';

// Deconstruct the props we sent from App.jsx
const ChatRoom = ({ activeChannel, onChannelSelect }) => {
    
    const rooms = ['Main Chat', 'Greg', 'Basketball', 'Memes'];

    return (
        <div className="ChatRoom-Container">
            <nav className="ChatRoom-Nav">
                <h2>Chat Rooms</h2>
                <ul className="ChatRoom-List">
                    {rooms.map((room) => (
                        <li 
                            key={room}
                            // Conditional Class: If this room is the active one, give it the Active style
                            className={`ChatRoom-Item ${activeChannel === room ? 'ChatRoom-Item-Active' : ''}`} 
                            
                            // The Click Handler: changes the state in App.jsx
                            onClick={() => onChannelSelect(room)}
                        >
                            {room}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
export default ChatRoom;