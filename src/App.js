import React, { useEffect } from "react";


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate 

} from "react-router-dom";

import Home from "./pages/home/Home";
import Luxurycars from "./pages/Luxurycars/Luxurycars";
import Privacy from "./pages/privacy/Privacy";
import Construction from "./pages/constuction/Constuction";
import Error404 from "./pages/error/Error404";
import Custom from "./pages/custom/Custom";
import Classic from "./pages/classiccars/Classic";

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classics" element={<Classic />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/used" element={<Luxurycars />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/error" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
