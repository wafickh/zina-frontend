import React, { useEffect } from "react";


import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";

import Home from "./pages/home/Home";
import Luxurycars from "./pages/Luxurycars/Luxurycars";
import Privacy from "./pages/privacy/Privacy";
import Error404 from "./pages/error/Error404";
function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/luxury-cars" element={<Luxurycars />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
