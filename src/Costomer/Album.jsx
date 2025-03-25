import React from 'react';
import { Link } from 'react-router-dom';
import WeekendOffer from '../Combonents/WeekendOffer';
function Album() {
  return (
    <div className="bg-gray-900 text-white min-h-screen  bottom-72 flex items-center justify-center">
      <section className="max-w-6xl w-full mx-auto">
      <div className="relative lg:bottom-20"><WeekendOffer /></div>
        <div className="flex flex-wrap -mx-4">
          {/* Card 1 */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            <div className="relative group h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=600&q=80')" }}>
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-6 transform group-hover:rotate-y-180 group-hover:bg-opacity-100 transition-all duration-500">
                <h1 className="text-3xl font-bold translate-z-0">Little<br />Bonsai</h1>
                <span className="text-2xl">$79</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-center opacity-0 group-hover:opacity-75 group-hover:rotate-y-180 transition-all duration-500">
                
                <Link to={'/details'} 
                state={{
                  cart: {
                    url: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=600&q=80',
                    PlantName: 'Little Bonsai',
                    plantingDay: '12/16/24',
                    Height: '10cm',
                  },
                }}><a href="#" className="mb-2 bg-white text-black py-2 px-6 rounded hover:bg-gray-900 hover:text-white transition">View detail</a></Link>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            <div className="relative group h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80')" }}>
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-6 transform group-hover:rotate-y-180 group-hover:bg-opacity-100 transition-all duration-500">
                <h1 className="text-3xl font-bold translate-z-0">Tropical<br />Leaf</h1>
                <span className="text-2xl">$35</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-center opacity-0 group-hover:opacity-75 group-hover:rotate-y-180 transition-all duration-500">
                <Link to={'/details'}
                 state={{
                  cart: {
                    url: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
                    PlantName: 'Little Bonsai',
                    plantingDay: '12/16/24',
                    Height: '10cm',
                  },
                }}
                ><a href="#" className="mb-2 bg-white text-black py-2 px-6 rounded hover:bg-gray-900 hover:text-white transition">View detail</a></Link>
                </div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            <div className="relative group h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1525945518069-b924046d1385?auto=format&fit=crop&w=600&q=80')" }}>
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-6 transform group-hover:rotate-y-180 group-hover:bg-opacity-100 transition-all duration-500">
                <h1 className="text-3xl font-bold translate-z-0">Marijuana<br />Chill</h1>
                <span className="text-2xl">$155</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-center opacity-0 group-hover:opacity-75  group-hover:rotate-y-180 transition-all duration-500">
                <Link to={'/details'}
                 state={{
                  cart: {
                    url: 'https://images.unsplash.com/photo-1525945518069-b924046d1385?auto=format&fit=crop&w=600&q=80',
                    PlantName: 'Little Bonsai',
                    plantingDay: '12/16/24',
                    Height: '10cm',
                  },
                }}><a href="#" className="mb-2 bg-white text-black py-2 px-6 rounded hover:bg-gray-900 hover:text-white transition">View detail</a></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Album;