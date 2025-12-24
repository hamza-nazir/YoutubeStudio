import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { RiAddLargeFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FiMic } from "react-icons/fi";
import { CgMediaLive } from "react-icons/cg";
import Axios from '../hooks/Axios';
import { useContext } from 'react';
import { IoVideocamOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import NotLoggedIn from '../components/NotLoggedIn'
import { FaBars } from "react-icons/fa6";
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { myContext } from '../hooks/ContextApi';
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';
import '../css/Navbar.css'


const Navbar = () => {
  const { search,setSearch, currentUser,homeAside,setHomeAside,dialogOpenWithLogin,setDialogOpenWithLogin} =useContext(myContext);
  
  const [searchParams] = useSearchParams(); 
  const query = searchParams.get("search_query");
 
   const [showBars, setShowBars] = useState(true);

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 914) setShowBars(false);
      else setShowBars(true);

    };

    window.addEventListener("resize", handleResize);

   
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const navigate=useNavigate();
 
  const loginFun=()=>{
    if(currentUser._id) return 
  window.location.href = "http://localhost:3000/auth/google";
}


useEffect(() => {
  if (query) {
    setSearch(query);
  } else {
    setSearch(""); 
  }
}, [query]);

const uploadFun=()=>{
if(!currentUser._id){
  setDialogOpenWithLogin(true)
}else{
  setDialogOpenWithLogin(false)
  navigate('/studio/dashboard')
}
}

const setterFun=()=>{
  if(window.innerWidth<914) return ;
if(homeAside==true) setHomeAside(false)
else setHomeAside(true);
}


const serachFun = () => {
  if (!search.trim()) return;
  navigate(`/result?search_query=${encodeURIComponent(search)}`);
};


  return (
<>
            {dialogOpenWithLogin&&(
              <NotLoggedIn/>
            )}
             <div className="row nav-container" style={{position:'sticky',top:'0',backgroundColor:'white'}}>
            
      
            <div className="d-flex justify-content-end align-items-center col-1">
{showBars&&(

  <FaBars className='fs-2' onClick={setterFun} />
)}

            </div>

              <div className="ps-5   col-2 d-flex flex-row justify-content-center col-2  d-flex justify-content-end align-items-center medium-text fw-semibold text-dark">
                <img src="/logo.png" height={22} />
                <span className='ms-1'>Youtube  </span><span className='xsmall-text text-muted d-inline-block mb-2 ms-1'>pk</span>
                
                </div>


              <div className="col-lg-6  d-flex align-items-center justify-content-center col-4">
            <input type="text" value={search} className='search-text-nav  ps-2' placeholder='Search' style={{color:'black'}} onChange={(e)=>{setSearch(e.target.value)}}  name="search" id="" />
           <button onClick={serachFun}  className="search-button bg-dl" ><IoIosSearch className="text-dark fs-2 "/></button>
           <button className="nav-mic ms-lg-4 ms-md-2 ms-2 mic-button bg-dl" ><FiMic className="text-dark fs-4"/></button>
              </div>


              <div className="col-lg-3    col-5 ">
             
                  <div className='d-flex  align-items-center justify-content-end mt-1'>
                  


              <div className="dropdown" style={{zIndex:'1000'}}>
<a className="drop-down d-flex text-dark p-2 text-decoration-none align-items-center text-light" href="#" data-bs-toggle="dropdown">
  <RiAddLargeFill style={{color:'#0F0F0F'}} className='fs-5 '/> <span className='msmall-text ps-1 pe-2  fw-bold'>Create</span>
</a>
  <ul className="dropdown-menu" style={{cursor:'pointer',zIndex:'1'}}>

    
    <li onClick={uploadFun} ><p className="ms-3 d-flex" ><IoVideocamOutline className='fs-4 me-2'/>Upload Video</p></li>
   
    <li><p className="ms-3 d-flex" > <CgMediaLive className='fs-4 me-2'/> Go Live</p></li>
    <li><p className="ms-3 d-flex" > <IoCreateOutline className='fs-4 me-2'/> Create Post</p></li>
  </ul>
</div>



               <button className="ms-2 text-white border-0 bg-none bell-icon"> <MdOutlineNotifications className="fs-2 text-dark"/> </button>
               <button onClick={loginFun} className="ms-2 text-white border-0 bg-none sign-in-btn"> 
                {currentUser?._id?(
                  <img className='border' style={{height:'40px',width:'40px',borderRadius:'50%'}} src={currentUser?.profileImage}/>
                ):(
                <>
               <div  style={{width:'90px'}}>
                   <MdOutlineAccountCircle className="fs-2 text-primary"/> 
                  <span className='sign-in-text text-primary small-text '>Sign in</span>
               </div>
                  </>
                )}
                
                </button>
               
              </div>

              </div>

             </div>

     </>
  )
}


export default Navbar