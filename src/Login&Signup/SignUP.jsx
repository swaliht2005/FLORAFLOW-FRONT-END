import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loginsignupimg from "../assets/images/Loginsignupimg.png";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phonenumber: data.phone,
          password: data.password,
        }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        console.log("Registration successful:", responseData);
        navigate("/login");
    } else {
        console.log(responseData);
        console.error("Error:", responseData.message || "Something went wrong");
    }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center bg-gray-100">
      {/* Background Image */}
      <img
        src={Loginsignupimg}
        alt="Start Page"
        className="h-full w-full object-cover absolute top-0 left-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Form Container with Glassmorphism */}
      <div className="w-[90%] max-w-md sm:max-w-lg p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg relative z-10 border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-200 text-center">SIGN UP</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-200">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              {...register("firstName", { required: "First Name is required" })}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-200">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              {...register("lastName", { required: "Last Name is required" })}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="phone" className="block text-sm font-medium text-slate-200">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone Number is required",
                pattern: { value: /^\d{10}$/, message: "Phone Number must be 10 digits" },
              })}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.",
                },
              })}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* OTP */}
          <div className="mb-3">
            <label htmlFor="OTP" className="block text-sm font-medium text-slate-200">
              OTP
            </label>
            <input
              type="text"
              id="OTP"
              placeholder="Enter OTP"
              {...register("OTP", {
                required: "OTP is required",
                pattern: { value: /^\d{6}$/, message: "OTP must be a 6-digit number" },
              })}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.OTP && <p className="text-red-500 text-xs">{errors.OTP.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              // onClick={handleSendOTP}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none"
            >

              Send OTP
            </button>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              type="submit"
              
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <p className="mt-4 text-center text-sm text-slate-200">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;


