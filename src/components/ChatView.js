// src/components/ChatView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatView = () => {
  const { id: chatId } = useParams(); // Extract chatId from URL parameter
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!chatId) {
          console.error('No chatId provided.');
          return;
        }

        const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
        console.log('Fetched messages:', response.data);

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setMessages(response.data.data);
        } else {
          console.error('Invalid response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]); // Depend on chatId to trigger useEffect when it changes

  useEffect(() => {
    console.log('Current chatId:', chatId);
  }, [chatId]); // Log chatId whenever it changes

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="flex-1 p-4">
      <h1 className="text-xl font-bold mb-4">Chat</h1>
      <ul>
        {messages.length > 0 ? (
          messages.map(message => (
            <li key={message.id} className="mb-4">
              <div className="bg-gray-200 p-2 rounded">
                <p className="font-bold">{message.sender.name}</p>
                <p>{message.message}</p>
              </div>
            </li>
          ))
        ) : (
          <li className="mb-2">No messages available.</li>
        )}
      </ul>
    </div>
  );
};

export default ChatView;
