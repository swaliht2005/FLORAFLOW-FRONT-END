import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
// import shopLogo from '../assets/img/shopLogo.png'
import { Link } from "react-router-dom";
const SubscribeButton = ({id ,h}) => {
  const [subscribed, setSubscribed] = useState(true);

  return (
      <Link to={"/profilecart"}>
    <div className="flex flex-row items-center gap-3">
    <button className="h-16 flex">
      {/* <img src={shopLogo} alt="ShopLogo"className={`${h} `} /> */}
    </button>
    <h3 className="font-bold">ONLINE SHOP</h3>
    <button
      className={`flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition hover:bg-gradient-to-r from-pink-500 to-yellow-500 box-border ${id}`}
      aria-label="Current setting is for all notifications. Tap to change your notification setting"
      onClick={() => setSubscribed(!subscribed)}
    >
      <Bell className="w-6 h-6" />
      <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
      {subscribed && <ChevronDown className="w-6 h-6" />}
    </button>
    </div>
    </Link> 
  );
};

export default SubscribeButton;


// import React, { useState, useContext, useEffect } from "react";
// import { Bell, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";
// import { ProfileContext } from "../context/ProfileContext";

// const SubscribeButton = ({ id, h }) => {
//   const [subscribed, setSubscribed] = useState(true);
//   const { profileImage, userName, fetchProfile } = useContext(ProfileContext);

//   // Fetch profile on mount to ensure the latest profileImage and userName are available
//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   // Use a default placeholder image if profileImage is not available
//   const profilePic = profileImage || "https://via.placeholder.com/40"; // Fallback to a placeholder image

//   return (
//     <Link to="/profilecart">
//       <div className="flex flex-row items-center gap-3">
//         <button className="h-16 flex">
//           <img src={profilePic} alt="Profile Logo" className={`${h}`} />
//         </button>
//         <h3 className="font-bold">{userName || "Guest"}</h3> {/* Display userName, fallback to "Guest" */}
//         <button
//           className={`flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition hover:bg-gradient-to-r from-pink-500 to-yellow-500 box-border ${id}`}
//           aria-label="Current setting is for all notifications. Tap to change your notification setting"
//           onClick={() => setSubscribed(!subscribed)}
//         >
//           <Bell className="w-6 h-6" />
//           <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
//           {subscribed && <ChevronDown className="w-6 h-6" />}
//         </button>
//       </div>
//     </Link>
//   );
// };

// export default SubscribeButton;