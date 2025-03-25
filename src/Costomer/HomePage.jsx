
import Navebar from '../Combonents/Navebar';





import HomeBanner from './HomeBanner';

import Album from './Album';
import Footer from '../Combonents/Footer';
import Cards from './Cards';

function HomePage() {
 
 

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
    {/* Navbar */}
    <div className=" w-full">
      <Navebar id="fixed z-20" />
    </div>
      <HomeBanner />
    {/* Cards Section */}
      <Album/>
   <div className="h-auto  lg:bottom-96  sm:bottom-0">
    
    <Cards h="500px" w="100%" />
    </div>
    {/* Footer */}
   <Footer/>
  </div>
);
}

export default HomePage;
