// // import React, { useState, useEffect } from "react";
// // import care from "../assets/images/care.jpg";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const EditProfile = () => {
// //   const navigate = useNavigate();

// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [bio, setBio] = useState("");
// //   const [phonenumber, setPhonenumber] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [image, setImage] = useState(null);
// //   const [file, setFile] = useState(null);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [isEditing, setIsEditing] = useState(false);

// //   useEffect(() => {
// //     const userDataString = localStorage.getItem("user");
// //     if (!userDataString) {
// //       setImage(care);
// //       return;
// //     }

// //     let userData = null;
// //     try {
// //       userData = JSON.parse(userDataString);
// //     } catch (err) {
// //       console.error("Error parsing user data from localStorage:", err);
// //       setImage(care);
// //       return;
// //     }

// //     if (userData) {
// //       setFirstName(userData.firstName || "");
// //       setLastName(userData.lastName || "");
// //       setBio(userData.bio || "");
// //       setPhonenumber(userData.phonenumber || "");
// //       setEmail(userData.email || "");
// //       setAddress(userData.address || "");
// //       setGender(userData.gender || "");
// //       setImage(
// //         userData.profileImage
// //           ? `http://localhost:5000/api/uploads/${userData.profileImage}`
// //           : care
// //       );
// //     } else {
// //       setImage(care);
// //     }
// //   }, []);

// //   const imageChange = (e) => {
// //     const selectedFile = e.target.files[0];
// //     if (selectedFile) {
// //       setFile(selectedFile);
// //       setImage(URL.createObjectURL(selectedFile));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");

// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       setError("Please log in to update your profile");
// //       navigate("/login");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("firstName", firstName);
// //     formData.append("lastName", lastName);
// //     formData.append("bio", bio);
// //     formData.append("phonenumber", phonenumber);
// //     formData.append("email", email);
// //     formData.append("address", address);
// //     formData.append("gender", gender);
// //     if (file) {
// //       formData.append("profileImage", file);
// //     }

// //     try {
// //       console.log("Saving profile with token:", token);
// //       console.log("FormData contents:", [...formData.entries()]);
// //       const response = await axios.put("http://localhost:5000/api/profile/update", formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });

// //       console.log("Profile save response:", response.data);
// //       setSuccess(response.data.message);
// //       const updatedUser = response.data.user;

// //       localStorage.setItem("user", JSON.stringify(updatedUser));
// //       console.log("Updated localStorage user:", updatedUser);

// //       window.dispatchEvent(new CustomEvent("userUpdated"));

// //       setTimeout(() => {
// //         navigate("/profile");
// //       }, 1000);
// //     } catch (err) {
// //       console.error("Error saving profile:", {
// //         message: err.message,
// //         response: err.response?.data,
// //         status: err.response?.status,
// //       });
// //       setError(err.response?.data?.message || "Failed to update profile");
// //     }
// //   };

