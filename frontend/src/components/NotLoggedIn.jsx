import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useContext } from "react";
import Axios from "../hooks/Axios";

import { myContext } from "../hooks/ContextApi";
export default function NotLoggedIn() {

   const {dialogOpenWithLogin,setDialogOpenWithLogin} =useContext(myContext);
    const loginFun=async()=>{
     window.location.href = "http://localhost:3000/auth/google";

    }
  return (
    <>
  

      <Dialog open={dialogOpenWithLogin} >
        <DialogTitle>Login Please</DialogTitle>

        <DialogContent>
          <p>Login with google to perform this action</p>
        </DialogContent>
        <DialogActions>
    <Button onClick={loginFun}>Login with Google</Button>
          <Button onClick={() => setDialogOpenWithLogin(false)}>Cancel</Button>
        
        </DialogActions>
      </Dialog>
    </>
  );
}
