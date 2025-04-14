import { useState } from 'react'
//import { Chatbot } from 'supersimpledev'
import './ChatInput.css'
import axios from 'axios';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  async function handleSendingMessage(messages) {

    const data = { message: messages };
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/AI`, data); 
            if(response.status === 200) {
              console.log(response.data.message);
              return response.data.message;
            }
        } catch (error) {
            return 'Error:' + error;
        }

        return 'Error.';
  }

  function saveInputText(event) {
    //console.log(event.target.value);
    setInputText(event.target.value);
  }

  async function sendMessage() {
    //console.log(inputText) // print the inputText value
    const newChatMessages = [
      ...chatMessages, // change this array
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ]
    setInputText('');
    setChatMessages(newChatMessages);

    //const response = Chatbot.getResponse(inputText);

    const response = await handleSendingMessage(inputText);

    //console.log(response);
    setChatMessages([
      ...newChatMessages, // change this array
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to our AI assistant" 
        size="30"
        onChange={saveInputText} //Update the input text to array inputText
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}
