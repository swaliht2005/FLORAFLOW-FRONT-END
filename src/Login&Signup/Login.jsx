
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loginsignupimg from "../assets/images/Loginsignupimg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Login successful:", data);
        navigate("/homePage"); 
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <img
        src={Loginsignupimg}
        alt="Start Page"
        className="h-full w-full object-cover absolute top-0 left-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login Form */}
      <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm lg:max-w-md px-6 py-8 border rounded-lg shadow-lg bg-white relative z-10 bg-opacity-10 backdrop-blur-md border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center text-slate-200">
          LOGIN
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="w-full">
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 text-sm sm:text-base rounded-md shadow hover:bg-green-700 focus:ring-2 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-xs sm:text-sm text-slate-200">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

