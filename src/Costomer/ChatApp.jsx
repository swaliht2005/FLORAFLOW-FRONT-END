
import React, { useState, useEffect } from "react";
import Chating from "../Costomer/Chating";
import swalih from "../assets/images/swalih.jpg";
import Footer2 from "../Combonents/Footer2";
import Navebar from "../Combonents/Navebar";

const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile/all", {
          headers: {
            Authorization: `Bearer valid-token-123`, // Replace with real token (e.g., from localStorage)
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Could not load users. Please try again.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const startChat = (userId) => {
    setActiveChat(userId);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  return (
    <div className="h-screen">
      <Navebar />
      <div className="flex h-screen">
        <div
          className={`w-full md:w-1/4 bg-indigo-600 text-white flex flex-col md:flex ${
            activeChat && "hidden md:flex" // Hide on small screens if chat is active
          }`}
        >
          <div className="p-4 flex items-center space-x-2">
            <button onClick={() => startChat(users[0]?.id)} className="flex items-center">
              <img src={swalih} alt="Logo" className="h-8 rounded-full" />
              <h2 className="text-xl font-semibold ml-2">Chats</h2>
            </button>
          </div>

          <div className="p-4">
            <input
              type="text"
              placeholder="Search users"
              className="w-full p-2 rounded-md bg-white text-gray-800"
            />
          </div>

          <div className="flex-grow overflow-y-auto w-full">
            {loading ? (
              <p className="p-4 text-center">Loading users...</p>
            ) : error ? (
              <p className="p-4 text-center text-red-300">{error}</p>
            ) : (
              <ul>
                {users.map((user) => (
                  <li
                    key={user._id}
                    className={`p-4 flex items-center cursor-pointer ${
                      activeChat === user._id ? "bg-indigo-500" : "hover:bg-indigo-500"
                    }`}
                    onClick={() => startChat(user._id)}
                  >
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:5000/api/uploads/${user.profileImage}`}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-10 w-10 rounded-full mr-3"
                        onError={(e) => (e.target.src = swalih)} // Fallback image
                      />
                    ) : (
                      <span className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-3">
                        {user.firstName ? user.firstName.charAt(0) : "U"}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-300">Click to chat</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Chat Area (visible on larger screens or when a chat is active) */}
        <div
          className={`flex-grow bg-white flex flex-col ${
            activeChat ? "block" : "items-center justify-center"
          } p-4 ${activeChat ? "" : "hidden sm:hidden md:block"}`}
        >
          {activeChat ? (
            <div className="w-full h-full">
              <div className="flex justify-between items-center bg-gray-100 p-2">
                <button onClick={closeChat} className="md:hidden">
                  &lt; Back
                </button>
                <h2 className="font-semibold">
                  {users.find((u) => u._id === activeChat)?.firstName || "Chat"}{" "}
                  {users.find((u) => u._id === activeChat)?.lastName || ""}
                </h2>
                <div></div> {/* Empty div for spacing */}
              </div>
              <Chating room={`chat-${activeChat}`} />
            </div>
          ) : (
            // Welcome screen content
            <div className="text-center">
              <h1 className="text-3xl font-semibold mb-4">Your Company Chat</h1>
              <p className="text-lg mb-2">
                Connect with our support team instantly.
              </p>
              <p className="text-lg mb-8">Access your chats from any device.</p>
              <div className="flex items-center text-sm">
                <span>Secure and private conversations.</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

export default ChatApp;
