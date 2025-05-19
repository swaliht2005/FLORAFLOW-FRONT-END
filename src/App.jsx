import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter instead of Router
import CommonRaouts from './Routes/CommonRaouts';
import CostomerRouts from './Routes/CostomerRouts';
import SellerRoutes from './Routes/SellerRoutes';
import { SearchProvider } from './context/SearchContext';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <SearchProvider>
        <BrowserRouter>
          <CommonRaouts />
          <CostomerRouts />
          <SellerRoutes />
        </BrowserRouter>
      </SearchProvider>
    </ProfileProvider>
  );
}

export default App;