
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pukspuu from '../assets/images/Pukspuu.jpg'
import bonsai from '../assets/images/bonsai.png'
import Bananatree from '../assets/images/Bananatree.png'; 
import Faverate from '../assets/images/favorites.png'
import Calathea from '../assets/images/Calathea.jpg'
import Dracaena from '../assets/images/Dracaena.jpg'
import Navebar from '../Combonents/Navebar';
import Footer2 from '../Combonents/Footer2';
function Favorite() {
    const carts = [
       
        {
          id: 2, url: Pukspuu, PlantName: "Pukspuu", plantingDay: "12/17/24", Height: "10cm",price: "200.00",
        },
        {
          id: 2, url: bonsai, PlantName: "Bonsai", plantingDay: "12/18/24", Height: "10cm",price: "200.00",
        },
        {
          id: 2, url: Calathea, PlantName: "Calathea", plantingDay: "12/19/24", Height: "30cm",price: "200.00",
        },
        {
          id: 2, url: Dracaena, PlantName: "Dracaena", plantingDay: "12/20/24", Height: "40cm",price: "200.00",
        },
       
        
      ];
  return (
    <div className="bg-gray-100  overflow-hidden  ">
       
        <Navebar id="fixed z-20"/>
    <div className=" grid grid-cols-1  sm:grid-cols-2  rounded-[4px]  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 relative top-28 pb-40">
  {carts.map((cart) => (
    <Link to={`/details`} key={cart.id} state={{ cart }}>
      <div className="h-[400px] w-[250px] lg:h-[460px] ml-10  lg:w-[350px] bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between ">
        <button className='h-6 w-6'>
          <Link to={'/favorite'}>
            <img src={Faverate} alt="Favorite" />
          </Link>
        </button>

        <div className="flex items-center flex-col  h-[250px] lg:h-[300px]">
          <img
            src={cart.url}
            alt={cart.PlantName}
            className="h-full w-full object-cover rounded mb-4"
          />
        </div>
        <h2 className="text-lg font-semibold mt-4 text-center">{cart.PlantName}</h2>
        <div className="relative left-[10px] bottom-[5px]">
          <h2 className="text-gray-600">Planting Day: {cart.plantingDay}</h2>
          <h2 className="text-gray-600">Height: {cart.Height}</h2>
          <h1><b className='text-green-600'>₹ {cart.price} </b></h1>
        </div>
      </div>
    </Link>
  ))}
</div>
<Footer2/>
</div>
  )
}

export default Favorite
