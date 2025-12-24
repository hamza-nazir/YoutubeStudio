import { useEffect, useState } from 'react'
import StudioUploadDialog from '../components/StudioUploadDialog';
import { useContext } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { RiFilePaperLine } from "react-icons/ri";
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { myContext } from '../hooks/ContextApi';
import { useNavigate } from 'react-router-dom';
import { CiLink } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { FaArrowDownLong } from "react-icons/fa6";
import {formatDuration} from '../components/EditVideoLeftAside'
import StudioNav from '../components/StudioNav'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { RiYoutubeLine } from "react-icons/ri";
import { FaRegChartBar } from "react-icons/fa";
import StudioLeftAside from '../components/StudioLeftAside';
import { TfiComments } from "react-icons/tfi";
import DialogEdit from '../components/DialogEdit';
import Axios from '../hooks/Axios';
import { CiMenuKebab } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { MdOutlineFilterList } from "react-icons/md";
import '../css/Content.css'



const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));


const Content = () => {
    const ref = useRef(null);
  const navigate=useNavigate();
  const scrollDiv=useRef();
  const [page,setPage]=useState(1)
    const [videoDataToMap,setVideoDataToMap]=useState([]);

    const [videosEnd,setVideosEnd]=useState(false)
    const {setDialogOpen,studioDisplayAsideShort,setStudioDiplayAsideShort,setDraftVideoLinkWithPopUp,draftVideoLinkWithPopUp, setDialogEditOpen,} =useContext(myContext);
  


   useEffect(() => {
  const handleScroll = () => {

    if(window.innerHeight+document.documentElement.scrollTop+1>document.documentElement.scrollHeight){
       setPage(curr=>curr+1)
    }
  };
 
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

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



useEffect(()=>{
  
  
   if (!ref.current) return;
     ref.current.continuousStart(); 
  Axios.post('/get-videos',{page})
  .then((res)=>{
    if (res.data.length<5) setVideosEnd(true);
      setVideoDataToMap(curr => [...curr, ...res.data]);
      ref.current.complete(); 
  })
  .catch(() => {
        ref.current.complete(); 
        console.log(err.messgae)
      })
      
  },[page])
  
  
 useEffect(() => {
  
  const handleResize = () => {
    if(window.innerWidth<850) setStudioDiplayAsideShort(true) ;
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const popUpDraftFun=(videoLink,isDraft)=>{
 
  if(isDraft){
    setDraftVideoLinkWithPopUp(videoLink)
    setDialogEditOpen(true);
  }else{

  navigate(`/studio/${videoLink}/edit`)    
  }

}

  return (
    
 
    <div className="container-fluid">
     
    {!videosEnd&&(
      <LoadingBar color="#ff0000" ref={ref} height={2} />
    )}
    <StudioNav/>

   
    <StudioUploadDialog/>
    {draftVideoLinkWithPopUp!=""&&(
      <DialogEdit/>
    )}


  <div className='studio-dashboard-parent ' style={{overflow:'hidden'}}>

   <div className='dash-left' style={studioDisplayAsideShort?{width:'7%'}:{width:'20%'}}>

    <StudioLeftAside/>
   </div>
   <div ref={scrollDiv} className='dash-right p-2' style={studioDisplayAsideShort?{width:'93%',marginLeft:'10%'}:{width:'80%',marginLeft:'20%'}}>
    


    
 <div className="container-fluid p-2" style={{overflow:'hidden'}}>

   <div className=' container-fluid fw-lighter large-text'>Channel content</div>
 <div className="row  mt-2  studio-setting-scroll content-row-scroll  " style={{cursor:'pointer'}}>
   <div className="col fw-semibold ">Inspiration</div>
   <div className="col fw-semibold">Videos</div>
   <div className="col fw-semibold">Shorts</div>
   <div className="col fw-semibold ">Live</div>
   <div className="col fw-semibold">Posts</div>
   <div className="col fw-semibold ">Playlists</div>
   <div className="col fw-semibold">Podcasts</div>
   <div className="col fw-semibold">Promotions</div>
   <div className="col fw-semibold ">Collabrations</div>
   <div className="col-2"></div>

 </div>
   {/* <hr style={{color:'grey'}} /> */}
 <div className="d-flex  align-items-center border-top border-bottom p-1 ">
  
   <div className="me-4" style={{cursor:'pointer'}}>< MdOutlineFilterList className='fs-2'/> </div>
   <div className=" text-muted fw-semibold" style={{cursor:'pointer'}}>Filter</div>
 
 </div>
{/* <hr style={{color:'grey'}}/> */}

 <div className="row mt-2">
   <div className="col-lg-4 col-md-6 col-5 fw-semibold xsmall-text text-muted video-col">


    <LightTooltip
  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
      <div className='fw-semibold'>This shows all the videos uploaded to your channel.</div>
      <div style={{ marginTop: '8px' }}>
        Select any video to change its title or description.
      </div>
    </div>
  }
>
  Video
</LightTooltip>

   </div>
   <div className="col-lg-2 col-md-2 col-3 fw-semibold text-muted  xsmall-text text-center visib ">

   <LightTooltip
  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
      <div className='fw-semibold'>Who can see and share your video</div>
      <div style={{ marginTop: '8px' }}>
        You can click a video's visibility setting to change it
      </div>
    </div>
  }
>
  Visibility
</LightTooltip>

   </div>
   <div className="col fw-semibold text-muted  xsmall-text text-center restriction-col">

     <LightTooltip
  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
      <div className='fw-semibold'>Any restrictions that impact your video</div>
      <div style={{ marginTop: '8px' }}>
        See if anything is limiting your video's audience or its ability to earn money. In some cases, you can take action to remove a restriction.
      </div>
    </div>
  }
>
  Restriction
</LightTooltip>
   </div>
   <div className="col fw-semibold text-center  xsmall-text date-col"> 
    
      <LightTooltip
  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
      <div className='fw-semibold'>Any restrictions that impact your video</div>
      <div style={{ marginTop: '8px' }}>
       You'll see the upload date if your video is private or unlisted. If your video is scheduled (to go public or as a premiere), you'll see the scheduled date. If your video is public, you'll see the published date. If your video is uploaded via RSS, you'll see the original release date from the RSS.
      </div>
    </div>
  }
>
  Date
</LightTooltip>
    <FaArrowDownLong className='ms-2'/> </div>
   <div className="col fw-semibold text-muted  xsmall-text views text-center">

 <LightTooltip
  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
      <div className='fw-semibold'>
        How many times viewers watched your video

      </div>
      <div style={{ marginTop: '8px' }}>

This number may temporarily freeze or fluctuate, especially for newly uploaded videos
      </div>
    </div>
  }
>
  Views
</LightTooltip>

   </div>
   <div className="col hide-at-small-width fw-semibold text-muted  xsmall-text text-center">

     <LightTooltip
  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
      <div className='fw-semibold'>
How many comments are on your video

      </div>
      <div style={{ marginTop: '8px' }}>


You can see what viewers said by clicking the number of comments
      </div>
    </div>
  }
>
  Comments
</LightTooltip>

   </div>
   <div className="col fw-semibold text-muted xsmall-text  text-center l-d">

         <LightTooltip
  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
      <div className='fw-semibold'>
How many likes (vs dislikes) your video has

      </div>
      <div style={{ marginTop: '8px' }}>


Take a look at the topic and format of your most-liked videos. You can learn what's most appealing to your audience.

      </div>
    </div>
  }
