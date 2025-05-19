

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Combonents/Navebar";
import ThumbnailUploader from "./ThumbnailUploader";
import plantsCareImg from "../assets/images/planscare.jpg";
import Footer2 from "../Combonents/Footer2";
import Sidebar from "../Combonents/Sidebar";

function AddProduct() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { product, isEdit } = location.state || {};

  useEffect(() => {
    if (isEdit && product) {
      // Pre-fill form with product data
      reset({
        PlantName: product.PlantName || "",
        PlantingDay: product.PlantingDay || "",
        PlantingHeight: product.PlantingHeight || "",
        price: product.price || "",
        PlantAbout: product.PlantAbout || "",
      });
      // Set image preview
      setImagePreview(`http://localhost:5000/api/seller/${product._id}/image`);
    }
  }, [isEdit, product, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("PlantName", data.PlantName);
    formData.append("PlantingDay", data.PlantingDay);
    formData.append("PlantingHeight", data.PlantingHeight);
    formData.append("price", data.price);
    formData.append("PlantAbout", data.PlantAbout);
    if (imageFile) {
      formData.append("PlantImage", imageFile);
    } else if (!isEdit) {
      console.error("No image file selected");
      alert("Please select an image");
      return;
    }

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const url = isEdit
        ? `http://localhost:5000/api/seller/${product._id}`
        : "http://localhost:5000/api/seller/add";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });
      const text = await response.text();
      console.log(`Response status: ${response.status}, Text: ${text}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${text}`);
      }
      const result = JSON.parse(text);
      console.log("Parsed Response:", result);

      alert(isEdit ? "Product updated successfully!" : "Product added successfully!");
      navigate("/homePage"); // Redirect to Cards page
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to ${isEdit ? "update" : "add"} product: ${error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex flex-col md:flex-row">
       
      
       <Sidebar/>
       
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 w-full px-4 sm:px-6 lg:px-20 py-16 lg:py-28">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col items-center w-[500px] h-[680px] bg-white rounded-md shadow-2xl p-4">
          <img
            src={plantsCareImg}
            alt="Plant Care"
            className="w-full h-80 lg:h-[600px] object-cover rounded-lg"
          />
          <h3 className="text-gray-800 font-semibold text-center mt-4">
            Every plant you grow is a step towards a greener tomorrow. Add a plant today and watch life flourish!
          </h3>
        </div>

        {/* Right Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-2/5 bg-white rounded-lg p-6 sm:p-8 shadow-lg flex flex-col gap-6"
        >
          {/* Thumbnail Uploader */}
          <ThumbnailUploader
            onImageSelect={(file) => {
              setImageFile(file);
              setImagePreview(file ? URL.createObjectURL(file) : isEdit ? `http://localhost:5000/api/seller/${product._id}/image` : null);
            }}
            initialImage={imagePreview}
          />

          {/* Form Fields */}
          <input
            {...register("PlantName", { required: "Plant Name is required" })}
            placeholder="Plant Name"
            className="w-full p-2 rounded-lg border border-gray-300"
          />
          {errors.PlantName && <span className="text-red-500 text-sm">{errors.PlantName.message}</span>}

          <input
            {...register("PlantingDay", { required: "Planting Day is required" })}
            placeholder="Planting Day (e.g., 2023-10-10)"
            className="w-full p-2 rounded-lg border border-gray-300"
          />
          {errors.PlantingDay && <span className="text-red-500 text-sm">{errors.PlantingDay.message}</span>}

          <input
            {...register("PlantingHeight", { required: "Plant Height is required" })}
            placeholder="Plant Height"
            className="w-full p-2 rounded-lg border border-gray-300"
          />
          {errors.PlantingHeight && <span className="text-red-500 text-sm">{errors.PlantingHeight.message}</span>}

          <input
            {...register("price", { 
              required: "Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Price must be a valid number (e.g., 10.99)"
              }
            })}
            placeholder="Price ₹ 00.00"
            className="w-full p-2 rounded-lg border border-gray-300"
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}

          <textarea
            {...register("PlantAbout", { required: "Plant description is required" })}
            placeholder="About the plant"
            rows="4"
            className="w-full p-4 rounded-lg border border-gray-300"
          />
          {errors.PlantAbout && <span className="text-red-500 text-sm">{errors.PlantAbout.message}</span>}

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:opacity-90"
            >
              {isEdit ? "Update" : "Save"}
            </button>
           
            <Link
              to="/chatapp"
              className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:opacity-90"
            >
              Comments
            </Link>
          </div>
        </form>

        {/* Mobile View: Plant Care Image */}
        <div className="w-full lg:hidden flex flex-col items-center bg-white rounded-md shadow-2xl p-4">
          <img
            src={plantsCareImg}
            alt="Plant Care"
            className="w-full h-80 object-cover rounded-lg"
          />
          <h3 className="text-gray-800 font-semibold text-center mt-4">
            Every plant you grow is a step towards a greener tomorrow. Add a plant today and watch life flourish!
          </h3>
        </div>
      </div>
  </div>
      <Footer2 />
    </div>
  );
}

export default AddProduct;