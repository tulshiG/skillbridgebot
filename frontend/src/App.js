// skillbridge-chatbot/frontend/src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      });
      const result = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: result.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error talking to backend." }]);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="chat-window">
        <div className="chat-header">SkillBridge AI Assistant</div>
        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="message bot">Typing...</div>}
        </div>
        <div className="chat-footer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me something..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;

// // skillbridge-chatbot/frontend/src/App.css

// // skillbridge-chatbot/frontend/package.json

// import React from 'react';

// function App() {
//   return (
//     <div>
//       <h1>SkillBridge Chatbot</h1>
//     </div>
//   );
// }

// export default App;
