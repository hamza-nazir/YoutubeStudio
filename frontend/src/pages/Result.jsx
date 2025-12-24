import  { useEffect, useState } from 'react'
import HomeSlider from '../components/HomeSlider'
import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import Axios from '../hooks/Axios'
import { useContext } from 'react'
import { useRef } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import LoadingBar from 'react-top-loading-bar';
import { Link, useSearchParams } from "react-router-dom";
import { myContext } from '../hooks/ContextApi'
import {formatDuration} from '../components/EditVideoLeftAside'
import '../css/Home.css';







const Result = () => {

  const ref = useRef(null);
  const [searchParams] = useSearchParams();
  const [page,setPage]=useState(1)
  const query = searchParams.get("search_query");
  const [maxData,setMaxData]=useState(false);
  const {result,setResult,homeAside,setHomeAside,currentUser} =useContext(myContext);




  useEffect(() => {
 
  const activeQuery = query; 

  if (!activeQuery ) return;

  ref.current.continuousStart();
  
  Axios.post("/search-videos", { q: activeQuery, page })
    .then(res => {
      if (page === 1) {
        setResult(res.data.results);
      } else {
        setResult(curr => [...curr, ...res.data.results]);
      }
      ref.current.complete();
    });
}, [query, page]);
  

useEffect(() => {
  setResult([]);
  // setMaxData(false);
  setPage(1);    
}, [query]);

   useEffect(() => {
  const handleScroll = () => {

    if(window.innerHeight+document.documentElement.scrollTop+1>document.documentElement.scrollHeight){
       setPage(curr=>curr+1);
    }
  };
 
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  useEffect(() => {
  const handleResize = () => {
  if(window.innerWidth<650) setHomeAside(true)
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
  }, []);

const watchLater=(e,id)=>{
   e.preventDefault(); 
   if(!currentUser._id) return "JA GAND MRWA";  
  Axios.post('/watch-later',{id})
  .then((res)=>{
    console.log(res.data)
  })
}
  return (
  <div className='container-fluid'>
      <LoadingBar color="#ff0000" ref={ref} height={2} />
    <Navbar />
   <div className='flex-home-layout' >
    <div className="home-left-aside p-3 setting-scroll-bar" style={homeAside?{width:'7%'}:{width:'21%'}}>
      <Aside/>

    </div>

    <div className="home-right-aside p-2" style={homeAside?{width:'93%'}:{width:'79%'}}>

    <HomeSlider/>
 
     {result.map((videos,index)=>(
      <Link key={index} to={`/watch/${videos.videoLink}`} style={{color:'black',textDecoration:'none'}}>
    
      <div  className="row mt-2">
        <div className='col-lg-4 col-6'>
          <div style={{position:'relative'}}>
            <video muted onMouseEnter={e => e.currentTarget.play()}  onMouseLeave={e => e.currentTarget.pause()} src={videos.url} style={{width:'100%',borderRadius:'10px'}}/>
          <span className="ptext" style={{ position: 'absolute', right: '12px',bottom:'10px',backgroundColor:'#151515bd',color:'white',padding:'1px 4px', borderRadius:'5px',boxSizing:'border-box' }}> 
          {formatDuration(videos.duration)}
          </span>
         
          </div>
        </div>
        <div className='col-lg-8 col-6'>
         <div className='w-75 d-flex justify-content-between'>
           <div>{videos.title}</div>
              <div className="dropdown" style={{zIndex:'1000'}}>
           <div className="drop-down d-flex text-dark p-2 text-decoration-none align-items-center text-light" href="#" style={{backgroundColor:'white'}} data-bs-toggle="dropdown">
           <span><HiDotsVertical/></span>

           </div>
             <ul className="dropdown-menu" style={{cursor:'pointer',zIndex:'1'}}>
           
               
               <li onClick={(e)=>watchLater(e,videos._id)} ><div className="ms-3 d-flex" >Watch Later</div></li>
               <li  ><div className="ms-3 d-flex" >Saved to Playlist</div></li>
               <li  ><div className="ms-3 d-flex" >Download</div></li>
               <li  ><div className="ms-3 d-flex" >Share</div></li>

              
             </ul>
           </div>
         </div>
          <div className='text-muted xsmall-text'>35 lac views &bull; 3 years ago </div>
          <div className='mt-3 xsmall-text text-muted'> <img src={videos.owner.profileImage} style={{width:'20px',height:'20px',borderRadius:'50%'}}/> {videos.owner.name}</div>
          <div className='mt-2 text-muted ptext'>
            {videos.description.length>120?(<div>{videos.description.slice(0,120)}...</div>  ):(  <div>{videos.description}</div>)}
            </div>


        </div>
      </div>
        </Link>
     ))}
    </div>
   </div>

 
  </div>
  )
}

export default Result