import React from "react";
import motivation from '../assets/images/motivation.png'; // assuming the image is located here
import hanan from '../assets/images/hanan.png'
import Core from '../assets/images/core.png'
import English from '../assets/images/english.png'
import Voice from '../assets/images/Voice.png'
function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Motives Media uploaded: Unlock Topper Secrets | #Study #Motivation Malayalam",
      time: "47 minutes ago",
      image: motivation, // Corrected to use the local image
    },
    {
      id: 2,
      title: "Hanan’s Family uploaded: ",
      time: "1 hour ago",
      image:hanan, // Replace with actual thumbnail URL
    },
    {
      id: 3,
      title: "For you: Core Insight",
      time: "1 hour ago",
      image:Core, 
    },
    {
      id: 4,
      title: "Everyday English with Sonia uploaded: SPEAK ENGLISH FLUENTLY & CONFIDENTLY |Daily-Use English Sentences |Spoken English Malayalam |Ln-227",
      time: "1 hour ago",
      image: English,
    },
    {
      id: 5,
      title: "Voice of Islam - Streaming to Truth uploaded: ",
      time: "1 hour ago",
      image: Voice, // Replace with actual thumbnail URL
    },
  ];

  return (
    <div className="mx-auto lg:w-[700px] lg:h-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Notifications</h1>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-cog"></i> {/* Replace with a settings icon */}
        </button>
      </div>

      {/* Notifications List */}
      <ul className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <li key={notification.id} className="p-4 flex space-x-4">
            {/* Thumbnail */}
            <img
              src={notification.image}
              alt="Thumbnail"
              className="w-16 h-16 rounded-md object-cover"
            />

            {/* Notification Details */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>

            {/* Menu Icon */}
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-ellipsis-v"></i> {/* Replace with a menu icon */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
