
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pukspuu from '../assets/images/Pukspuu.jpg'
import bonsai from '../assets/images/bonsai.png'
import Bananatree from '../assets/images/Bananatree.png'; 
import Faverate from '../assets/images/favorites.png'
import Calathea from '../assets/images/Calathea.jpg'
import Dracaena from '../assets/images/Dracaena.jpg'
import RubberPlant from '../assets/images/Rubber Plan.jpg'
import SnakePlant from '../assets/images/Snake Plant.jpg'
import ZanzibarGem from '../assets/images/Zanzibar Gem.jpg'
import Alocasia from '../assets/images/Alocasia.jpg'
import FiddleLeafFig from '../assets/images/Fiddle Leaf Fig.jpg'
import Bromeliads from '../assets/images/Bromeliads.jpg'
import MonsteraDeliciosa from '../assets/images/Monstera Deliciosa.jpg'
import BirdofParadise from '../assets/images/BirdofParadise.png'
import greenmoneyplant from '../assets/images/green-money-plant.jpg'
import aglaonemaparrotjungle from '../assets/images/aglaonema-parrot-jungle-indoor.jpg'
import DracaenaReflexa from '../assets/images/Dracaena Reflexa.jpg'
import philodendroncongo from '../assets/images/philodendroncongo.jpg'
import WaterLettuce  from '../assets/images/WaterLettuce.png'
import Epipremnumaureum from '../assets/images/Epipremnum aureum.png'
import Crassulaovata from '../assets/images/Crassula ovata.png'
// import productcarts from '../assets/images/productcarts.jpg'
// import productcarts from '../assets/images/WhatsApp Image 2025-01-15 at 12.09.01_08f1387a.jpg'
import Navebar from '../Combonents/Navebar';
import Footer2 from '../Combonents/Footer2';
import Button from '../Combonents/Button';
function Cards() {
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
        {
          id: 2, url: RubberPlant, PlantName: "Rubber Plant", plantingDay: "12/21/24", Height: "40cm",price: "200.00",
        },
        {
          id: 2, url: SnakePlant, PlantName: "Snake Plant", plantingDay: "12/22/24", Height: "60cm",price: "200.00",
        },
        {
          id: 1, url: Bananatree, PlantName: "Banana Plant", plantingDay: "12/16/24", Height: "10inch",price: "200.00",
        },
        {
          id: 2, url: ZanzibarGem, PlantName: "Zanzibar Gem", plantingDay: "12/23/24", Height: "50cm",price: "200.00",
        },
        {
          id: 2, url: Alocasia, PlantName: "Alocasia", plantingDay: "12/24/24", Height: "50cm",price: "200.00",
        },
        {
          id: 2, url: FiddleLeafFig, PlantName: "Fiddle Leaf Fig", plantingDay: "12/25/24", Height: "30cm",price: "200.00",
        },
        {
          id: 2, url: Bromeliads, PlantName: "Bromeliads", plantingDay: "12/26/24", Height: "10cm",price: "200.00",
        },
        {
          id: 2, url: MonsteraDeliciosa, PlantName: "Monstera Deliciosa", plantingDay: "12/27/24", Height: "70cm",price: "200.00",
        },
        {
          id: 2, url: BirdofParadise, PlantName: "BirdofParadise", plantingDay: "12/28/24", Height: "70cm",price: "200.00",
        },
        {
          id: 2, url: greenmoneyplant, PlantName: "green money plant", plantingDay: "12/29/24", Height: "10inch",price: "360.00",
        },
        {
          id: 2, url:aglaonemaparrotjungle, PlantName: "Aglaonema Parrot Jungle", plantingDay: "12/30/24", Height: "10inch",price: "385.00",
        },
        {
          id: 2, url: DracaenaReflexa, PlantName: "Dracaena Reflexa", plantingDay: "12/16/24", Height: "10inch",price: "360.00",
        },
    
        {
          id: 2, url: philodendroncongo, PlantName: "Philodendron Congo", plantingDay: "12/16/24", Height: "10inch",price: "560.00",
        },
        {
          id: 2, url: WaterLettuce, PlantName: "Water Lettuce", plantingDay: "12/16/24", Height: "10inch",price: "25.00",
        },
    
        {
          id: 2, url: Epipremnumaureum, PlantName: "Epipremnum Aureum", plantingDay: "12/16/24", Height: "10inch",price: "69.00",
        },
        {
          id: 2, url: Crassulaovata, PlantName: "Crassula Ovata", plantingDay: "12/16/24", Height: "10inch",price: "89.00",
        },
        {
          id: 2, url: FiddleLeafFig, PlantName: "Fiddle Leaf Fig", plantingDay: "12/25/24", Height: "30cm",price: "200.00",
        },
        {
          id: 2, url: Bromeliads, PlantName: "Bromeliads", plantingDay: "12/26/24", Height: "10cm",price: "200.00",
        },
        {
          id: 2, url: MonsteraDeliciosa, PlantName: "Monstera Deliciosa", plantingDay: "12/27/24", Height: "70cm",price: "200.00",
        },
        {
          id: 2, url: BirdofParadise, PlantName: "BirdofParadise", plantingDay: "12/28/24", Height: "70cm",price: "200.00",
        },
        
      ];
      // const [favorite, setFavorite] = useState(false);

      // const Changecolor = () => {
      //   setFavorite(!favorite); // Toggle the favorite state
      // };

  return (
    <div className="bg-gray-100  overflow-hidden  ">
       
      
    <div className=" grid grid-cols-1  sm:grid-cols-2  rounded-[4px]  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 relative top-28 pb-40">
  {carts.map((cart) => (
    <Link to={''} key={cart.id} state={{ cart }}>
      <div className="h-[500px] w-[250px] lg:h-[500px] ml-10  lg:w-[350px] bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between ">
        <button className='h-6 w-6'>
          <Link to={'/favorite'}>
            <img src={Faverate} alt="Favorite" />
          </Link>
            {/* <button
      onClick={Changecolor}
      className={`text-5xl relative bottom-5 ${favorite ? "text-red-500" : "text-gray-400"}`}
    >
      ♥
                  </button> */}
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
          <Link to={`/details`} key={cart.id} state={{ cart }}>
          <button className="shop-item-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Add to Cart</button>
        </Link>
        </div>
      </div>
    </Link>
  ))}
</div>


</div>
  )
}

export default Cards
