import { useLocation } from "react-router-dom";
import Navebar from "../Combonents/Navebar";
import { Link } from "react-router-dom";
import details from '../assets/images/details.jpg'
import { useState } from "react";
import Footer2 from "../Combonents/Footer2";

function Detailse() {
  const location = useLocation();
  const { cart } = location.state || {};
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100"
      style={{
        backgroundImage:`url(${details})`,
        backgroundSize:"cover",
        backgroundPosition: "center",
      }}>
      {/* Navbar */}
      <Navebar id="fixed z-20"/>
      
      {/* Product Card */}
      <div className="flex items-center justify-center mt-8 px-4 lg:mt-12 lg:py-14 overflow-hidden">
        {cart ? (
          <div className="w-full h-full lg:w-full max-w-4xl bg-white rounded-lg shadow-md p-3 lg:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mt-20 sm:mt-0">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <img
                src={cart.url}
                alt={cart.PlantName || "Plant Image"}
                className="rounded h-auto max-w-full lg:max-w-md object-cover shadow-sm sm:pb-0"
              />
              <Link to={'/shopemore'}>
                <button
                  type="button"
                  className="mt-4 text-white bg-gradient-to-br from-pin-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-auto"
                >
                  SHOP MORE
                </button>
              </Link>
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                {cart.PlantName || "Unknown Plant"}
              </h1>
              <p className="text-gray-600 mt-4">
                Planting Day: {cart.plantingDay || "N/A"}
              </p>
              <p className="text-gray-600 mt-2">Height: {cart.Height || "Unknown"}</p>
              {cart.price && (
                <p className="text-xl lg:text-2xl font-bold text-green-600 mt-4">
                  ₹{cart.price}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-6 mt-8">
                {/* Quantity Selector */}
                <div className="flex justify-center sm:justify-start items-center md:justify-center gap-4">
                  <button
                    onClick={decrement}
                    className="bg-green-500 hover:bg-white text-white hover:text-black hover:border-green-500 hover:border-2 font-semibold py-2 px-4 rounded transition duration-400 ease-in-out"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <label htmlFor="quantity" className="text-lg">
                    {count}
                  </label>
                  <button
                    onClick={increment}
                    className="bg-green-500 hover:bg-white text-white hover:text-black hover:border-green-500 hover:border-2 font-semibold py-2 px-4 rounded transition duration-400 ease-in-out"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Link to={'/addtocart'} key={cart.id} state={{ cart }}>
                    <button className="flex-1 bg-green-500 text-white py-2 rounded-full lg:w-32 md:w-48 w-full hover:bg-green-600 transition duration-300">
                      Add to Cart
                    </button>
                  </Link>
                  <Link to={'/buynow'} >
                  <button className="flex-1 bg-gradient-to-r from-pin-500 to-yellow-500 text-white py-2 rounded-full  md:w-48 w-full lg:w-28 hover:bg-green-600 transition duration-300">
                    Buy Now
                  </button>
                  </Link>
                  <Link
                    to="/chatapp"
                    className="flex-1 text-center bg-blue-500 text-white py-2 rounded-full lg:w-28 hover:bg-blue-600 transition duration-300"
                  >
                    Comment
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <p className="text-gray-600">No details available</p>
        )}
      </div>
      <Footer2/>
    </div>
  );
}

export default Detailse;
