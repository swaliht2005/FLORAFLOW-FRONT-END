import React from 'react';
import { BrowserRouter,Router } from 'react-router-dom';
import CommonRaouts from './Routes/CommonRaouts';
import CostomerRouts from './Routes/CostomerRouts'
import SellerRoutes from './Routes/SellerRoutes'


function App() {
  return (
    <BrowserRouter>
      <CommonRaouts />
      <CostomerRouts/>
      <SellerRoutes/>
    </BrowserRouter>
  );
}

export default App;
