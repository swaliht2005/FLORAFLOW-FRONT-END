import React, { useState } from "react";
import care from "../assets/images/care.jpg";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [yourGender, setYourGender] = useState("");
  const [image, setImage] = useState(null);

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col lg:flex-row md:flex-row max-w-5xl bg-white shadow-lg">
        {/* Left Container */}
        <div className="bg-gray-300 text-center py-10 px-6 flex flex-col items-center lg:w-1/2">
          <h1 className="text-lg font-bold text-white mb-6">Set Your Profile</h1>
          <div className="relative mt-8">
            {image ? (
              <img src={image} alt="Profile Thumbnail" className="w-full" />
            ) : (
              <img src={care} alt="Profile Icon" className="w-full" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={imageChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-gradient-to-r from-orange-400 to-red-400 px-4 py-2 rounded mt-6"
          >
            Upload Picture
          </label>
        </div>

        {/* Right Container */}
        <div className="bg-gray-600 p-8 flex-1  lg:w-[600px]">
          <form>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="about" className="text-white">
                About You
              </label>
              <textarea
                id="about"
                placeholder="Tell us about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="border border-gray-300 rounded p-2"
              ></textarea>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="number" className="text-white">
                Number
              </label>
              <input
                id="number"
                type="text"
                placeholder="Your Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="address" className="text-white">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
            </div>

            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="your-gender"
                  value="female"
                  checked={yourGender === "female"}
                  onChange={(e) => setYourGender(e.target.value)}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="your-gender"
                  value="male"
                  checked={yourGender === "male"}
                  onChange={(e) => setYourGender(e.target.value)}
                  className="mr-2"
                />
                Male
              </label>
            </div>

            <footer className="flex justify-between">
              <button
                type="button"
                className="bg-gradient-to-r from-green-300 to-lime-400 px-4 py-2 rounded text-gray-800 transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-300 to-lime-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
              >
                Save
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
