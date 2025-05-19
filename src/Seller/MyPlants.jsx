import React from 'react'
import Navebar from '../Combonents/Navebar'
import Footer2 from '../Combonents/Footer2'
import Sidebar from '../Combonents/Sidebar'
import Cards from '../Costomer/Cards'

function MyPlants() {
  return (
    <div>
      <Navebar/>

    
       <div className="flex flex-col md:flex-row">
          <Sidebar/>
            <div className="w-full h-full ">

            
                <Cards/>

            </div>
     </div>

      <Footer2/>
    </div>
  )
}

export default MyPlants
