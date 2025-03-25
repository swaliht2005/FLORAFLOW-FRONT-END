import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navebar from "../Combonents/Navebar";
import Footer2 from "../Combonents/Footer2";
import { Link } from "react-router-dom";
const AddToCartPage = () => {
  const location = useLocation();

  // Retrieve cart object or fallback to empty array
  const { cart } = location.state || {};
  const [cartItems, setCartItems] = useState(cart ? [cart] : []);

  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const toggleFavorite = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navebar id="fixed z-20" />

      {/* Shopping Cart Section */}
      <div className="p-4 sm:p-6 bg-gray-50 mt-8 flex-1">
     
        <div className="bg-white shadow rounded-lg " >
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center mt-16 justify-between border-b last:border-none p-4 gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center flex-col sm:flex-row gap-4 w-full md:w-2/3">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-500 self-start md:self-center"
                  >
                    ✕
                  </button>
                  <img
                    src={item.image || item.url}
                    alt={item.name || item.PlantName}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="font-medium text-base sm:text-lg">{item.name || item.PlantName}</h3>
                    <p className="text-sm text-gray-500">{item.color || "N/A"}</p>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center justify-between gap-4 w-full md:w-1/3">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`text-lg ${
                      item.favorite ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    ♥
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrement}
                      className="bg-green-500 hover:bg-white text-white hover:text-black hover:border-green-500 hover:border-2 font-semibold py-1 px-3 rounded transition duration-400 ease-in-out"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-base">{count}</span>
                    <button
                      onClick={increment}
                      className="bg-green-500 hover:bg-white text-white hover:text-black hover:border-green-500 hover:border-2 font-semibold py-1 px-3 rounded transition duration-400 ease-in-out"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <Link to={'/buynow'} >
                  <button className="flex-1 bg-gradient-to-br from-fuchsia-500 to-rose-500  text-white py-2 lg:rounded-full  relative lg:left-12 rounded  lg:w-28 hover:bg-green-600 transition duration-300 ">
                  confirm order
                  </button>
                  </Link>
                  </div>
                  <p className="font-semibold text-sm sm:text-base">₹{item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center p-4">No items in your cart.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer2 />
    </div>
  );
};

export default AddToCartPage;
