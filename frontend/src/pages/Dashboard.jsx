import { useEffect} from 'react'
import StudioUploadDialog from '../components/StudioUploadDialog';
import { useContext } from 'react';
import { myContext } from '../hooks/ContextApi';

import StudioNav from '../components/StudioNav'
import StudioLeftAside from '../components/StudioLeftAside';
import  '../css/Dashboard.css'

const Dashboard = () => {


    const {setDialogOpen,studioDisplayAsideShort,setStudioDiplayAsideShort} =useContext(myContext);
 useEffect(() => {
  
  const handleResize = () => {
    if(window.innerWidth<850) setStudioDiplayAsideShort(true) ;
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);



  return (
    
    <>
  
 
    <div className="container-fluid">

  
     
    <StudioNav/>

   
 
    <StudioUploadDialog/>

 

  <div className='studio-dashboard-parent'>

   <div className='dash-left' style={studioDisplayAsideShort?{width:'7%'}:{width:'20%'}}>

    <StudioLeftAside/>
   </div>


 <div className='dash-right p-2' style={studioDisplayAsideShort?{width:'93%',marginLeft:'10%'}:{width:'80%',marginLeft:'20%'}}>
 <div className="container-fluid p-2" >

   <div className=' container-fluid fw-lighter large-text'>Channel Dashboard</div>


    <div className="row ps-2">


     <div className="col-lg-12 mb-2  rounded text-center">
      <div className=' border py-2 rounded'> 

        <img src="/dashboard-1.png" style={{width:'100%', height:'auto',maxWidth:'350px'}}  alt="" />     
        <div>Want to see metrics on your recent video? <br />upload and publish a video to get started.</div> 
        <button onClick={()=>setDialogOpen(true)} className='bg-dark rounded-5 border-0 text-white p-2 mt-3 mb-2'>Upload videos</button>
      </div>
    </div>


  <div className="col-lg-6 ">
      <div className=" border mx-auto rounded d-flex justify-content-center align-items-center " >

  <div className=' rounded p-4 w-100' style={{height:'400px'}}>
    <div className='fw-semibold medium-text'>Analytics</div>
    <div className='msmall-text text-muted'>Current subscribers</div>
    <div className='fw-bold large-text'>1</div>
    <hr />
    <div className='fw-semibold msmall-text'>Summary</div>
    <div className='xsmall-text text-muted'>Last 28 days</div>
    <div className='msmall-text fw-semibold'>Views</div>
    <div className='msmall-text fw-semibold'>Watch time(hours)</div>
    <hr />
    <div className='fw-semibold msmall-text'>Top videos</div>
    <div className='xsmall-text text-muted'>Last 48 hours. Views</div>
    <button className='border-0 p-2 fw-semibold rounded-4 mt-3 msmall-text'>channel analytics</button>
  </div>
    
    </div>
    </div>


     <div className="col-lg-6 ">
      <div className="border rounded mx-auto  d-flex justify-content-center align-items-center">
    
   <div className=' rounded p-4' style={{height:'400px'}}>
     <div className='fw-semibold mb-3'>Creater Insider</div>
    <img className='rounded'  src="/this-week.png" style={{width:'100%', height:'auto',maxWidth:'350px'}} />
  <div className='fw-semibold'>
    This Week at YouTube
    </div>
    <div className='text-muted xsmall-text'>Short Newsflash! Covering new Hype features (with FAQs) & the addition of "Members" and "Public" content sorting options
  </div>

  <button className='border-0 p-2 fw-semibold rounded-4 mt-3 '>Watch on Youtube</button>
   </div>
  </div>
    </div>
      
    </div>

   </div>
   </div>
  </div>


    </div>


  
    </>
  )
}

export default Dashboard