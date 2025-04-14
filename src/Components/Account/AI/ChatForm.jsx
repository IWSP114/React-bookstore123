import { useState } from 'react'
import { ChatInput } from './ChatInput.jsx'
import ChatMessages from './ChatMessages.jsx'
import './ChatForm.css'

function ChatForm() {
  const [chatMessages, setChatMessages] = useState([{
    message: 'Hello! How can I help you?',
    sender : 'robot',
    id: 'id1'
  }]);

  return (
    <div className="app-container">
      
      <ChatMessages 
        chatMessages={chatMessages}
      />

      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default ChatForm