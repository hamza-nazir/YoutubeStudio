import { createContext, useEffect } from "react"
import { useState } from "react";
export const myContext = createContext();
import SnackBar from "../components/SnackBar"; // <-- add import

import Axios from "./Axios";

const ContextApi = ({children}) => {
  const [currentUser,setCurrentUser]=useState({});
  const [snackBaropen, setSnackBarOpen] = useState(false);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [draftVideoLinkWithPopUp,setDraftVideoLinkWithPopUp]=useState("")
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [homeAside,setHomeAside]=useState(false);
  const [studioActiveLink,setStudioActiveLink]=useState('dashboard');
  const [dialogOpen,setDialogOpen]=useState(false);
  const [result,setResult]=useState([]);
  const [search,setSearch]=useState("");
  const [dialogOpenWithLogin,setDialogOpenWithLogin]=useState(false);
  const [studioDisplayAsideShort,setStudioDiplayAsideShort]=useState(false);
  useEffect(()=>{
    
    Axios.get('/user')
    .then((res)=>{
      if(res.data._id){
        setCurrentUser(res.data)
      }else{
        setCurrentUser({})
      }
    })

},[]) 
   return (
    <myContext.Provider value={{search,setSearch,result,setResult,draftVideoLinkWithPopUp,setDraftVideoLinkWithPopUp,dialogEditOpen, setDialogEditOpen,snackBarMessage, setSnackBarMessage,snackBaropen, setSnackBarOpen,dialogOpen,setDialogOpen,studioActiveLink,setStudioActiveLink,currentUser,studioDisplayAsideShort,setStudioDiplayAsideShort,homeAside,setHomeAside,dialogOpenWithLogin,setDialogOpenWithLogin} }>
    <div>{children}</div>
       <SnackBar />
    </myContext.Provider>
  )
}

export default ContextApi