>
  Likes/dislikes

</LightTooltip>

   </div>
   <hr style={{color:'grey',width:'98%',margin:'auto'}} className='mt-2' />
 </div>
 

{
  videoDataToMap.length>0?(
videoDataToMap.map((video,index)=>(







<div className="row parent content-row-hover border-bottom p-2" key={index}>

  <div className=" col-lg-4 center-at-small-content col-md-6 col-5">
  

  <div className="row">

  <div className="col-lg-5 col-12  col-md-6">

{video.isDraft?(
  <div style={{position:'relative'}}>
    <video src={video.url} style={{width:'100%'}}  className='rounded video-disable-wrapper' muted={true}   />
    <span className="ptext" style={{ position: 'absolute', right: '12px',bottom:'10px',backgroundColor:'#2a2a2abd',color:'white',padding:'1px 4px', borderRadius:'5px',boxSizing:'border-box' }}> 
          {formatDuration(video.duration)}
          </span>
         


  </div>

):(
<div style={{position:'relative'}}>
  <video src={video.url}  style={{width:'100%'}} className='rounded' muted={true}   />
      <span className="ptext" style={{ position: 'absolute', right: '12px',bottom:'10px',backgroundColor:'#2a2a2abd',color:'white',padding:'1px 4px', borderRadius:'5px',boxSizing:'border-box' }}> 
          {formatDuration(video.duration)}
          </span>
</div>
)}

  </div>
  <div className=" col-lg-7 col-12  col-md-6 ">
    <div className='d-flex flex-column'>
  <div style={{fontSize:'12px',fontWeight:'400'}} onClick={()=>popUpDraftFun(video.videoLink,video.isDraft)} className='mt-2 video-col video-col-hover text-wrap'>{video.title||video.originalVideoName}</div>

  <div className='mt-4 w-100 '>
  


  <div className="video-wrapper ">
  <div className='icons-at-content  '>
    <Tooltip style={{cursor:'pointer'}}  title="Details">
    <GoPencil  className='fs-5 '/>
    </Tooltip>
    {!video.isDraft && (
      <>
        <Tooltip   style={{cursor:'pointer'}} title="Analytics">
        <FaRegChartBar className='fs-5 ms-2'/>
        </Tooltip>

         <Tooltip style={{cursor:'pointer'}} title="Comments">
        <TfiComments className=' fs-5 ms-2'/>
        </Tooltip>
      </>
    )}
   <Tooltip style={{cursor:'pointer'}} title="View on YouTube">
    <RiYoutubeLine className='fs-5 ms-2'/>
        </Tooltip>
   <Tooltip style={{cursor:'pointer'}} title="Options">
    <CiMenuKebab className='fs-5 ms-1'/>

   </Tooltip>

  </div>
</div>
    
     </div>

    </div>
  </div>

  </div>



  
    
  </div>
  {video.isDraft&&(

  <div className="col-lg-2 col-md-2 col-3  text-center d-flex justify-content-evenly align-items-center  xsmall-text " >  <RiFilePaperLine className='fs-6 me-1'/> Draft </div>
  )}
    {!video.isDraft&&(

 <div className="col-lg-2 col-md-2 col-3  text-center d-flex justify-content-evenly align-items-center xsmall-text">
  {video.visibility === "Public" ? (<><CiGlobe className='fs-5'/><span className=' xsmall-text'>
    

      <LightTooltip  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
    <div className='fw-semibold'>Public</div>
    <div style={{ marginTop: '8px' }}>Everyone can see this video</div></div>}>
 <div className=''>Public
  <span className='icons-at-content '><FaChevronDown style={{cursor:'pointer'}} className='ms-2'/></span>
  </div> 
</LightTooltip>
    </span></>) : video.visibility === "Private"? (<><MdLockOutline className='fs-5'/><span className='xsmall-text'>
      
       <LightTooltip  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
    <div className='fw-semibold'>Private</div>
    <div style={{ marginTop: '8px' }}>Only you and people that you choose can see this video.</div></div>}>
 <div>Private
  <span className='icons-at-content '><FaChevronDown style={{cursor:'pointer'}} className='ms-2'/></span>
  </div> 
</LightTooltip>
      
      
      
      </span></>) : (<> <CiLink className='fs-5'/> <span className='xsmall-text'>
        
        
        <LightTooltip  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
    <div className='fw-semibold'>Unlisted</div>
    <div style={{ marginTop: '8px' }}>This video won't appear on your channel page. It also won't appear in YouTube search results, unless someone adds it to a public playlist.</div></div>}>
 <div>Unlisted
  <span className='icons-at-content '><FaChevronDown style={{cursor:'pointer'}} /></span>
  </div> 
</LightTooltip>
        
        
        </span></>)}
</div>)}
  <div className="col  text-center d-flex justify-content-center align-items-center restriction-col msmall-text">{video.forKids?(<>
    <LightTooltip  placement="top"
  title={
    <div style={{ padding: '5px', fontSize: '14px' }}>
    <div className='fw-semibold'>Made for Kids (set by you)</div>
    <div style={{ marginTop: '8px' }}>Features like personalised ads and notifications won't be available on videos 'Made for Kids'. Videos that are set as 'Made for Kids' by you are more likely to be recommended alongside other children's videos. Learn more</div></div>}>
<div className=' xsmall-text' >For Kids</div>
</LightTooltip>
  
  </>):(<span className='xsmall-text'>None</span>)}</div>
  <div className="col  text-center d-flex justify-content-center align-items-center date-col  msmall-text "> 
    {video.isDraft?(<>
    -
    </>):(<span className='xsmall-text ' >
    { new Date(video.createdAt).toLocaleDateString("en-US", {  day: "numeric", month: "short",year: "numeric" }) } 
    
    </span>)}
    
    
    
    </div>
  <div className="col  text-center d-flex justify-content-center align-items-center  msmall-text">
    {
      video.isDraft?(<>
      -
      </>):(<>
      1
      </>)
    }
  </div>
  <div className="col  hide-at-small-width  text-center d-flex justify-content-center align-items-center  msmall-text">
{
  video.isDraft?(<>
    -
  </>):(<>
  2
  </>)
}

  </div>
  <div className="col text-center d-flex justify-content-center align-items-center  msmall-text l-d">

    {video.isDraft?(<>
    <button onClick={()=>popUpDraftFun(video.videoLink,video.isDraft)}   style={{ whiteSpace: "nowrap" }}  className='border-0 xsmall-text p-2 rounded-4  fw-semibold'>Edit Draft</button>
    </>):(<>
    1
    </>)}
  </div>

</div>

))

  ):(
    <div className='text-center mt-3'>

      <img src="/dashboard-1.png" style={{width:'100%', height:'auto',maxWidth:'350px'}}  alt="" />
      <div className='text-muted'>No content available</div>
      <button className='rounded-3  p-2 mt-2 border-0 text-white  ' onClick={()=>setDialogOpen(true)}>Upload videos</button>
      </div>
   
  )
}


</div>





      </div>
    </div>
    </div>


    

 
  )
}

export default Content