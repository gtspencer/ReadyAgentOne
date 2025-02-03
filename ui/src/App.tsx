import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { ChatMessage } from './types';

function App() {
  const [endpoint, setEndpoint] = useState('http://localhost:3000/readyagentone');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = async (content: string) => {
    // Add user message to chat
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      // Add assistant response to chat
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || 'No response from the assistant',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Add error message to chat
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Error: Could not connect to the AI agent.',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendEvent = async (event: any) => {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Error sending event:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        endpoint={endpoint}
        onEndpointChange={setEndpoint}
        onSendEvent={handleSendEvent}
      />
      <div className="flex-1">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default App;