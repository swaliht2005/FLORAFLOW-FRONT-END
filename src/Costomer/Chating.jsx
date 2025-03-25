

// import React, { useState } from "react";
// import smileIcon from "../assets/images/smile.png";
// import cameraIcon from "../assets/images/camera.png";
// import ChatNavbar from "../Costomer/ChatNavbar";

// const Chating = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingText, setEditingText] = useState("");

//   // Send a new message
//   const sendMessage = () => {
//     if (input.trim() === "") return;
//     setMessages([...messages, input]);
//     setInput("");
//   };

//   // Handle enter key to send message
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   // Delete a message
//   const deleteMessage = (index) => {
//     setMessages(messages.filter((_, i) => i !== index));
//   };

//   // Start editing a message
//   const startEditing = (index) => {
//     setEditingIndex(index);
//     setEditingText(messages[index]);
//   };

//   // Save the edited message
//   const saveEdit = () => {
//     const updatedMessages = [...messages];
//     updatedMessages[editingIndex] = editingText;
//     setMessages(updatedMessages);
//     setEditingIndex(null);
//     setEditingText("");
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Chat Navbar */}
//       <ChatNavbar />

//       {/* Chat Messages */}
//       <div className="flex-grow p-4 overflow-y-auto">
//         <div className="flex flex-col space-y-4">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className="relative flex items-center p-3 bg-blue-100 text-blue-900 rounded-lg max-w-[70%] break-words self-start"
//             >
//               {index === editingIndex ? (
//                 <input
//                   type="text"
//                   value={editingText}
//                   onChange={(e) => setEditingText(e.target.value)}
//                   className="p-2 border border-gray-300 rounded-lg focus:outline-none w-full"
//                 />
//               ) : (
//                 <span className="text-sm sm:text-base">{message}</span>
//               )}

//               {/* Edit & Delete Buttons */}
//               <div className="absolute top-0 right-0 flex space-x-2">
//                 {index === editingIndex ? (
//                   <button
//                     onClick={saveEdit}
//                     className="text-green-500 text-xs sm:text-sm"
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => startEditing(index)}
//                     className="text-blue-500 text-xs sm:text-sm"
//                   >
//                     ✏️
//                   </button>
//                 )}
//                 <button
//                   onClick={() => deleteMessage(index)}
//                   className="text-red-500 text-xs sm:text-sm"
//                 >
//                   🗑️
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Input Field */}
//       <div className="flex items-center p-4 bg-white border-t border-gray-300">
//         {/* Smile Icon */}
//         <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 sm:mr-4">
//           <img src={smileIcon} alt="Smile" className="w-6 h-6" />
//         </button>

//         {/* Input Box */}
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none text-sm sm:text-base placeholder-gray-400"
//           placeholder="Type your message..."
//         />

//         {/* Camera Icon */}
//         <button className="w-10 h-10 flex items-center justify-center sm:ml-2">
//           <img src={cameraIcon} alt="Camera" className="w-6 h-6" />
//         </button>

//         {/* Send Button */}
//         <button
//           onClick={sendMessage}
//           className="ml-2 sm:ml-4 flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-white bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-md hover:translate-y-[-2px] hover:shadow-lg active:scale-95 transition-all duration-300"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             className="w-5 h-5 fill-current text-white"
//           >
//             <path fill="none" d="M0 0h24v24H0z"></path>
//             <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chating;

import React, { useState } from "react";
import smileIcon from "../assets/images/smile.png";
import cameraIcon from "../assets/images/camera.png";
import ChatNavbar from "../Costomer/ChatNavbar";

const Chating = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Function to send user message & get bot response
  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response after 1 second
    setTimeout(() => {
      generateBotResponse(input);
    }, 1000);
  };

  // Function to generate bot responses
  const generateBotResponse = (userText) => {
    let botText = "I'm not sure how to respond.";

    if (userText.toLowerCase().includes("hello")) {
      botText = "Hi there! How can I help you?";
    } else if (userText.toLowerCase().includes("help")) {
      botText = "Sure! What do you need help with?";
    } else if (userText.toLowerCase().includes("bye")) {
      botText = "Goodbye! Have a great day!";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
  };

  // Handle enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatNavbar />

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`relative flex items-center p-3 rounded-lg max-w-[70%] break-words ${
                message.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              <span className="text-sm sm:text-base">{message.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="flex items-center p-4 bg-white border-t border-gray-300">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 sm:mr-4">
          <img src={smileIcon} alt="Smile" className="w-6 h-6" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none text-sm sm:text-base placeholder-gray-400"
          placeholder="Type your message..."
        />

        <button className="w-10 h-10 flex items-center justify-center sm:ml-2">
          <img src={cameraIcon} alt="Camera" className="w-6 h-6" />
        </button>

        <button
          onClick={sendMessage}
          className="ml-2 sm:ml-4 flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-white bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-md hover:translate-y-[-2px] hover:shadow-lg active:scale-95 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current text-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chating;