// //   const toggleEditMode = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-white">
// //       <div className="flex flex-col lg:flex-row md:flex-row max-w-5xl bg-white shadow-lg">
// //         <div className="bg-gray-300 text-center py-10 px-6 flex flex-col items-center lg:w-1/2">
// //           <h1 className="text-lg font-bold text-white mb-6">Set Your Profile</h1>
// //           <div className="relative mt-8">
// //             {image ? (
// //               <img src={image} alt="Profile Thumbnail" className="w-full" />
// //             ) : (
// //               <img src={care} alt="Profile Icon" className="w-full" />
// //             )}
// //           </div>
// //           {isEditing && (
// //             <>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={imageChange}
// //                 className="hidden"
// //                 id="fileInput"
// //               />
// //               <label
// //                 htmlFor="fileInput"
// //                 className="cursor-pointer bg-gradient-to-r from-orange-400 to-red-400 px-4 py-2 rounded mt-6"
// //               >
// //                 Upload Picture
// //               </label>
// //             </>
// //           )}
// //         </div>
// //         <div className="bg-gray-600 p-8 flex-1 lg:w-[600px]">
// //           {error && <p className="text-red-400 mb-4">{error}</p>}
// //           {success && <p className="text-green-400 mb-4">{success}</p>}
// //           {!isEditing ? (
// //             <div>
// //               <h2 className="text-white text-xl mb-4">Profile Details</h2>
// //               <p className="text-white mb-2"><strong>First Name:</strong> {firstName || "Not set"}</p>
// //               <p className="text-white mb-2"><strong>Last Name:</strong> {lastName || "Not set"}</p>
// //               <p className="text-white mb-2"><strong>About:</strong> {bio || "Not set"}</p>
// //               <p className="text-white mb-2"><strong>Number:</strong> {phonenumber || "Not set"}</p>
// //               <p className="text-white mb-2"><strong>Email:</strong> {email || "Not set"}</p>
// //               <p className="text-white mb-2"><strong>Address:</strong> {address || "Not set"}</p>
// //               <p className="text-white mb-4"><strong>Gender:</strong> {gender || "Not set"}</p>
// //               <button
// //                 onClick={toggleEditMode}
// //                 className="bg-gradient-to-r from-green-300 to-lime-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
// //               >
// //                 Edit Profile
// //               </button>
// //             </div>
// //           ) : (
// //             <form onSubmit={handleSubmit}>
// //               <div className="flex flex-col mb-4">
// //                 <label htmlFor="firstName" className="text-white">First Name</label>
// //                 <input
// //                   id="firstName"
// //                   type="text"
// //                   placeholder="Your first name"
// //                   value={firstName}
// //                   onChange={(e) => setFirstName(e.target.value)}
// //                   className="border border-gray-300 rounded p-2"
// //                 />
// //               </div>
// //               <div className="flex flex-col mb-4">
// //                 <label htmlFor="lastName" className="text-white">Last Name</label>
// //                 <input
// //                   id="lastName"
// //                   type="text"
// //                   placeholder="Your last name"
// //                   value={lastName}
// //                   onChange={(e) => setLastName(e.target.value)}
// //                   className="border border-gray-300 rounded p-2"
// //                 />
// //               </div>
// //               <div className="flex flex-col mb-4">
// //                 <label htmlFor="bio" className="text-white">About You</label>
// //                 <textarea
// //                   id="bio"
// //                   placeholder="Tell us about yourself"
// //                   value={bio}
// //                   onChange={(e) => setBio(e.target.value)}
// //                   className="border border-gray-300 rounded p-2"
// //                 ></textarea>
// //               </div>
// //               <div className="flex flex-col mb-4">
// //                 <label htmlFor="phonenumber" className="text-white">Number</label>
// //                 <input
// //                   id="phonenumber"
// //                   type="tel"
// //                   placeholder="Your Number"
// //                   value={phonenumber}
// //                   onChange={(e) => setPhonenumber(e.target.value)}
// //                   className="border border-gray-300 rounded p-2"
// //                 />
// //               </div>
// //               <div className="flex flex-col mb-4">
// //                 <label htmlFor="email" className="text-white">Email</label>
// //                 <input
// //                   id="email"
// //                   type="email"
// //                   placeholder="Your Email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="border border-gray-300 rounded p-2"
// //                 />
// //               </div>
// //               <div className="flex flex-col mb-4">
// //                 <label htmlFor="address" className="text-white">Address</label>
// //                 <input
// //                   id="address"
// //                   type="text"
// //                   placeholder="Your Address"
// //                   value={address}
// //                   onChange={(e) => setAddress(e.target.value)}
// //                   className="border border-gray-300 rounded p-2"
// //                 />
// //               </div>
// //               <div className="flex gap-4 mb-4">
// //                 <label className="flex items-center text-white">
// //                   <input
// //                     type="radio"
// //                     name="gender"
// //                     value="female"
// //                     checked={gender === "female"}
// //                     onChange={(e) => setGender(e.target.value)}
// //                     className="mr-2"
// //                   />
// //                   Female
// //                 </label>
// //                 <label className="flex items-center text-white">
// //                   <input
// //                     type="radio"
// //                     name="gender"
// //                     value="male"
// //                     checked={gender === "male"} // Fixed the checked attribute
// //                     onChange={(e) => setGender(e.target.value)}
// //                     className="mr-2"
// //                   />
// //                   Male
// //                 </label>
// //               </div>
// //               <footer className="flex justify-between">
// //                 <button
// //                   type="button"
// //                   onClick={toggleEditMode}
// //                   className="bg-gradient-to-r from-green-300 to-lime-400 px-4 py-2 rounded text-gray-800 transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="bg-gradient-to-r from-green-300 to-lime-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
// //                 >
// //                   Save
// //                 </button>
// //               </footer>
// //             </form>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditProfile;


// import React, { useState, useEffect } from "react";
// import care from "../assets/images/care.jpg";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EditProfile = () => {
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [bio, setBio] = useState("");
//   const [phonenumber, setPhonenumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [gender, setGender] = useState("");
//   const [image, setImage] = useState(null);
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const userDataString = localStorage.getItem("user");
//     if (!userDataString) {
//       setImage(care);
//       return;
//     }

//     let userData = null;
//     try {
//       userData = JSON.parse(userDataString);
//     } catch (err) {
//       console.error("Error parsing user data from localStorage:", err);
//       setImage(care);
//       return;
//     }

