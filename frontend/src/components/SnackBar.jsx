import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { myContext } from "../hooks/ContextApi";
import { useContext } from "react";

function SnackBar() {
const {snackBaropen, setSnackBarOpen,snackBarMessage}=useContext(myContext)

   const handleClose = () => setSnackBarOpen(false);

  return (
    <div>
     

      <Snackbar
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBaropen}
        autoHideDuration={3000}
        onClose={handleClose}
         message={snackBarMessage}
      />
    </div>
  );
}

export default SnackBar;
