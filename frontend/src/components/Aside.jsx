import React, { useContext,useEffect } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FiZap } from "react-icons/fi";
import { AiOutlineBell, AiOutlineUser, AiOutlineDownload } from "react-icons/ai";
import {FiUser,  FiClock,  FiList,  FiVideo,  FiBookmark,  FiThumbsUp, FiDownload,} from "react-icons/fi";
import { FiMusic, FiRadio } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import {  FiSettings,  FiFlag,  FiHelpCircle,  FiSend} from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import '../css/Aside.css'
import { myContext } from '../hooks/ContextApi';

const Aside = () => {
const {homeAside,setHomeAside}=useContext(myContext);



useEffect(() => {
  const handleResize = () => {
    if(window.innerWidth<914) setHomeAside(true)
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  return (
   <div className={`container aside-container `} >
    <div  className={`mt-3  ${homeAside?" d-flex flex-column justify-content-center align-items-center ":"d-flex"}`}> <AiFillHome className={`${homeAside?"fs-2":"me-3 fs-3"} icon`} /> <span  className='' style={homeAside?{fontSize:'12px'}:{}}> {homeAside&&(<br/>)} Home</span></div>

    <div  className={`mt-3  ${homeAside?" d-flex flex-column justify-content-center align-items-center ":"d-flex"}`}> <FiZap className={`${homeAside?"fs-2":"me-3 fs-3"} icon`}/> <span  className='' style={homeAside?{fontSize:'12px'}:{}}> {homeAside&&(<br/>)} Shorts</span></div>
    <div  className={`mt-3  ${homeAside?" d-flex flex-column justify-content-center align-items-center ":"d-flex"}`}> <AiOutlineBell className={`${homeAside?"fs-2":"me-3 fs-3"} icon`}/> <span  className='' style={homeAside?{fontSize:'12px'}:{}}> {homeAside&&(<br/>)} Subscriptions</span></div>
    <div  className={`mt-3  ${homeAside?" d-flex flex-column justify-content-center align-items-center ":"d-flex"}`}> <AiOutlineUser className={`${homeAside?"fs-2":"me-3 fs-3"} icon`}/> <span  className='' style={homeAside?{fontSize:'12px'}:{}}> {homeAside&&(<br/>)} You</span></div>
    <div  className={`mt-3  ${homeAside?" d-flex flex-column justify-content-center align-items-center ":"d-flex"}`}> <AiOutlineDownload className={`${homeAside?"fs-2":"me-3 fs-3"} icon`}/> <span  className='' style={homeAside?{fontSize:'12px'}:{}}> {homeAside&&(<br/>)} Downloads</span></div>


    {
      !homeAside&&(
     <>
    <hr />
    <div className='mt-5'><span style={{fontSize:'20px'}}>You  <FaChevronRight className='ms-2 fs-6'/>  </span></div>
    <div className='mt-3'><FiClock className='icon fs-3 me-3'/>History</div>
    <div className='mt-3'><FiList className='icon fs-3  me-3'/>Playlists</div>
    <div className='mt-3'><FiVideo className='icon fs-3  me-3'/>Your videos</div>
    <div className='mt-3'><FiBookmark className='icon fs-3 me-3'/>Watch Later</div>
    <div className='mt-3'><FiThumbsUp className='icon fs-3 me-3'/>Liked videos</div>
    <div className='mt-3'><FiDownload  className='icon  fs-3 me-3'/>Downloads</div>
   

  
    <div className='mt-5 '><span style={{fontSize:'20px'}}>Explore</span></div>
    <div className='mt-3 '><FiMusic className='icon fs-3  me-3'/>Music</div>
    <div className='mt-3 '><IoGameControllerOutline className='icon fs-3 me-3'/>Gaming</div>
    <div className='mt-3 '><FiRadio className='icon fs-3 me-3'/>News</div>
    <div className='mt-3 '><CiTrophy className='icon fs-3 me-3'/>Sport</div>


    {/* <div className='mt-3'style={{fontSize:'20px'}} >More from Youtube</div>
        <div className='mt-3'>YouTube Premium</div>
        <div className='mt-3'>YouTube Studio</div>
        <div className='mt-3'>YouTube Music</div>
        <div className='mt-3'>YouTube Kids</div> */}

<div className='mt-5'><FiSettings className='icon fs-3 me-3'/>Settings</div>
<div className='mt-3'><FiFlag className='icon fs-3 me-3'/>Report history</div>
<div className='mt-3'><FiHelpCircle className='icon fs-3 me-3'/>Help</div>
<div className='mt-3'><FiSend className='icon fs-3 me-3'/>Send feedback</div>
</>
   
      )
    }
         
  
    

    </div>

  )
}

export default Aside