//     if (userData) {
//       setFirstName(userData.firstName || "");
//       setLastName(userData.lastName || "");
//       setBio(userData.bio || "");
//       setPhonenumber(userData.phonenumber || "");
//       setEmail(userData.email || "");
//       setAddress(userData.address || "");
//       setGender(userData.gender || "");
//       setImage(
//         userData.profileImage
//           ? `${API_URL}/api/uploads/${userData.profileImage}`
//           : care
//       );
//     } else {
//       setImage(care);
//     }
//   }, [API_URL]);

//   const imageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setImage(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Please log in to update your profile");
//       navigate("/login");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("firstName", firstName);
//     formData.append("lastName", lastName);
//     formData.append("bio", bio);
//     formData.append("phonenumber", phonenumber);
//     formData.append("email", email);
//     formData.append("address", address);
//     formData.append("gender", gender);
//     if (file) {
//       formData.append("profileImage", file);
//     }

//     console.log("Sending request to:", `${API_URL}/api/user/profile/update`);
//     console.log("FormData entries:", [...formData.entries()]);
//     console.log("Headers:", {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     });

//     try {
//       const response = await axios.put(
//         `${API_URL}/api/user/profile/update`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Profile save response:", response.data);
//       setSuccess(response.data.message);
//       const updatedUser = response.data.user;
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       window.dispatchEvent(new CustomEvent("userUpdated"));
//       setTimeout(() => {
//         navigate("/profile");
//       }, 1000);
//     } catch (err) {
//       console.error("Error saving profile:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });
//       setError(err.response?.data?.message || "Failed to update profile");
//     }
//   };

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="flex flex-col lg:flex-row md:flex-row max-w-5xl bg-white shadow-lg">
//         <div className="bg-gray-300 text-center py-10 px-6 flex flex-col items-center lg:w-1/2">
//           <h1 className="text-lg font-bold text-white mb-6">Set Your Profile</h1>
//           <div className="relative mt-8">
//             {image ? (
//               <img src={image} alt="Profile Thumbnail" className="w-full" />
//             ) : (
//               <img src={care} alt="Profile Icon" className="w-full" />
//             )}
//           </div>
//           {isEditing && (
//             <>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={imageChange}
//                 className="hidden"
//                 id="fileInput"
//               />
//               <label
//                 htmlFor="fileInput"
//                 className="cursor-pointer bg-gradient-to-r from-orange-400 to-red-400 px-4 py-2 rounded mt-6"
//               >
//                 Upload Picture
//               </label>
//             </>
//           )}
//         </div>
//         <div className="bg-gray-600 p-8 flex-1 lg:w-[600px]">
//           {error && <p className="text-red-400 mb-4">{error}</p>}
//           {success && <p className="text-green-400 mb-4">{success}</p>}
//           {!isEditing ? (
//             <div>
//               <h2 className="text-white text-xl mb-4">Profile Details</h2>
//               <p className="text-white mb-2"><strong>First Name:</strong> {firstName || "Not set"}</p>
//               <p className="text-white mb-2"><strong>Last Name:</strong> {lastName || "Not set"}</p>
//               <p className="text-white mb-2"><strong>About:</strong> {bio || "Not set"}</p>
//               <p className="text-white mb-2"><strong>Number:</strong> {phonenumber || "Not set"}</p>
//               <p className="text-white mb-2"><strong>Email:</strong> {email || "Not set"}</p>
//               <p className="text-white mb-2"><strong>Address:</strong> {address || "Not set"}</p>
//               <p className="text-white mb-4"><strong>Gender:</strong> {gender || "Not set"}</p>
//               <button
//                 onClick={toggleEditMode}
//                 className="bg-gradient-to-r from-green-300 to-lime-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="firstName" className="text-white">First Name</label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   placeholder="Your first name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="border border-gray-300 rounded p-2"
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="lastName" className="text-white">Last Name</label>
//                 <input
//                   id="lastName"
//                   type="text"
//                   placeholder="Your last name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="border border-gray-300 rounded p-2"
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="bio" className="text-white">About You</label>
//                 <textarea
//                   id="bio"
//                   placeholder="Tell us about yourself"
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   className="border border-gray-300 rounded p-2"
//                 ></textarea>
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="phonenumber" className="text-white">Number</label>
//                 <input
//                   id="phonenumber"
//                   type="tel"
//                   placeholder="Your Number"
//                   value={phonenumber}
//                   onChange={(e) => setPhonenumber(e.target.value)}
//                   className="border border-gray-300 rounded p-2"
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="email" className="text-white">Email</label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Your Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="border border-gray-300 rounded p-2"
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="address" className="text-white">Address</label>
//                 <input
//                   id="address"
//                   type="text"
//                   placeholder="Your Address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="border border-gray-300 rounded p-2"
//                 />
//               </div>
//               <div className="flex gap-4 mb-4">
//                 <label className="flex items-center text-white">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="female"
//                     checked={gender === "female"}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="mr-2"
//                   />
//                   Female
//                 </label>
//                 <label className="flex items-center text-white">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="male"
//                     checked={gender === "male"}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="mr-2"
//                   />
//                   Male
//                 </label>
//               </div>
//               <footer className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={toggleEditMode}
//                   className="bg-gradient-to-r from-green-300 to-lime-400 px-4 py-2 rounded text-gray-800 transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-gradient-to-r from-green-300 to-lime-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
//                 >
//                   Save
//                 </button>
//               </footer>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

