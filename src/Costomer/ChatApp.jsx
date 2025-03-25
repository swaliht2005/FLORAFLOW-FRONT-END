import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chating from "./Chating"; // Import Chating Component
import swalih from "../assets/images/swalih.jpg"
const ChatApp = () => {
  const [chat, SetChat] = useState(false); // State to show/hide Chating component

  const startChat = () => {
    SetChat(true); // Show Chating component when button is clicked
  };

  const chats = [
    {
      id: 1,
      name: "Catherine Richardson",
      message: "I'm sorry, I didn’t catch that...",
      image: swalih,
    },
    {
      id: 2,
      name: "Themeforest Group",
      message: "Jeny: That’s pretty common...",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    },
    {
      id: 3,
      name: "Eva Walker",
      message: "You’re kidding! I drive a motor...",
      image: null, // No image, use initials
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-indigo-600 text-white flex flex-col">
        <div className="p-4 flex items-center space-x-2 rounded-fullh">
          <img
            src={swalih}
            alt="Logo"
            className="h-8"
          />
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search users"
            className="w-full p-2 rounded-md bg-white text-gray-800"
          />
        </div>

        {/* Chat List */}
        <div className="flex-grow overflow-y-auto">
          <ul>
            {chats.map((chat, index) => (
              <li
                key={chat.id}
                className={`p-4 flex items-center cursor-pointer ${
                  index === 2 ? "bg-indigo-500" : "hover:bg-indigo-500"
                }`}
              >
                {chat.image ? (
                  <img
                    src={chat.image}
                    alt={chat.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                ) : (
                  <span className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">
                    {chat.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="font-semibold">{chat.name}</p>
                  <p className="text-xs text-gray-300">{chat.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow bg-white flex flex-col items-center justify-center p-4">
        {chat ? (
          <div className="w-full ">
             <Chating/> 
          </div>
        ) : (
          <>
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              className="h-20 w-20 rounded-full"
              alt="Profile"
            />
            <h2 className="text-xl font-semibold mt-2 text-center">
              Welcome, Christina!
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Please select a chat to start messaging.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
              onClick={startChat}
            >
              Start a conversation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
