// Frontend/src/App.jsx
import { useState } from 'react'; // Import useState
import './App.css';
import ChatRoom from './Components/ChatRoom.jsx';
import Chat from './Components/Chat.jsx';

const App = () => {
  // 1. Create state to track which room is active
  const [currentChannel, setCurrentChannel] = useState('Main Chat');

  return (
    <div className="App-Container">
      
      <div className="GroupChats">
        {/* 2. Pass the state AND the function to change it to the sidebar */}
        <ChatRoom 
            activeChannel={currentChannel} 
            onChannelSelect={setCurrentChannel} 
        />
      </div>

      <div className="ChatSection">
         {/* 3. Pass the current channel name to the Chat component */}
        <Chat activeChannel={currentChannel} />
      </div>

    </div>
  )
};

export default App;