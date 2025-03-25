
import React from 'react'
import EditProfile from './EditProfile'
import  profaile  from '../assets/images/profail.jpg'
import Navebar from '../Combonents/Navebar'
import Footer2 from '../Combonents/Footer2'
function Profile() {
  return (
    <div
    className="h-screen w-screen"
    
  >
    <div className="w-full fixed z-20">
        <Navebar/>
      </div>

      <EditProfile/>
      <div className="w-full mt-auto">
        <Footer2/>
      </div>
    </div>
  )
}

export default Profile
