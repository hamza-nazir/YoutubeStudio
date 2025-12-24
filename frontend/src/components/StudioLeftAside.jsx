
import React, { useState } from 'react'
import { MdOutlineSubtitles } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
import { IoBuildOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdOutlineAudiotrack } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import {  MdContentPasteSearch} from "react-icons/md";
import {Link }from 'react-router-dom'
import { useContext } from 'react';
import { myContext } from '../hooks/ContextApi';
import  '../css/StudioLeftAside.css'

const StudioLeftAside = () => {
      
        const {studioActiveLink,setStudioActiveLink,currentUser,studioDisplayAsideShort} =useContext(myContext);
  return (
    <div className='studio-left-parent border-end' style={{height:'100vh'}}>
    <div className=" text-center studio-left-image-container">
          <img className={`border mt-2 mb-2 ${studioDisplayAsideShort?"":""} ` }src={currentUser.profileImage||`/profile.png`}  style={studioDisplayAsideShort?{height:'40px',width:'40px',borderRadius:'50%'}:{height:'150px',width:'150px',borderRadius:'50%'}} />
          
            {!studioDisplayAsideShort&&(
        <>
        <div><b>Your Channel</b></div>
          
          <div className='text-muted'>{currentUser.name|| <Link className='text-primary text-decoration-none'>Login here</Link>}</div>
        </>
  )}
          
        </div>
      <div className={`mt-4 studio-hide-scroll   ${studioDisplayAsideShort?"text-center ":""}`} style={{height:'300px',overflowY:'scroll'}}>
        
     


   
    <Link  to={'/studio/dashboard'} onClick={()=>setStudioActiveLink("dashboard")} className='text-decoration-none '>
  <p className='mt-4 mb-4 text-dark  small-text '>
 

 {studioActiveLink=='dashboard'?(
<>
<MdOutlineDashboard  className={`bg-info ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />

</>
 ):(
   <MdOutlineDashboard  className={`${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />

 )}
 
    
      {!studioDisplayAsideShort&&(
    <span>Dashboard</span>
  )}
  </p>
</Link>
<Link to={'/studio/content'} onClick={()=>setStudioActiveLink("content")} className='text-decoration-none'>
  <p className='mt-4 mb-4 text-dark small-text'>

    
 {studioActiveLink=='content'?(

   <MdContentPasteSearch  className={`bg-info ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />
 ):(
   <MdContentPasteSearch  className={` ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />

 )}

    
      {!studioDisplayAsideShort&&(
    <span >    Content</span>
  )}
  </p>
</Link> 


<Link to={'/studio/earn'} onClick={()=>setStudioActiveLink("earn")} className='text-decoration-none'>
  <p className='mt-4 mb-4 text-dark small-text'>

   {studioActiveLink=='earn'?(

     <HiOutlineCurrencyDollar  className={`bg-info ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`}/>
   ):(
     <HiOutlineCurrencyDollar  className={`${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`}/>

   )}
    
 
  {!studioDisplayAsideShort&&(
    <span>Earn</span>
  )}
  </p>
</Link>





<Link to={'/studio/customise'} onClick={()=>setStudioActiveLink("customise")} className='text-decoration-none'>
  <p className='mt-4 mb-4 text-dark small-text'>

      {studioActiveLink=='customise'?(

        <IoBuildOutline  className={` bg-info ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />
   ):(
        <IoBuildOutline  className={` ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />

   )}
    
      {!studioDisplayAsideShort&&(
        <span>
      Customise
    </span>
  )}
  </p>
</Link>

<Link to={'/studio/audio'} onClick={()=>setStudioActiveLink("audio-library")} className='text-decoration-none'>
  <p className='mt-4 mb-4 text-dark small-text'>


     {studioActiveLink=='audio-library'?(

       <MdOutlineAudiotrack  className={`bg-info ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />
   ):(
       <MdOutlineAudiotrack  className={`${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />

   )}
    
      {!studioDisplayAsideShort&&(
        <span>
   Audio library
    </span>
  )}
 
  </p>
</Link>

<Link to={'/studio/community'} onClick={()=>setStudioActiveLink("community")} className='text-decoration-none'>
  <p className='mt-4 mb-4 text-dark small-text'>

    {studioActiveLink=='community'?(

      <MdOutlineGroup  className={`bg-info ${studioDisplayAsideShort?" fs-2":"fs-3 ms-4 me-2"}`}/>
   ):(
      <MdOutlineGroup  className={`${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`}/>

   )}
   
      {!studioDisplayAsideShort&&(
        <span>
    Community
    </span>
  )}
  
  </p>
</Link>

<Link to={'/studio/subtitles'} onClick={()=>setStudioActiveLink("subtitles")} className='text-decoration-none'>
  <p className='mt-4 text-dark small-text'>


        {studioActiveLink=='subtitles'?(

          <MdOutlineSubtitles  className={`bg-info ${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />
   ):(
          <MdOutlineSubtitles  className={`${studioDisplayAsideShort?"fs-2":"fs-3 ms-4 me-2"}`} />


   )}
   
      {!studioDisplayAsideShort&&(
        <span>
     Subtitles
    </span>
  )}
  
  </p>
</Link> 



    </div>
        <div style={{height:'1px',color:'black',backgroundColor:'#e2dfdfff'}}></div>


    <div style={{overflowY:'scroll'} } className='hidding-setting-scroll' >

        <Link className='text-decoration-none '>
  <p className={`${studioDisplayAsideShort?"text-center":""} mt-4 text-dark  small-text`}>

    <IoSettingsOutline  className={` ${studioDisplayAsideShort?"fs-2  ":"fs-3 ms-4 me-2"}`} />
      {!studioDisplayAsideShort&&(
        <span>
     Setting
    </span>
  )}
  
  </p>
</Link> 

<Link className='text-decoration-none'>
  <p className={`${studioDisplayAsideShort?"text-center":""} mt-4 text-dark  small-text`}>
 
    <MdOutlineFeedback  className={`${studioDisplayAsideShort?" fs-2":"fs-3 ms-4 me-2"}`} />
      {!studioDisplayAsideShort&&(
        <span>
     Send feedback
    </span>
  )}
  
  </p>
</Link> 
  </div>
  
    </div>
  )
}

export default StudioLeftAside



