import { useState, useEffect } from 'react';
import './App.css';
import ChatRoom from './Components/ChatRoom.jsx';
import Chat from './Components/Chat.jsx';
import UsernameScreen from './Components/UsernameScreen.jsx';
import { HubConnectionBuilder } from '@microsoft/signalr';

const App = () => {
  // User & Channel State
  const [currentUser, setCurrentUser] = useState(null);
  const [channels] = useState(["Main Chat", "Greg", "Basketball", "Memes"]);
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  
  // Messages State
  const [messages, setMessages] = useState({
     "Main Chat": [], "Greg": [], "Basketball": [], "Memes": []
  });

  // SignalR Connection State
  const [connection, setConnection] = useState(null);

  // --- 1. SETUP CONNECTION WHEN USER LOGS IN ---
  useEffect(() => {
    if (currentUser) {
      const newConnection = new HubConnectionBuilder()
        // POINTING TO YOUR SPECIFIC IP:PORT FOR THE BACKEND (5260)
        .withUrl("http://192.168.1.101:5260/chathub") 
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    }
  }, [currentUser]);

  // --- 2. START CONNECTION & LISTEN FOR EVENTS ---
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
            console.log('Connected to Backend!');
            connection.invoke("JoinChannel", activeChannel);
        })
        .catch(e => console.error('Connection failed: ', e));

      // Listen for incoming messages from the Backend
      connection.on('ReceiveMessage', (msgObject, channelName) => {
        console.log("Message received:", msgObject, "on channel:", channelName);
        setMessages(prev => ({
          ...prev,
          [channelName]: [...(prev[channelName] || []), msgObject]
        }));
      });
    }
  }, [connection]);

  // --- 3. HANDLE CHANNEL SWITCHING ---
  useEffect(() => {
      if(connection && connection.state === "Connected") {
          connection.invoke("JoinChannel", activeChannel);
      }
  }, [activeChannel, connection]);

  // --- SEND MESSAGE FUNCTION ---
  const sendMessage = async (text) => {
      if (connection) {
          try {
              // Tell the server who sent the message, the text, and what channel it belongs to.
              await connection.invoke("SendMessage", currentUser, text, activeChannel);
          } catch (e) {
              console.error("Error sending message:", e);
          }
      }
  };

  // --- RENDER HELPERS ---
  if (!currentUser) {
      return <UsernameScreen onSetUser={setCurrentUser} />;
  }

  return (
    <div className="App-Container">
      <div className="Sidebar">
        <ChatRoom 
            channels={channels}
            activeChannel={activeChannel} 
            onChannelSelect={setActiveChannel} 
        />
        <div style={{padding: '20px', borderTop: '1px solid var(--ac1)'}}>
            <p style={{fontSize:'0.8rem', color:'grey', marginBottom:'5px'}}>Logged in as:</p>
            <h3 style={{color: 'white'}}>{currentUser}</h3>
            <button 
                onClick={() => { setCurrentUser(null); setConnection(null); }} 
                style={{marginTop: '10px', background: 'transparent', color: 'red', border: 'none', cursor: 'pointer'}}
            >
                Log Out
            </button>
        </div>
      </div>

      <div className="ChatSection">
        <Chat 
            activeChannel={activeChannel}
            messages={messages[activeChannel] || []}
            currentUser={currentUser}
            onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default App;