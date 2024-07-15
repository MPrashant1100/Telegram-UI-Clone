import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1');
        console.log('Fetched chats:', response.data);
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          setChats(response.data.data.data);
          console.log('Chats set to state:', response.data.data.data);
        } else {
          console.error('Invalid response structure:', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="w-full md:w-1/3 border-r border-gray-300">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Chats</h1>
        <ul>
          {chats.length > 0 ? (
            chats.map(chat => (
              <li key={chat.id} className="mb-2">
                <Link to={`/chat/${chat.id}`} className="block p-2 bg-gray-100 rounded hover:bg-gray-200">
                {chat.creator && chat.creator.name ? chat.creator.name : 'Unknown user'}
                </Link>
              </li>
            ))
          ) : (
            <li className="mb-2">No chats available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
