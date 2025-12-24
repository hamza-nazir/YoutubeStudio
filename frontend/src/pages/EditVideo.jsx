import { useEffect, useState, useRef, useContext } from 'react';
import { myContext } from '../hooks/ContextApi';
import StudioNav from '../components/StudioNav';
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import EditVideoLeftAside from '../components/EditVideoLeftAside';
import { useParams } from 'react-router-dom';
import { BsBadgeSd } from "react-icons/bs";
import Axios from '../hooks/Axios';
import { MdOutlineAutoAwesome, MdOutlineSpeed } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { TbFileUpload } from "react-icons/tb";
import Box from '@mui/material/Box';
import { CiCircleInfo } from "react-icons/ci";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditVideo = () => {
  const {setSnackBarMessage, setSnackBarOpen, studioDisplayAsideShort, setStudioDiplayAsideShort } = useContext(myContext);
  const { videolink } = useParams();
  const [videoData,setVideoData]=useState({title:'',duration:'',description:'',category:'',moderation:'',sortBy:'',visibility:'',tagsString:'',forKids:null,restrictOverEighteen:null,commentStatus:true,showLikeCount:false});
  
  const [trackChange,setTrackChange]=useState(false);

  const [adult, setAdult] = useState(false);
  const [showMore, setShowMore] = useState(false);
useEffect(() => {
    if (videolink) { 
      Axios.get('/get-video-data-for-edit', { params: { videolink } })
        .then((res) => {
          setVideoData(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [videolink]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750) setStudioDiplayAsideShort(true);
      else setStudioDiplayAsideShort(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setStudioDiplayAsideShort]);


  const handleChange=(e)=>{
    setVideoData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
    setTrackChange(true);
  }


  const submitFun=()=>{
    Axios.post('/save-edited-video',videoData)
    .then((res)=>{
      setSnackBarMessage('Video Edit Succesfully')
      setSnackBarOpen(true);
    setTrackChange(false);
     
    })
  }
  return (
    <div className="container-fluid">
      <StudioNav />
      <div className='studio-dashboard-parent' style={{ overflow: 'hidden' }}>
        <div className='dash-left border-end' style={studioDisplayAsideShort ? { width: '7%' } : { width: '20%' }}>
          <EditVideoLeftAside data={{videoData, studioDisplayAsideShort}} />
        </div>
        <div className='dash-right p-2' style={studioDisplayAsideShort ? { width: '93%', marginLeft: '7%' } : { width: '80%', marginLeft: '20%' }}>
          <div className='p-2'>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-12 ">
                  <div onClick={()=>console.log(videoData)} className='large-text fw-semibold'>Video details</div>

                

                  <div className="border mt-2 p-2 rounded-2 bg-white">
                    <div className="xsmall-text text-muted fw-semibold">Title (required)</div>
                    <textarea
                    onChange={handleChange}
                    maxLength={100}
                    value={videoData.title}
                      placeholder="Add a title that describe video (type @ to mention a channel)"
                      name="title"
                      className="textarea msmall-text w-100 border-0"
                      style={{ resize: 'none' }}
                    />
                    <div className='pe-1 text-muted xsmall-text' style={{textAlign:'end'}}> {videoData.title.length}/100</div>
                  </div>

               
                  <div className="border p-2 mt-2 rounded-2 bg-white">
                    <div className="xsmall-text text-muted fw-semibold">Description (required)</div>
                    <textarea
                    onChange={handleChange}
                    name='description'
                    value={videoData.description}
                    maxLength={5000}
                      placeholder="Tell viewers about your video (type @ to mention a channel)"
                      className="textarea msmall-text w-100 border-0"
                      style={{ resize: 'none', height: '200px' }}
                    />
                    <div className='pe-1 text-muted xsmall-text' style={{textAlign:'end'}}> {videoData.description.length}/5000</div>

                  </div>

                  {/* Upload options */}
                     <div className="container mt-3">
                                  <div className="row">
                  
                  
                  
                  
                                    <div className="col   border-dotted px-2 py-5" style={{cursor:'pointer'}} >
                                      <div className=" d-flex  justify-content-center align-items-center">
                  
                                      <input type="file" name="" id="uploadFile" className="d-none" />
                                      <label htmlFor="uploadFile">
                                        <div >
                                         
                                             <div className="d-flex justify-content-center align-items-center"> <TbFileUpload className="fs-3"/> </div>
                                             <div className="d-flex justify-content-center align-items-center text-muted xsmall-text">upload file</div>
                                        </div>
                                      </label>
                                      </div>
                                    </div>
                  
                  
                                      <div className="col  me-2 ms-2 border-dotted px-2 py-5" style={{cursor:'pointer'}} >
                                      <div className=" d-flex  justify-content-center align-items-center">
                  
                                      <input type="file" name="" id="uploadFile" className="d-none" />
                                      <label htmlFor="uploadFile">
                                        <div >
                     
                                             <div className="d-flex justify-content-center align-items-center"> <MdOutlineAutoAwesome className="fs-3"/> </div>
                                             <div className="d-flex justify-content-center align-items-center text-muted xsmall-text">Auto-generated</div>
                                        </div>
                                      </label>
                                      </div>
                                    </div>
                  
                  
                  
                                    <div className="col  border-dotted px-2 py-5" style={{cursor:'pointer'}}>
                                      <div className=" d-flex  justify-content-center align-items-center">
                  
                                      <input type="file" name="" id="uploadFile" className="d-none" />
                                      <label htmlFor="uploadFile">
                                        <div >
                                         
                                             <div className="d-flex justify-content-center align-items-center"> <MdOutlineSpeed className="fs-3"/> </div>
                                             <div className="d-flex justify-content-center align-items-center text-muted xsmall-text">Test and compare</div>
                                             </div>
                                      </label>
                                      </div>
                                    </div>
                  
                  
                  
                                    </div>
                                  </div>
                  

                  {/* Audience Section */}
                  <div className="fw-semibold mt-3 mb-2">Audience</div>
                  <div className="msmall-text fw-semibold">Is this video Made for Kids? (required)</div>
                  <div className="msmall-text text-muted">
                    Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. <span className="text-primary"> What is 'Made for Kids' content?</span>
                  </div>
                  <div className="d-flex mt-2 rounded-2 py-1 border" style={{ backgroundColor: '#f9f9f9' }}>
                    <CiCircleInfo className="fs-1 mt-2 me-1" />
                    <div className="rounded-2 text-muted" style={{ fontSize: "13px" }}>
                      Features like personalised ads and notifications won't be available on videos that are Made for Kids. Videos that are set as Made for Kids by you are more likely to be recommended alongside other children's videos. Learn more
                    </div>
                  </div>
                  <div id="kids-category" className='mt-2'>
                    <div className="fw-semibold d-flex align-items-center">
                      <input onChange={()=>setVideoData(prev=>({...prev,forKids:true}))} checked={videoData.forKids}  type="radio" name="forKids" id="radioOne" className="custom-radio" />
                      <label htmlFor="radioOne">Yes, it's Made for Kids</label>
                    </div>
                    <div className="fw-semibold mt-2 d-flex align-items-center">
                      <input onChange={()=>setVideoData(prev=>({...prev,forKids:false}))} checked={!videoData.forKids} type="radio" name="forKids" id="radioTwo" className="custom-radio" />
                      <label htmlFor="radioTwo">No, it's not 'Made for Kids'</label>
                    </div>
                  </div>


                  <div className="mt-3 upload-accordian">
                    <div className="fw-semibold mb-2" style={{ cursor: 'pointer' }} onClick={() => setAdult(!adult)}>
                      {!adult ? <IoChevronDown className="fs-4" /> : <IoChevronUp className="fs-4" />}
                      <span className="ms-3">Age restriction (advanced)</span>
                    </div>
                    {adult && (
                      <>
                        <div className="mb-2">
                          <div className='fw-semibold' style={{ fontSize: '13px' }}>Do you want to restrict your video to an adult audience?</div>
                          <div className="text-muted" style={{ fontSize: '13px' }}>Age-restricted videos are not shown in certain areas of YouTube. These videos may have limited or no ads monetisation. <span className="text-primary">Learn more</span></div>
                        </div>
                        <div className="mt-3 mb-3">
                          <div className="fw-semibold d-flex align-items-center">
                            <input onChange={()=>setVideoData(prev=>({...prev,restrictOverEighteen:true}))} checked={videoData.restrictOverEighteen} type="radio" name="restrictOverEighteen" id="radioOnea" className="custom-radio" />
                            <label htmlFor="radioOnea">Yes, restrict my video to viewers over 18</label>
                          </div>
                          <div className="fw-semibold mt-2 d-flex align-items-center">
                            <input onChange={()=>setVideoData(prev=>({...prev,restrictOverEighteen:false}))}  checked={!videoData.restrictOverEighteen} type="radio" name="restrictOverEighteen" id="radioTwob" className="custom-radio" />
                            <label htmlFor="radioTwob">No, don't restrict my video to viewers over 18 only</label>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Show More / Less */}
                  {!showMore ? (
                    <>
                      <button className="border-0 rounded-4 py-1 px-2 mb-2 mt-2" onClick={() => setShowMore(true)}>
                        <span className="fw-semibold" style={{ fontSize: '14px' }}>Show more</span>
                      </button>
                      <div className="text-muted msmall-text">Paid promotion, collaboration, subtitles and more</div>
                    </>
                  ) : (
                    <>
                      <button className="border-0 rounded-4 py-1 px-2 mb-2 mt-2 fw-semibold" style={{ fontSize: '14px' }} onClick={() => setShowMore(false)}>Show less</button>
                    </>
                  )}

                  {showMore && (
                    <>
                   

                    <div className='fw-semibold mt-4 '>Collaboration</div>
                    <div className='ptext text-muted'>Grow your audience by collaborating with other creators and expand your video's reach to their audiences. Learn more</div>
                    <button className='border-0 rounded-4 p-2 mt-2 ptext'>Invite a collaborator</button>


               

                     <div className="fw-semibold mt-2">Tags</div>
                      <div className="text-muted ptext">
                        Tags can be useful if content in your video is commonly misspelt. Otherwise, tags play a minimal role in helping viewers to find your video. <span className="text-primary">Learn more</span>
                      </div>
                      <div className="mt-2">
                        <input className="w-100 rounded-2 border p-2" onChange={handleChange} value={videoData.tagsString} placeholder="Add tag" type="text" name="tagsString" />
                      </div>
                      <div className="text-muted ptext">Enter a comma after each tag</div>
                  



            

                  <div className='fw-semibold mt-2'>Category</div>
                  <div className='ptext text-muted mb-3'>Add your video to a category so that viewers can find it more easily</div>
                       <Box  className="mt-2">
    <FormControl sx={{ width: '100%' }}>
  <InputLabel id="demo-simple-select-label" sx={{  "&.Mui-focused": {  color: "#000000",   } }} >Category</InputLabel>

<Select value={videoData.category} onChange={handleChange} name="category" labelId="demo-simple-select-label"  id="demo-simple-select"  label="Category"
  sx={{
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CCCCCC", 
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 300,
        overflowY: "auto",
        borderRadius: "5px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        },
      },
    },
  }}
>

    <MenuItem value="cars-and-vehicles">Cars and vehicles</MenuItem>
    <MenuItem value="comedy">Comedy</MenuItem>
    <MenuItem value="education">Education</MenuItem>
    <MenuItem value="entertainment">Entertainment</MenuItem>
    <MenuItem value="film-and-animation">Film and animation</MenuItem>
    <MenuItem value="gaming">Gaming</MenuItem>
    <MenuItem value="how-to-and-style">How-to and style</MenuItem>
    <MenuItem value="music">Music</MenuItem>
    <MenuItem value="news-and-politics">News and politics</MenuItem>
    <MenuItem value="non-profits-and-activism">Non-profits and activism</MenuItem>
    <MenuItem value="people-and-blogs">People and blogs</MenuItem>
    <MenuItem value="pets-and-animals">Pets and animals</MenuItem>
    <MenuItem value="science-and-technology">Science and technology</MenuItem>
    <MenuItem value="sport">Sport</MenuItem>
    <MenuItem value="travel-and-events">Travel and events</MenuItem>
  </Select>
</FormControl>

                       </Box>

                    <div className='fw-semibold mt-2'>Comments and ratings</div>
                    <div className='text-muted ptext'>Choose if and how you want to show comments</div>
                    <div className="row">
                        <div className="col">
                      <Box  className="mt-2">
    <FormControl sx={{ width: '100%' }}>
  <InputLabel id="demo-simple-select-label" sx={{  "&.Mui-focused": {  color: "#000000",   } }} >Comments</InputLabel>

  <Select onChange={handleChange} value={videoData.commentStatus}  name="commentStatus" labelId="demo-simple-select-label"  id="demo-simple-select"  label="Comments"
  sx={{
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CCCCCC", 
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 300,
        overflowY: "auto",
        borderRadius: "5px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        },
      },
    },
  }}>

    <MenuItem value={true}>On</MenuItem>
    <MenuItem value={false} >Off</MenuItem>

  </Select>
</FormControl>

                      </Box>
                        </div>
                        <div className="col">



                        <Box  className="mt-2">
    <FormControl sx={{ width: '100%' }}>
  <InputLabel id="demo-simple-select-label" sx={{  "&.Mui-focused": {  color: "#000000",   } }} >Moderation</InputLabel>

<Select onChange={handleChange} value={videoData.moderation}  name="moderation" labelId="demo-simple-select-label"  id="demo-simple-select"  label="Moderation"
  sx={{
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CCCCCC", 
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 300,
        overflowY: "auto",
        borderRadius: "5px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        },
      },
    },
  }}
>

   
    <MenuItem value="none">None</MenuItem>
    <MenuItem value="basic">Basic</MenuItem>
    <MenuItem value="strict">Strict</MenuItem>
    <MenuItem value="hold-all">Hold all</MenuItem>

  </Select>
</FormControl>

                      </Box>
                        </div>
                    </div>

                    <Box  className="mt-2">
    <FormControl sx={{ width: '100%' }}>
  <InputLabel id="demo-simple-select-label" sx={{  "&.Mui-focused": {  color: "#000000",   } }} >Sort by</InputLabel>

<Select onChange={handleChange} value={videoData.sortBy} name="sortBy" labelId="demo-simple-select-label"  id="demo-simple-select"  label="Sort by"
  sx={{
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CCCCCC", 
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 300,
        overflowY: "auto",
        borderRadius: "5px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        },
      },
    },
  }}
>

      <MenuItem value="top">Top</MenuItem>
    <MenuItem value="newset">Newest</MenuItem>


  </Select>
</FormControl>

                       </Box>



                     
                    <label htmlFor='showLikeCount' className='mt-2 ptext'><input className='me-2' type="checkbox" checked={videoData.showLikeCount} onChange={(e)=>setVideoData(prev=>({...prev,showLikeCount:e.target.checked}))} name="showLikeCount" id="showLikeCount" />Show how many viewers like this video</label>

                    </>
                  )}

                </div>

                <div className="col-lg-4  col-md-6 col-12">
                
                    <div className='flex-end mb-2'>
                      <button disabled={!trackChange} onClick={submitFun}  className='border-0  ms-3 py-2 px-4 fw-semibold rounded-5' style={!trackChange?{color:'white',backgroundColor:"grey"}:{backgroundColor:"black",color:'white',cursor:'pointer'}}>Save</button>
                      <div style={{backgroundColor:'#e2e0e0ff'}} className='text-muted ms-3 py-2 px-4 fw-semibold rounded-5'><HiOutlineDotsVertical className='fs-4 '/></div>



                    </div>
                    <div className='border  rounded' style={{overflow:'hidden',backgroundColor:'#F9F9F9'}}>
                
                     <video style={{width:'100%'}} src={videoData?.url}  key={videoData?.url}   controls={true}  />

                    <div className='ptext text-muted ms-1 ps-2'>Video link</div>
                    <div className='msmall-text text-primary ps-2 ms-1'>{`http://localhost:5173/videos/${videoData?.videoLink}`}</div>
                    <div className='ptext text-muted mt-2 ps-2 ms-1' >Filename</div>
                    <div className='msmall-text ps-2 ms-1'>{videoData?.originalVideoName}</div>
                    <div className='ptext text-muted ps-2 ms-1'>Video quality</div>
                    <div><BsBadgeSd className='fs-3 ps-2 ms-1 pb-2 '/></div>

                  </div>
                

                    <Box  className="mt-4">
    <FormControl sx={{ width: '100%' }}>
  <InputLabel id="demo-simple-select-label" sx={{  "&.Mui-focused": {  color: "#000000",   } }} >Visibility</InputLabel>

