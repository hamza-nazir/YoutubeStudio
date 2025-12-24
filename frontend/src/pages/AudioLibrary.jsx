import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { myContext } from '../hooks/ContextApi';
import StudioNav from '../components/StudioNav'
import StudioLeftAside from '../components/StudioLeftAside';



const AudioLibrary = () => {



    const {studioDisplayAsideShort,setStudioDiplayAsideShort} =useContext(myContext);
  
 useEffect(() => {
  const handleResize = () => {
    if(window.innerWidth<750) setStudioDiplayAsideShort(true) ;
    else  setStudioDiplayAsideShort(false)
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);



  
 useEffect(() => {
  
  const handleResize = () => {
    if(window.innerWidth<750) setStudioDiplayAsideShort(true) ;
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


  return (
    
 
    <div className="container-fluid">

  
     
    <StudioNav/>




  <div className='studio-dashboard-parent' style={{overflow:'hidden'}}>

   <div className='dash-left' style={studioDisplayAsideShort?{width:'7%'}:{width:'20%'}}>

    <StudioLeftAside/>
   </div>
   <div className='dash-right p-2' style={studioDisplayAsideShort?{width:'93%',marginLeft:'10%'}:{width:'80%',marginLeft:'20%'}}>
    

<div className='p-2'>
AudioLibrary
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus ab nam, cumque provident dignissimos alias non mollitia recusandae modi deleniti enim laboriosam quaerat suscipit culpa. Incidunt iure ex suscipit nisi.
</div>



      </div>
    </div>
    </div>


    

 
  )
}

export default AudioLibrary