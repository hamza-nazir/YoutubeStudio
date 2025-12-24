import { FaArrowLeftLong } from "react-icons/fa6"
import { IoSettingsOutline } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { FaRegChartBar } from "react-icons/fa"
import { FaRegCopyright } from "react-icons/fa6";
import { MdOutlineFeedback } from "react-icons/md";

import { LuScissors } from "react-icons/lu";

import { MdOutlineSubtitles } from "react-icons/md";
import { MdMovieEdit } from "react-icons/md";
import '../css/EditVideoLeftAside.css'
import { useState } from "react";


export function formatDuration(seconds) {
  if (!seconds) return "0:00";

  const total = Math.floor(seconds);

  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}


const EditVideoLeftAside = ({ data }) => {
  const { videoData, studioDisplayAsideShort } = data


  return (
    <>
      <div className={`d-flex align-items-center mt-3 mb-3 ${studioDisplayAsideShort ? "justify-content-center" : ""}`}>
        <div className={`me-4 d-flex`}><FaArrowLeftLong /></div>
        {!studioDisplayAsideShort && (

          <div className='msmall-text fw-semibold'>Channel content</div>
        )}
      </div>


      <div className="edit-video-wrapper ">
        <div className="" style={{ position: 'relative' }}>
          <video src={videoData.url} style={{ width: '95%', borderRadius: '10px', overflow: 'hidden' }}  />
        {!studioDisplayAsideShort&&(
          <span className="ptext" style={{ position: 'absolute', right: '25px',bottom:'10px',backgroundColor:'#2a2a2abd',color:'white',padding:'1px 4px', borderRadius:'5px',boxSizing:'border-box' }}> 
          {formatDuration(videoData.duration)}
          </span>

        )}

        </div>

        {!studioDisplayAsideShort && (
          <>
            <div className='msmall-text' style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {videoData.title}
            </div>
            <div className='text-muted xsmall-text'>{videoData?.originalVideoName?.slice(0, 21)}</div>
          </>
        )}
      </div>



      <div className='mt-2 edit-video-scroller border-bottom' style={studioDisplayAsideShort ? { overflowY: 'scroll', overflowX: 'hidden', height: '270px' } : { overflowY: 'scroll', overflowX: 'hidden', height: '200px' }}>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}> <FaPen className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />    {!studioDisplayAsideShort && (<>Details</>)}  </div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}><FaRegChartBar className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />{!studioDisplayAsideShort && (<> Analytics</>)}</div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}> <MdMovieEdit className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />  {!studioDisplayAsideShort && (<>Editor</>)}  </div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}><LiaCommentSolid className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} /> {!studioDisplayAsideShort && (<>Comments</>)}  </div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}> <MdOutlineSubtitles className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />  {!studioDisplayAsideShort && (<>Subtitles</>)}  </div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}> <FaRegCopyright className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />  {!studioDisplayAsideShort && (<>Copyright</>)}  </div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}> <LuScissors className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />  {!studioDisplayAsideShort && (<>Clips</>)}  </div>

      </div>


      <div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}> <IoSettingsOutline className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />  {!studioDisplayAsideShort && (<>Setting</>)}  </div>
        <div className={`mt-3 ${studioDisplayAsideShort && "text-center"}`}>  <MdOutlineFeedback className={`fs-5 me-3 ${studioDisplayAsideShort && "fs-3"}`} />  {!studioDisplayAsideShort && (<>Feedback</>)}  </div>
      </div>
    </>


  )
}

export default EditVideoLeftAside