<Select onChange={handleChange} value={videoData.visibility} name="visibility" labelId="demo-simple-select-label"  id="demo-simple-select"  label="visibility"
  sx={{
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CCCCCC", 
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000", 
    },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: 300,
        overflowY: "auto",
        borderRadius: "5px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        },
      },
    },
  }}
>

  <MenuItem value="Public">Public</MenuItem>
  <MenuItem value="Unlisted">Unlisted</MenuItem>
  <MenuItem value="Private">Private</MenuItem>


  </Select>
</FormControl>

                    </Box>

                    <div style={{height:'55px'}} className='border rounded-1 mt-3 p-1'>
                      <div className='ptext text-muted '>Restrictions</div>
                      <div>{videoData.forKids?"Made for kids":"None"}</div>
                    </div>


                
                    <div style={{height:'55px'}} className=' border rounded-1 mt-3 p-1'>
                      <div className="container-fluid">

                      <div className="row mt-2">
                        <div className="col  d-flex justify-content-center align-items-center"><MdOutlineSubtitles className='fs-5'/></div>
                        <div className="col-5"><div>Subtitles</div></div>
                        <div className="col">  </div>
                        <div className="col-2 d-flex justify-content-center align-items-center"><FaPen/></div>
                      </div>
                      </div>
                    </div>

                        <div style={{height:'55px'}} className=' border rounded-1 mt-3 p-1'>
                      <div className="container-fluid">

                      <div className="row mt-2">
                        <div className="col  d-flex justify-content-center align-items-center"><MdOutlineSubtitles className='fs-5'/></div>
                        <div className="col-5 "><div >End screen</div></div>
                        <div className="col">  </div>
                        <div className="col d-flex justify-content-center align-items-center"><FaPen/></div>
                      </div>
                      </div>
                    </div>

                                           <div style={{height:'55px'}} className=' border rounded-1 mt-3 p-1'>
                      <div className="container-fluid">

                      <div className="row mt-2">
                        <div className="col  d-flex justify-content-center align-items-center"><MdOutlineSubtitles className='fs-5'/></div>
                        <div className="col-5"><div>Cards</div></div>
                        <div className="col">  </div>
                        <div className="col-2 d-flex justify-content-center align-items-center"><FaPen/></div>
                      </div>
                      </div>
                    </div>



                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
