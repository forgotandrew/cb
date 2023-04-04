import React, { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    setMessages([...messages, { sender: "user", message }]);
    e.target.elements.message.value = "";

    // Send the message to the backend server for processing
    const response = await fetch("http://localhost:5000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessages([...messages, { sender: "bot", message: data.message }]);
    } else {
      console.log("Error processing message");
    }
  };

  return (
    <div
      style={{
        background: "#f9f9f9",
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.2em",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2em",
          marginBottom: "20px",
          textTransform: "uppercase",
          color: "#3273dc",
        }}
      >
        Chatbot
      </h1>
      <div style={{ marginBottom: "20px" }}>
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === "bot" && (
              <p
                style={{
                  background: "#3273dc",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  maxWidth: "80%",
                  alignSelf: "flex-start",
                }}
              >
                Bot: {message.message}
              </p>
            )}
            {message.sender === "user" && (
              <p
                style={{
                  background: "#fff",
                  color: "#000",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  maxWidth: "80%",
                  alignSelf: "flex-end",
                }}
              >
                You: {message.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <input
          type="text"
          name="message"
          placeholder="Type your message"
          style={{
            border: "2px solid #ccc",
            borderRadius: "30px",
            padding: "10px",
            minWidth: "50%",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#3273dc",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
