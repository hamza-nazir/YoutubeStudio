
import '../css/StudioNav.css'
import { useEffect, useState } from 'react'
import { RiAddLargeFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { FiMic } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { useContext } from 'react';
import { myContext } from '../hooks/ContextApi';
import { IoIosSearch } from "react-icons/io";
import { CgMediaLive } from "react-icons/cg";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";




const StudioNav = () => {

  const {setDialogOpen,currentUser,studioDisplayAsideShort,setStudioDiplayAsideShort} =useContext(myContext);
  const [barShow,setBarsShow]=useState(true);

   useEffect(() => {
  
  const handleBars = () => {
    if(window.innerWidth>735) setBarsShow(true) ;
    else  setBarsShow(false)
  };

  window.addEventListener('resize', handleBars);

  return () => {
    window.removeEventListener('resize', handleBars);
  };
}, []);

  const studioAsideFun=()=>{
    if (window.innerWidth<735) return 
    if(studioDisplayAsideShort==true){
      setStudioDiplayAsideShort(false)
    }else{
      setStudioDiplayAsideShort(true)
    }
  
  }
  return (
<>
             <div className="row navbar-studio shadow" >
              <div className="col-lg-2  d-flex flex-row justify-content-center col-3  d-flex justify-content-center align-items-center medium-text fw-semibold text-dark">
              
                  {barShow&&(
                 <span onClick={studioAsideFun}>

                <MdMenu className='fs-2 ms-5 me-4' style={{marginBottom:'2px'}}/>
                 </span> 
                  )}
                
               <img src="/logo.png" height={22} className='me-1 '  />
              <span>Studio</span></div>


              <div className="col-lg-7  d-flex align-items-center justify-content-center col-4">
            <input type="text " className='search-text-nav text-dark ps-2' placeholder='Search accross your channel' style={{backgroundColor:'#F1F1F1',border:'none'}} name="" id="" />
           <button  className="search-button bg-dl" style={{backgroundColor:'#F1F1F1',border:'none'}} ><IoIosSearch className="text-dark fs-2 " /></button>
           <button className="ms-lg-4 ms-md-2 ms-2 mic-button bg-dl me-5 mic-studio" ><FiMic className="text-dark fs-4"/></button>
              </div>


              <div className="col-lg-3    col-5 ">
             
                  <div className='d-flex  align-items-center justify-content-end mt-1'>
                  


              <div className="dropdown">
<a className="drop-down border d-inline-block  d-flex text-dark p-1 text-decoration-none align-items-center text-light" href="#" data-bs-toggle="dropdown">
  <RiAddLargeFill className='fs-5 '/> <span className='fw-semibold small-text ps-2 pe-2'>Create</span>
</a>
  <ul className="dropdown-menu">
      
      <li style={{cursor:'pointer'}} onClick={()=>setDialogOpen(true)}><p className="ms-3 d-flex" ><IoVideocamOutline className='fs-4 me-2'/>Upload Video</p></li>
     
      <li><p className="ms-3 d-flex" > <CgMediaLive className='fs-4 me-2'/> Go Live</p></li>
      <li><p className="ms-3 d-flex" > <IoCreateOutline className='fs-4 me-2'/> Create Post</p></li>
  </ul>
</div>


               <button className="ms-2 text-white border-0 bg-none "> <MdOutlineNotifications className="fs-2 text-dark"/> </button>
               <button  className="ms-2 text-white border-0 bg-none"> 
        

         
                <>
               <div  className='image-sn-div' style={{width:'90px'}}>
                 
                 {currentUser._id?(
                  <img className='border' style={{height:'40px',width:'40px',borderRadius:'50%'}} src={currentUser.profileImage}/>
                ):(
                    <span className='text-primary'>Signin</span>
                )}
                  </div>
                  </>
            
                </button>
               
              </div>

              </div>

             </div>

     </>
  )
}


export default StudioNav