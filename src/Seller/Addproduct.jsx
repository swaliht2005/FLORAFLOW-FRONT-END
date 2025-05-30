import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Combonents/Navebar";
import ThumbnailUploader from "./ThumbnailUploader";
import plantsCareImg from "../assets/images/planscare.jpg";
import Footer2 from "../Combonents/Footer2";
import Sidebar from "../Combonents/Sidebar";
import { ArrowPathIcon, CheckCircleIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

function AddProduct() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { product, isEdit } = location.state || {};

  useEffect(() => {
    if (isEdit && product) {
      reset({
        PlantName: product.PlantName || "",
        PlantingDay: product.PlantingDay || "",
        PlantingHeight: product.PlantingHeight || "",
        price: product.price || "",
        PlantAbout: product.PlantAbout || "",
      });
      setImagePreview(`http://localhost:5000/api/seller/${product._id}/image`);
    }
  }, [isEdit, product, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("PlantName", data.PlantName);
    formData.append("PlantingDay", data.PlantingDay);
    formData.append("PlantingHeight", data.PlantingHeight);
    formData.append("price", data.price);
    formData.append("PlantAbout", data.PlantAbout);
    
    // Validate and append image file
    if (imageFile) {
      // Basic client-side validation for image file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
        setIsSubmitting(false);
        return;
      }
      formData.append("PlantImage", imageFile); // Match backend field name: 'PlantImage'
    } else if (!isEdit) {
      alert("Please select an image");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to add a product");
      }

      const url = isEdit
        ? `http://localhost:5000/api/seller/${product._id}`
        : "http://localhost:5000/api/seller/add";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
      }

      await response.json();
      alert(isEdit ? "Product updated successfully!" : "Product added successfully!");
      navigate("/myPlants");
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("Authentication required") || error.message.includes("Please log in")) {
        alert("Please log in to add or update a product");
        navigate("/login");
      } else {
        alert(`Failed to ${isEdit ? "update" : "add"} product: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Left Section: Plant Care Image (Desktop) */}
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

            {/* Form Section */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 flex flex-col gap-6"
              aria-label={isEdit ? "Update Product Form" : "Add Product Form"}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-green-800">
                {isEdit ? "Update Plant" : "Add New Plant"}
              </h2>

              {/* Thumbnail Uploader */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plant Image
                </label>
                <ThumbnailUploader
                  onImageSelect={(file) => {
                    setImageFile(file);
                    setImagePreview(file ? URL.createObjectURL(file) : isEdit ? `http://localhost:5000/api/seller/${product._id}/image` : null);
                  }}
                  initialImage={imagePreview}
                />
              </div>

              {/* Form Fields */}
              <div>
                <label htmlFor="PlantName" className="block text-sm font-medium text-gray-700">
                  Plant Name
                </label>
                <input
                  id="PlantName"
                  {...register("PlantName", { required: "Plant Name is required" })}
                  placeholder="Enter plant name"
                  className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  aria-invalid={errors.PlantName ? "true" : "false"}
                />
                {errors.PlantName && (
                  <span className="text-red-500 text-sm mt-1">{errors.PlantName.message}</span>
                )}
              </div>

              <div>
                <label htmlFor="PlantingDay" className="block text-sm font-medium text-gray-700">
                  Planting Day
                </label>
                <input
                  id="PlantingDay"
                  type="date"
                  {...register("PlantingDay", { required: "Planting Day is required" })}
                  className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  aria-invalid={errors.PlantingDay ? "true" : "false"}
                />
                {errors.PlantingDay && (
                  <span className="text-red-500 text-sm mt-1">{errors.PlantingDay.message}</span>
                )}
              </div>

              <div>
                <label htmlFor="PlantingHeight" className="block text-sm font-medium text-gray-700">
                  Plant Height
                </label>
                <input
                  id="PlantingHeight"
                  {...register("PlantingHeight", { required: "Plant Height is required" })}
                  placeholder="Enter plant height (e.g., 12 inches)"
                  className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  aria-invalid={errors.PlantingHeight ? "true" : "false"}
                />
                {errors.PlantingHeight && (
                  <span className="text-red-500 text-sm mt-1">{errors.PlantingHeight.message}</span>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  placeholder="Enter price (e.g., 10.99)"
                  className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  aria-invalid={errors.price ? "true" : "false"}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>
                )}
              </div>

              <div>
                <label htmlFor="PlantAbout" className="block text-sm font-medium text-gray-700">
                  About the Plant
                </label>
                <textarea
                  id="PlantAbout"
                  {...register("PlantAbout", { required: "Plant description is required" })}
                  placeholder="Describe the plant"
                  rows="4"
                  className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  aria-invalid={errors.PlantAbout ? "true" : "false"}
                />
                {errors.PlantAbout && (
                  <span className="text-red-500 text-sm mt-1">{errors.PlantAbout.message}</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  aria-label={isEdit ? "Update product" : "Add product"}
                >
                  {isSubmitting ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5" />
                      {isEdit ? "Update" : "Add Plant"}
                    </>
                  )}
                </button>
                <Link
                  to="/customers"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  aria-label="View customer comments"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  Comments
                </Link>
              </div>
            </form>

            {/* Mobile View: Plant Care Image */}
            <div className="lg:hidden w-full flex flex-col items-center bg-white rounded-lg shadow-xl p-4">
              <img
                src={plantsCareImg}
                alt="Plant Care"
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
              <h3 className="text-gray-800 font-semibold text-center mt-4 text-base sm:text-lg">
                Every plant you grow is a step towards a greener tomorrow. Add a plant today and watch life flourish!
              </h3>
            </div>
          </div>
        </main>
      </div>
      <Footer2 />
    </div>
  );
}

export default AddProduct;