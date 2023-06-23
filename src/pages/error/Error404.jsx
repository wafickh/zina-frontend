import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './error404.css'

function Error404() {
  const navigate = useNavigate();

  const handleit = () => {
    navigate(`/`)
  }
  return (
    <div>
      <Navbar />
      <center className='ho'><h1>404 Page not found</h1></center>
      <center><button className='backhome' onClick={() => handleit()}>Go back Home</button></center>

    </div>
  )
}

export default Error404
