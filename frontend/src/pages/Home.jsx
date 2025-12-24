import React, { useEffect, useState } from 'react'
import HomeSlider from '../components/HomeSlider'
import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import { useContext } from 'react'
import Axios from '../hooks/Axios'
import { myContext } from '../hooks/ContextApi'
import '../css/Home.css'
const Home = () => {
    const {homeAside,setHomeAside,currentUser} =useContext(myContext);

useEffect(() => {
  const handleResize = () => {
    if(window.innerWidth<650) setHomeAside(true)
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

useEffect(()=>{
  if(!currentUser._id) return
Axios.get('/get-recommended-videos')
.then((res)=>{
  console.log(res.data)
})
},[currentUser])

  return (
  <div className='container-fluid'>
    <Navbar/>
   <div className='flex-home-layout' >
    <div className="home-left-aside p-3 setting-scroll-bar" style={homeAside?{width:'7%'}:{width:'21%'}}>
      <Aside/>

    </div>

    <div className="home-right-aside p-2" style={homeAside?{width:'93%'}:{width:'79%'}}>

    <HomeSlider/>

 
      Lorem ipsum dolor sit amet 
ates deleniti, ea nobis quia illo atque in deserunt qui sunt facilis saepe assumenda repellendus, reiciendis voluptatibus architecto tenetur vel, maxime itaque amet! Consectetur necessitatibus aut nemo eius. Perspiciatis.
      consectetur adipisicing elit. Facere magni cupiditate mollitia placeat ipsa tempora totam iusto blanditiis libero non minus, nostrum commodi! Deleniti repudiandae ad officiis iusto dicta commodi.
    </div>
   </div>

 
  </div>
  )
}

export default Home