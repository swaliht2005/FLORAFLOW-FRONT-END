import React from 'react'
import { Routes,Route } from 'react-router-dom'
import About from '../Admin/About'
import Addproduct from '/src/Seller/Addproduct.jsx'
import MyPlants from '../Seller/MyPlants'


function SellerRoutes() {
  return (
   <Routes>
     <Route path="/myPlants" element={<MyPlants/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path='/addproduct' element={<Addproduct />} />
    </Routes>
  )
}

export default SellerRoutes
