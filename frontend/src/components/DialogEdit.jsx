import React, { useEffect, useState,useRef } from "react";
import { Button, Dialog, DialogTitle, DialogContent, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoUpload } from "react-icons/go";
import Checkbox from '@mui/material/Checkbox';
import Axios from "../hooks/Axios";
import { TbFileUpload } from "react-icons/tb";
import { SlScreenDesktop } from "react-icons/sl";
import { RiFeedbackLine } from "react-icons/ri";

import Box from '@mui/material/Box';
import { MdOutlineSubtitles } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { CiCircleInfo, CiLight } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

import { MdOutlineAutoAwesome } from "react-icons/md";
import { MdOutlineSpeed } from "react-icons/md";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useContext } from "react";
import { IoChevronUp } from "react-icons/io5";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { myContext } from "../hooks/ContextApi";
import '../css/StudioUploadVideo.css'
import "react-tuby/css/main.css";

const steps = ['Details', 'Video elements', 'Checks','Visibility'];


const DialogEdit = () => {

  const kidsSectionRef = useRef(null);
const {setSnackBarMessage, setSnackBarOpen,dialogEditOpen, setDialogEditOpen,draftVideoLinkWithPopUp}=useContext(myContext)
  const [videoData,setVideoData]=useState({title:'',isDraft:true,description:'',category:'',moderation:'',sortBy:'',visibility:'',tags:'',forKids:null,restrictOverEighteen:null,commentStatus:true,showLikeCount:false});

  const [draftSaved,setDraftSaved]=useState(false);
 const [adult,setAdult]=useState(false)
 
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [showMore,setShowMore]=useState(false);
const [errorBorder,setErrorBorder]=useState(false);





const contentRef = useRef(null);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  





useEffect(() => {
  if (activeStep === 0 && errorBorder && kidsSectionRef.current) {
    kidsSectionRef.current.scrollIntoView({ 
      behavior: 'smooth', 
    });
  }
}, [activeStep, errorBorder]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


 


  const copyFun=()=>{
    const copiedLink=`https://localhost:5173/videos/${videoData.videoLink}`;
    console.log(videoData)
    navigator.clipboard.writeText(copiedLink)
    .then((res)=>{

      setSnackBarMessage("Link copy to clipboard");
     setSnackBarOpen(true);
    })
    .catch((err)=>{
        console.log(err.messgae)
      })


  }

 
useEffect(() => {
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);
 
  const handleChange=(e)=>{
    setVideoData((prev)=>{
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }
  
useEffect(()=>{
  Axios.post('/get-draft-data',{draftVideoLinkWithPopUp})
  .then((res)=>{
    setVideoData(prev=>({...prev,...res.data,tags:res.data.tags.join(',')}))
  })
  .catch((err)=>{
        console.log(err.messgae)
  })
},[draftVideoLinkWithPopUp])


useEffect(() => {
  
    setDraftSaved(false);
  const timer = setTimeout(() => {
   const { commentStatus,tags, ...rest } = videoData;
  const combinedData = {...rest,tagsString: tags,comments:commentStatus};
    Axios.post("/saving-video", combinedData)
      .then((res) => {
      setDraftSaved(true);
      console.log(res.data)
      })
      .catch((err)=>{
        console.log(err.messgae)
      })
  }, 3000);
  return () => clearTimeout(timer); 
}, [videoData]);

  



  const handleDialogClose=()=>{
  setDialogEditOpen(false);
    setVideoData(prev=>({...prev,isDraft:true}))
    setSnackBarMessage(`Your video ${videoData.title} has been saved as draft`);
    setSnackBarOpen(true);
  }


  const submitReq=()=>{
   if (videoData.forKids==null) {
    setErrorBorder(true);
    setActiveStep(0);
     setSnackBarMessage("Please select whether this content is intended for kids.");
     setSnackBarOpen(true);
     return 
  
  }


  if(videoData.visibility==""){
        setErrorBorder(true);
        setSnackBarMessage("Please select video category");
     setSnackBarOpen(true);
     return 
  }
  
 
     setVideoData(prev=>({...prev,isDraft:false}))
    setDialogEditOpen(false);
  if(videoData.visibility=="Private"){
      setSnackBarMessage("Video is visible to you");

     setSnackBarOpen(true);

     return 
  }

  if(videoData.visibility=="Public"){
       setSnackBarMessage("Video Publish successfully");
     setSnackBarOpen(true);
     
     return 
  }
  
  if(videoData.visibility=="Unlisted"){
       setSnackBarMessage("Video Publish successfully, only visible by Link");
     setSnackBarOpen(true);
     
     return 
  }
  }


  return (
  <>
 
 

   <Dialog ref={contentRef} disableEnforceFocus={true}   open={dialogEditOpen}  sx={{"& .MuiDialog-paper": { height: "600px",borderRadius:'20px'}}}  fullWidth maxWidth="md"  >
        <DialogTitle className="mt-2" sx={{ position: 'relative', paddingRight: '40px' }}>

  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem',
      width: '100%',
    }}
  >
    <div style={{ flex: '1 1 auto', minWidth: '120px', fontWeight: 600 }}>
      Upload Videos
    </div>


  <div
    style={{flex: '0 0 auto',backgroundColor: '#f8f9fa',textAlign: 'center',padding: '4px 8px',borderRadius: '8px',fontSize: '0.8rem',fontWeight: 600,whiteSpace: 'nowrap',}}> {draftSaved ? 'Saved as Private' : 'Saving...'}
  </div>

<div style={{ flex: '0 0 auto' }}>
  <RiFeedbackLine size={20} />
</div>


  </div>

<IconButton onClick={handleDialogClose} sx={{position: 'absolute',right: 8,top: 21,padding: 0,}}>

<CloseIcon />

  </IconButton>
</DialogTitle>

       
         
             
          
           
           <Stepper  className=" mx-auto stepper  " style={{width:'96%'}}  activeStep={activeStep}
  sx={{
    borderBottom: "none", 
    "& .MuiStepIcon-root": {
      color: "#CCCCCC",
    },
    "& .MuiStepIcon-root.Mui-active": {
      color: "#000000",
    },
    "& .MuiStepIcon-root.Mui-completed": {
      color: "#000000" } }}>

  {steps.map((label, index) => {
    const stepProps = {};
    const labelProps = {};

    if (isStepSkipped(index)) {
      stepProps.completed = false;
    }
    return (
      <Step key={label} {...stepProps}>
        <StepLabel {...labelProps}>{label}</StepLabel>
      </Step>
    );
  })}
</Stepper>



           
              
            <DialogContent  ref={contentRef} className="small-width-div p-4" style={{overflow:'hidden'}} >
              
                <Box  sx={{ width: '100%' }}>
    
  
     



              {activeStep+1==1&&(
                <div className="">
                <div className="mt-3" >
             
               <div className="row studio-scroll" style={{height:'50vh',overflowY:'auto'}}>
                <div className="col-lg-7 col-12  studio-details-left-div">

               <div className=" d-flex justify-content-between align-items-center">
                <div className="large-text">Details</div>

                <div className="border pt-1 pb-1 ps-2 pe-2 rounded-4" style={{backgroundColor:'#E5E5E5'}}><span onClick={()=>console.log(videoData)}  className="fw-semibold">Reuse Details</span></div>
               </div>



                <div className="border mt-2 p-1 rounded-2 bg-white">
                  <div className="xsmall-text text-muted fw-semibold">title required</div>
             <textarea  name="title" onChange={(e)=>setVideoData(prev=>({...prev,title:e.target.value}))} value={videoData.title}  className=" textarea w-100 border-0" style={{resize:'none'}} id=""></textarea>
                </div>


            <div className="border p-1 mt-2 rounded-2 bg-white">
                  <div className="xsmall-text text-muted fw-semibold">description</div>
             <textarea value={videoData.description} name="description" onChange={handleChange} placeholder="Tell viewers about your video"  className=" textarea w-100 border-0" style={{resize:'none'}} id=""></textarea>
                </div>

                <div className="studio-thumbnail">
                  <div className="fw-semibold mt-4">Thumbnail</div>
                <div className="fs-6 text-muted">Set a thumbnail that stands out and draws viewers' attention. Learn more</div>  

                <div className="container mt-3">
                <div className="row">




                  <div className="col  me-3 border-dotted px-2 py-5" style={{cursor:'pointer'}} >
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


                    <div className="col  me-3 border-dotted px-2 py-5" style={{cursor:'pointer'}} >
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



                  <div className="col  me-3 border-dotted px-2 py-5" style={{cursor:'pointer'}}>
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


                 </div>



                <div className="fw-semibold mt-3 mb-2">Audience</div>
                <div className="msmall-text fw-semibold">Is this video Made for Kids? (required)</div>
                <div className="msmall-text text-muted">
                  Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are 'Made for Kids'. <span className="text-primary"> What is 'Made for Kids' content?</span>
                </div>


                <div className="d-flex mt-2 rounded-2 py-1 border" style={{backgroundColor:'#f9f9f9'}}>
                  <div className=" ">
                  <CiCircleInfo className="fs-1 mt-2 me-1 " />
                  </div>
                  <div className="rounded-2 text-muted " style={{fontSize:"13px"}}>


                  Features like personalised ads and notifications won't be available on videos that are Made for Kids. Videos that are set as Made for Kids by you are more likely to be recommended alongside other children's videos. Learn more
                  </div>
                </div>

                <div ref={kidsSectionRef} id="kids-category" className={`mt-3 ${errorBorder?"red-border":'border'} p-2 rounded  mb-3`}>
                  <div className="fw-semibold d-flex align-items-center"><input checked={videoData.forKids} type="radio" name="forKids" id="radioOne"
                 onChange={() => {setVideoData(prev => ({...prev,forKids: true,restrictOverEighteen: null }));setErrorBorder(false);}}
                    
                    
                    className="custom-radio"  /><label htmlFor="radioOne">Yes, it's Made for Kids</label></div>
                  <div className="fw-semibold d-flex align-items-center"><input checked={videoData.forKids==false} type="radio" name="forKids" id="radioTwo" onChange={()=>setVideoData(prev=>({...prev,forKids:false}))} className="custom-radio" /><label htmlFor="radioTwo">No, it's not 'Made for Kids'
                    </label></div>


                </div>
              <div>
   <div className="upload-accordian">

                <div className="fw-semibold mb-2" style={{cursor:'pointer'}} onClick={()=>setAdult(!adult)}><span>
                  {!adult&&(

                  <IoChevronDown className="fs-4"/>
                  )}
                  {adult&&(
                    <IoChevronUp  className="fs-4"/>

                  )}
                </span ><span className="ms-3">Age restriction (advanced)</span></div>
                {adult&&(
                  <>
                  <div className="mb-2">
                  <div className='fw-semibold' style={{fontSize:'13px'}}>Do you want to restrict your video to an adult audience?</div>
              <div className="text-muted" style={{fontSize:'13px'}}>Age-restricted videos are not shown in certain areas of YouTube. These videos may have limited or no ads monetisation. <span className="text-primary">Learn more</span></div>
                 
                  </div>


    <div className="mt-3 mb-3">
                  <div className="fw-semibold d-flex align-items-center"><input type="radio" checked={videoData.restrictOverEighteen} name="restrictOverEighteen"  id="radioOnea" onChange={()=>setVideoData(prev=>({...prev,restrictOverEighteen:true}))} disabled={videoData.forKids || videoData.forKids==null}  className="custom-radio"    /><label   className={`${videoData.forKids || videoData.forKids==null?"text-muted":""}`}  htmlFor="radioOnea">Yes, restrict my video to viewers over 18</label></div>
                  <div className="fw-semibold d-flex align-items-center"><input type="radio" checked={videoData.restrictOverEighteen==false} name="restrictOverEighteen" id="radioTwob" onChange={()=>setVideoData(prev=>({...prev,restrictOverEighteen:false}))} disabled={videoData.forKids || videoData.forKids==null} className="custom-radio" /><label className={`${videoData.forKids|| videoData.forKids==null?"text-muted":""}`} htmlFor="radioTwob">No, don't restrict my video to viewers over 18 only                 </label></div>


                </div>
                  </>
                  
                )}

   </div>
     
    </div>       

{!showMore&&(
<>
    <button className="border-0 rounded-4 py-1 px-2 mb-2 mt-2" onClick={()=>setShowMore(true)}><span className="fw-semibold" style={{fontSize:'14px'}}>Show more</span></button>   
    <div className="text-muted msmall-text">Paid promotion, collaboration, subtitles and more</div>      
</>
)}


{showMore&&(
<>
          
<button className="border-0 rounded-4 py-1 px-2 mb-2 mt-2 fw-semibold " style={{fontSize:'14px'}} onClick={()=>setShowMore(false)}>Show less</button>
</>
)}


        {showMore&&(
          <>


          <div className="fw-semibold mt-2" >Tags</div>
          <div className="text-muted msmall-text"> Tags can be useful if content in your video is commonly misspelt. Otherwise, tags play a minimal role in helping viewers to find your video. <span className="text-primary">Learn more</span></div>
          <div className="mt-2">
          <input className="w-100 rounded-2 border p-2" placeholder="Add tag" type="text" name="tags" value={videoData?.tags}  onChange={handleChange} />

          </div>
          <div className="text-muted msmall-text">Enter a comma after each tag</div>






          <div className="mt-4 fw-semibold">Category</div>
          <div className="text-muted msmall-text">Add your video to a category so that viewers can find it more easily</div>
          <Box  className="mt-2">
    <FormControl sx={{ width: '45%' }}>
  <InputLabel id="demo-simple-select-label" sx={{
      "&.Mui-focused": {
        color: "#000000", 
      },
    }}

   
  >Category</InputLabel>

<Select
 value={videoData.category} 
name="category"
onChange={handleChange}
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Category"
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


    <div className="mt-4 fw-semibold">Comments and ratings</div>
  <div className="text-muted msmall-text">Choose if and how you want to show comments</div>
     

    <div className="row mt-3">
      <div className="col ">
          <Box  >
    <FormControl sx={{ width: '95%' }}>
  <InputLabel id="demo-simple-select-label"  sx={{
      "&.Mui-focused": {
        color: "#000000", 
      },
    }}
  >Comments</InputLabel>

<Select 
 value={videoData.commentStatus} 

onChange={handleChange}
name="commentStatus"

  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Comments"
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
  >

    <MenuItem value={true} >On</MenuItem>
    <MenuItem value={false}>Off</MenuItem>
  </Select>
</FormControl>

    </Box>
      </div>
      <div className="col">
                 <Box  >
    <FormControl sx={{ width: '95%' }}>
  <InputLabel id="demo-simple-select-label"  sx={{
      "&.Mui-focused": {
        color: "#000000", 
      },
    }}
  >Moderation</InputLabel>

<Select 
value={videoData.moderation}
onChange={handleChange}
name="moderation"


  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Moderation"
   sx={{
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#CCCCCC", // default border
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000", // hover border
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000", // border when clicked/focused
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
                       <Box  >
    <FormControl className="mt-3" sx={{ width: '45%' }}>
  <InputLabel id="demo-simple-select-label"  sx={{
      "&.Mui-focused": {
        color: "#000000", 
      },
    }}
  >Sort by</InputLabel>

<Select 
onChange={handleChange}
name="sortBy"
value={videoData.sortBy}

  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Sort by"
   sx={{
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#CCCCCC", // default border
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000", // hover border
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000", // border when clicked/focused
      },
    }}
  >
    <MenuItem value="top">Top</MenuItem>
    <MenuItem value="newset">Newest</MenuItem>
 
  </Select>
</FormControl>

    </Box>

    <div className="d-flex fw-semibold"> 
      <div>

     <Checkbox
     checked={videoData.showLikeCount}

     onChange={(e)=>setVideoData(prev=>({...prev,showLikeCount:e.target.checked}))}
  id="showViewersLikeTheVideo"
  sx={{
    "&.Mui-checked": {
      color: "#000000ff",
    },
  }}
/>
      </div>
<div className="d-flex justify-content-center align-items-center">
    <label htmlFor="showViewersLikeTheVideo" >Show how many viewers like this video</label>

</div>
    </div>
          </>

        )}
                </div>


               

                <div className="col-lg-5  studio-details-right-div">

             
           

              <div>
               <div className="scroll-video-box">
                <div className="">
                  
                  
                  <div  style={{width:'90%',borderTopLeftRadius:'10px',overflow:'hidden',borderTopRightRadius:'10px'}}>

                  <video  controls muted style={{width:'100%'}} src={videoData.url}  />
          
                  </div>
       
                  
                  
                 
                  </div>
                <div className="">

                 
                  <div className="p-2" style={{width:'90%',backgroundColor:'#f9f9f9',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                  <div className="d-flex justify-content-between">
                    <div>
                         <div className="text-muted fw-semibold xsmall-text">video link</div>
                       <div className="text-primary" style={{fontSize:'14px'}} >{`https://localhost:5173/videos/${videoData.videoLink}`}</div>
                   
                    </div>
                    <div className="copy-div d-flex justify-content-center align-items-center">  <FaRegCopy  onClick={copyFun} style={{cursor:'pointer'}} className="fs-4 copy-div"/></div>
                  </div>
                  
                  <div className="text-muted fw-semibold xsmall-text mt-1">Filename</div>
                    <div className="fw-semibold" style={{fontSize:'14px'}}>{videoData.originalVideoName||`lorem ispum`}</div>

                   </div>


                </div>
               </div>
              </div>



                </div>

               </div>
                
                </div>
                </div>
              )}



        {/* Step number 2 */}

               {activeStep+1==2&&(
                 <div className=" mt-3 p-2 studio-scroll" style={{height:'300px',overflowY:'scroll'}}>
                <div className="medium-text fw-semibold">Video elements</div>
                <div className="msmall-text">Use cards and an end screen to show viewers related videos, websites and calls to action. <span className="text-primary">Learn more</span> </div>
                <div className="container">
                  <div className="row  border p-4 mt-2  rounded-2 mb-2 ">
                  <div className="col-2  d-flex justify-content-center align-items-center"><MdOutlineSubtitles style={{fontSize:'27px'}}/></div>
                  <div className="col ">
                    <div className="fw-semibold">Add subtitles</div>
                    <div className="msmall-text text-muted">Reach a border audience by adding subtitles to your video</div>

                    </div>
                  <div className="fw-semibold col-2 d-flex justify-content-center align-items-center">
                    <div>Add</div>
                  </div>


                </div>


                    <div className="row border p-4 mt-2  rounded-2 mb-2 ">
                  <div className="col-2  d-flex justify-content-center align-items-center"><SlScreenDesktop style={{fontSize:'27px'}}/></div>
                  <div className="col ">
                    <div className="fw-semibold">Add an end screen</div>
                    <div className="msmall-text text-muted">Promote related content at the end of your video</div>

                    </div>
                  <div className="fw-semibold col-2 d-flex justify-content-center align-items-center">
                    <div>Add</div>
                  </div>


                </div>

                
                    <div className="row border p-4 mt-2  rounded-2 mb-2 ">
                  <div className="col-2  d-flex justify-content-center align-items-center"><CiCircleInfo style={{fontSize:'27px'}}/></div>
                  <div className="col ">
                    <div className="fw-semibold">Add cards</div>
                    <div className="msmall-text text-muted">Promote related content during your video</div>

                    </div>
                  <div className="fw-semibold col-2 d-flex justify-content-center align-items-center">
                    <div>Add</div>
                  </div>


                </div>

              

                </div>
                </div>
              )}



               {activeStep+1==3&&(
                <div className=" mt-3" style={{height:'300px'}}>
                <div className="fw-semibold medium-text">Checks</div>
                <div className="msmall-text">We'll check your video for issues that may restrict its visibility and then you will have the opportunity to fix issues before publishing your video. <span className="text-primary">Learn more</span></div>
                <div className="row mt-3">
                  <div className="col"><span className="fw-semibold">Copyright </span><br /> no issues found </div>
                  <div className="col-3  d-flex justify-content-center align-items-center"><div><TiTick className="fs-2 text-success"/></div></div>
                </div>


                <div className="row mt-5">
                  <div className="col msmall-text text-muted">Remember: These check results aren't final. Issues may come up in the future that impact your video. <span className="text-primary">Learn more</span></div>
                  <div className="col-3 msmall-text d-flex justify-content-center align-items-center"><div>send feedback</div></div>
                </div>
                </div>
              )}


        

                 {activeStep+1==4&&(
        
                <div className="" >
                  
                  <div className="fw-semibold medium-text ">Visibility</div>
                

             
               <div className="row studio-scroll  " style={{height:'45vh',overflowY:'auto'}}>
         

                  <div className="col-lg-7 mb-3 col-12  studio-scroll studio-details-left-div" >
                    <div className="">
                      <div className={`${errorBorder?"red-border":"border"} p-2 mt-2 rounded-2`}>
                      <div className="fw-semibold">Save or publish</div>
                      <div className="mb-2">Make your video <span className="text-muted fw-semibold">public</span>, <span className="text-muted fw-semibold">unlisted</span> or <span className="text-muted fw-semibold">private</span></div>


                      <div className="d-flex mt-2">
                        <div className=" d-flex align-items-center">
                        <div>

                        <input checked={videoData.visibility=="Private"} onChange={(e)=>{setVideoData(prev=>({...prev,visibility:'Private'})); setErrorBorder(false)}} type="radio" name="visibility" id='private' className="custom-radio" style={{marginTop:'45%',marginLeft:'12%'}}  />

                        </div>
                    
                        </div>
                        <div className="ms-3">
                        <label  htmlFor="private">Private <br /> <span className="text-muted">only you and people who you choose can watch your video</span> </label>
                        </div>
                      </div>





                        <div className="d-flex mt-2">
                        <div className="d-flex align-items-center">
                        <div>

                        <input checked={videoData.visibility=="Unlisted"} type="radio" name="visibility" onChange={(e)=>{setVideoData(prev=>({...prev,visibility:'Unlisted'}));setErrorBorder(false)}} className="custom-radio" style={{marginTop:'45%',marginLeft:'12%'}} id="Unlisted" />

                        </div>
                    
                        </div>
                        <div className="ms-3 ">
                        <label htmlFor="Unlisted">Unlisted <br /> <span className="text-muted">Anyone with the video link can watch your video </span></label>
                        </div>
                      </div>



                        <div className="d-flex mt-2">
                        <div className="d-flex align-items-center">
                        <div>

                        <input type="radio" name="visibility" onChange={(e)=>{setVideoData(prev=>({...prev,visibility:'Public'}));setErrorBorder(false)}} checked={videoData.visibility=="Public"} className="custom-radio" style={{marginTop:'45%',marginLeft:'12%'}} id="public" />

                        </div>
                    
                        </div>
                        <div className="ms-3">
                        <label htmlFor="public">Public <br /> <span className="text-muted">Everyone can watch your video</span> </label>
                        </div>
                      </div>



                    </div>

                    <div className="medium-text fw-semibold mt-4 mb-2">Before you publish, check the following:</div>
                    <div className="fw-semibold mb-2">Do children appear in this video?</div>
                    <div className="text-muted msmall-text">Make sure that you follow our policies to protect minors from harm, exploitation, bullying and violations of employment law. Learn more</div>
                  <div className="mt-3 mb-2 fw-semibold">Looking for overall content guidance?</div>
                  <div className="text-muted msmall-text">Our Community Guidelines can help you to avoid trouble and ensure that YouTube remains a safe community.</div>
                    </div>
                  </div>
               

                <div className="col-lg-5  studio-details-right-div">

             
                

              <div>
               <div className="scroll-video-box">
                <div className="">
                  
                  
                  <div   style={{width:'90%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',overflow:'hidden'}}>

                   <video  controls muted style={{width:'100%'}} src={videoData.url}  />
                  </div>
                  
                  
                  
                  </div>
                <div className="">

                 
                  <div className="p-2" style={{width:'90%',backgroundColor:'#f9f9f9',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
                  <div className="d-flex justify-content-between">
                    <div>
                         <div className="text-muted fw-semibold xsmall-text">video link</div>
                       <div className="text-primary" style={{fontSize:'14px'}} >{`https://localhost:5173/videos/${videoData.videoLink}`}</div>
                   
                    </div>
                    <div className="copy-div d-flex justify-content-center align-items-center">  <FaRegCopy  onClick={copyFun} style={{cursor:'pointer'}} className="fs-4 copy-div"/></div>
                  </div>
                  
                  <div className="text-muted fw-semibold mt-1 xsmall-text">Filename</div>
                    <div className="fw-semibold" style={{fontSize:'14px'}}>{videoData.originalVideoName}</div>

                   </div>


                </div>
               </div>
              </div>


                </div>

               </div>
                
                </div>
              
              )}



             

                </Box>
              
              </DialogContent> 
           
               <React.Fragment>


              
          <Box sx={{ display:'flex',justifyContent:'flex-end',  p: 2 }}>
            <Button className="me-2"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{backgroundColor:'#ECECEC' }} >
             <span className="text-dark"> Back</span>
            </Button>
          
          
            <Button onClick={activeStep === steps.length - 1 ?()=>submitReq() : handleNext}    className="text-dark bg-dark text-white">
          {activeStep === steps.length - 1 ? ( <span >Finish</span>  ) : (<span>Next</span> )}
          </Button>



          </Box>
          


        </React.Fragment>
        </Dialog>
 




        
   </>
  );
};

export default DialogEdit;
