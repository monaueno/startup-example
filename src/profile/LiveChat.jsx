import React, { useState, useEffect } from 'react';

export default function LiveChat() {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const appendMessage = (cls, from, msg) => {
    setMessages((prev) => [...prev, { cls, from, msg }]);
  };

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const wsUrl = `${protocol}://localhost:8080`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => appendMessage('system', 'websocket', 'connected');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'history') {
          data.messages.forEach((msg) => appendMessage('other', msg.from, msg.msg));
        } else {
          appendMessage('other', data.from, data.msg);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };
    ws.onclose = () => appendMessage('system', 'websocket', 'disconnected');
    ws.onerror = (error) => console.error('WebSocket error:', error);

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    const trimmedMsg = message.trim();

    if (!name.trim()) {
      alert('Please enter your name before sending a message.');
      return;
    }

    if (!trimmedMsg) {
      alert('Message cannot be empty.');
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      appendMessage('me', name, trimmedMsg);
      socket.send(JSON.stringify({ name, msg: trimmedMsg }));
      setMessage('');
    } else {
      alert('WebSocket is not connected.');
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
          padding: '10px',
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
