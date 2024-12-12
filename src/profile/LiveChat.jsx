// LiveChat.js
import React, { useState, useEffect } from 'react';

export default function LiveChat() {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to append a new message to the chat window
  const appendMessage = (cls, from, msg) => {
    setMessages((prev) => [...prev, { cls, from, msg }]);
  };

  // Establish WebSocket connection on component mount
  useEffect(() => {
    // Determine ws or wss based on the current protocol
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const wsUrl = `${protocol}://localhost:8000`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      appendMessage('system', 'websocket', 'connected');
    };

    ws.onmessage = async (event) => {
      const text = await event.data.text();
      try {
        const chat = JSON.parse(text);
        appendMessage(chat.from, chat.name, chat.msg);
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    ws.onclose = () => {
      appendMessage('system', 'websocket', 'disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const trimmedMsg = message.trim();
    if (trimmedMsg && name && socket && socket.readyState === WebSocket.OPEN) {
      // Display your own message immediately
      appendMessage('me', name, trimmedMsg);

      // Send message to the server
      const data = { name, msg: trimmedMsg };
      socket.send(JSON.stringify(data));

      // Clear the message input
      setMessage('');
    } else if (!name) {
      alert('Please enter your name before sending a message.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div
        id="chat-window"
        style={{
          width: '100%',
          height: '200px',
          border: '1px solid #ccc',
          overflowY: 'auto',
          marginBottom: '10px',
          padding: '10px'
        }}
      >
        {messages.map((m, idx) => (
          <div key={idx}>
            <span className={m.cls}>{m.from}</span>: {m.msg}
          </div>
        ))}
      </div>

      <input
        id="new-msg"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%' }}
      />
      <button id="send-button" onClick={sendMessage} style={{ width: '18%' }}>
        Send
      </button>
    </div>
  );
}