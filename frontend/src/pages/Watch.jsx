import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Axios from '../hooks/Axios';
import { useParams } from "react-router-dom";
import { GoShareAndroid } from "react-icons/go";
import { SlLike } from "react-icons/sl";
import WatchNav from '../components/WatchNav';
import List from '@mui/material/List';
import { SlDislike } from "react-icons/sl";
import { Player } from "react-tuby";
import { BsDownload } from "react-icons/bs";
import { useSearchParams } from 'react-router-dom';
import { RiGeminiFill } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "react-tuby/css/main.css";
import { FiAlignJustify } from "react-icons/fi";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function Watch(props) {
  const { videoLink:draftVideoLinkWithPopUp } = useParams();

  
 


  const [videoData,setVideoData]=React.useState({})
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };
  React.useEffect(()=>{
    Axios.post('/get-video-details',{draftVideoLinkWithPopUp})
    .then((res)=>{
      setVideoData(res.data)
    })

  },[draftVideoLinkWithPopUp])


  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Typography variant="h6" className='mt-3'>
        <span onClick={handleToggle}><FiAlignJustify className='fs-3 ms-3 me-3'/></span>
        Youtube
      </Typography>
      <Divider />
      <List>
   <ul>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>
    <li>Abc</li>

   </ul>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
  

      <AppBar  elevation={0} className='bg-light text-dark' position="fixed">
    
 <WatchNav handleToggle={handleToggle}  />
      </AppBar>

  
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleToggle}
        ModalProps={{ keepMounted: true }}  >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
        <Toolbar />
      
          <div className="row"> 
            <div className="col-lg-8 col-md-8 col-12">

          <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
              {videoData.url&&(
                <Player src={videoData?.url}/>
              )}
            </div>
            <div className='mt-2 fw-semibold'>{videoData.title}</div>

         <div className="d-flex justify-content-between align-items-center gap-2">

  <div className="mt-2 d-flex align-items-center gap-2 flex-shrink-1 min-w-0">
    <img
      src={videoData?.owner?.profileImage}
      width={34}
      height={34}
      style={{ borderRadius: "50%" }}
    />

    <span className=" text-truncate" style={{ maxWidth: 120 }}>
      {videoData?.owner?.name}
    </span>

    <button className="btn btn-dark btn-sm rounded-pill px-2">
      Subscribe
    </button>
  </div>

  {/* RIGHT */}
  <div className="d-flex align-items-center gap-1 flex-shrink-1">
    <button className="btn btn-light btn-sm px-2 "><span className='border-end'>99K  <SlLike className='me-2'/> </span> <span className='ms-2'> <SlDislike/>  </span> </button>
    <button className="btn btn-light btn-sm px-2  d-sm-inline"> <GoShareAndroid/> Share</button>
    <button className="btn btn-light btn-sm px-2  d-md-inline"> <RiGeminiFill/> Ask</button>
    <button className="btn btn-light btn-sm px-2 d-none d-lg-inline"> <BsDownload/> Download</button>
    <button className="btn btn-light btn-sm px-2"><HiOutlineDotsHorizontal/></button>
  </div>

</div>


            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit earum similique qui delectus molestias quibusdam sunt numquam tempora, autem asperiores ab sequi ea natus itaque in fugiat blanditiis adipisci doloribus.
            </div>

            </div>
            <div className="col-lg-4 col-md-4 col-12 bg-primary">DEF</div>
          </div>
      
      </Box>
    </Box>
  );
}
