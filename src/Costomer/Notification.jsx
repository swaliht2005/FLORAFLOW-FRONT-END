import React from 'react'
import Navebar from '../Combonents/Navebar'
import Notifications from './Notifications'
import Footer2 from '../Combonents/Footer2'
function Notification() {
  return (
    <div className="h-screen w-screen  ">
        <div className="h-[100px] w-full ">
        <Navebar id="fixed z-20" />
        </div>
        <div className=" flex items-center justify-center">
            
               <Notifications/>
           
        </div>
        <Footer2/>
  </div>
  )
}

export default Notification