// src/components/EditProfile.js
import React, { useState, useEffect } from "react";
import care from "../assets/images/care.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
            setImage(care);
            return;
        }

        let userData;
        try {
            userData = JSON.parse(userDataString);
        } catch (err) {
            console.error("Error parsing user data from localStorage:", err);
            setImage(care);
            return;
        }

        if (userData) {
            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setBio(userData.bio || "");
            setPhonenumber(userData.phonenumber || "");
            setEmail(userData.email || "");
            setAddress(userData.address || "");
            setGender(userData.gender || "");
            setImage(
                userData.profileImage
                    ? `${API_URL}/api/uploads/${userData.profileImage}`
                    : care
            );
        } else {
            setImage(care);
        }
    }, [API_URL]);

    const imageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in to update your profile");
            navigate("/login");
            return;
        }

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("bio", bio);
        formData.append("phonenumber", phonenumber);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("gender", gender);
        if (file) {
            formData.append("profileImage", file);
        }

        try {
            console.log("Sending request to:", `${API_URL}/api/profile/update`);
            console.log("FormData entries:", [...formData.entries()]);
            const response = await axios.put(
                `${API_URL}/api/profile/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Profile save response:", response.data);
            setSuccess(response.data.message);
            const updatedUser = response.data.user;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.dispatchEvent(new CustomEvent("userUpdated"));

            setTimeout(() => {
                navigate("/profile");
            }, 1000);
        } catch (err) {
            console.error("Error saving profile:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
            setError(err.response?.data?.message || "Failed to update profile");
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col lg:flex-row md:flex-row max-w-5xl bg-white shadow-lg">
                <div className="bg-gray-300 text-center py-10 px-6 flex flex-col items-center lg:w-1/2">
                    <h1 className="text-lg font-bold text-white mb-6">Set Your Profile</h1>
                    <div className="relative mt-8">
                        {image ? (
                            <img src={image} alt="Profile Thumbnail" className="w-full" />
                        ) : (
                            <img src={care} alt="Profile Icon" className="w-full" />
                        )}
                    </div>
                    {isEditing && (
                        <>
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
                        </>
                    )}
                </div>
                <div className="bg-gray-600 p-8 flex-1 lg:w-[600px]">
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    {success && <p className="text-green-400 mb-4">{success}</p>}
                    {!isEditing ? (
                        <div>
                            <h2 className="text-white text-xl mb-4">Profile Details</h2>
                            <p className="text-white mb-2"><strong>First Name:</strong> {firstName || "Not set"}</p>
                            <p className="text-white mb-2"><strong>Last Name:</strong> {lastName || "Not set"}</p>
                            <p className="text-white mb-2"><strong>About:</strong> {bio || "Not set"}</p>
                            <p className="text-white mb-2"><strong>Number:</strong> {phonenumber || "Not set"}</p>
                            <p className="text-white mb-2"><strong>Email:</strong> {email || "Not set"}</p>
                            <p className="text-white mb-2"><strong>Address:</strong> {address || "Not set"}</p>
                            <p className="text-white mb-4"><strong>Gender:</strong> {gender || "Not set"}</p>
                            <button
                                onClick={toggleEditMode}
                                className="bg-gradient-to-r from-green-300 to-lime-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="firstName" className="text-white">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="lastName" className="text-white">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="bio" className="text-white">About You</label>
                                <textarea
                                    id="bio"
                                    placeholder="Tell us about yourself"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                ></textarea>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="phonenumber" className="text-white">Number</label>
                                <input
                                    id="phonenumber"
                                    type="tel"
                                    placeholder="Your Number"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="email" className="text-white">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border border-gray-300 rounded p-2"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="address" className="text-white">Address</label>
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
                                <label className="flex items-center text-white">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="mr-2"
                                    />
                                    Female
                                </label>
                                <label className="flex items-center text-white">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="mr-2"
                                    />
                                    Male
                                </label>
                            </div>
                            <footer className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={toggleEditMode}
                                    className="bg-gradient-to-r from-green-300 to-lime-400 px-4 py-2 rounded text-gray-800 transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-300 to-lime-400 text-white px-4 py-2 rounded transition-colors duration-300 hover:from-orange-400 hover:to-red-400"
                                >
                                    Save
                                </button>
                            </footer>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;