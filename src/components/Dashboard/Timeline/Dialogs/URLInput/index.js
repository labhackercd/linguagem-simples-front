import React, {useState} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import  { isURLValid } from './../../../../Util';

export default function URLInputDialog(props) {
	const [validURL, setValidURL] = useState(false)

	function validateStoreURL(e) {
			e.preventDefault()
			props.setCustomURL(e.target.value)
			if(isURLValid(props.customURL)) {
				if(props.customURL.length > 0) {
					setValidURL(true)
				}
			} else {
				setValidURL(false)
			}
	}

  return (
    <Dialog open={props.URLInputDialogOpen} onClose={(e) => props.handleDialogStateAction(e, false, "URLInputDialog", null)}>
     <DialogContent>
       <DialogContentText>
         Insira no campo abaixo o link desejado
       </DialogContentText>
       <TextField
         autoFocus
         name="customURL"
         onChange={(e) => validateStoreURL(e)}
         margin="dense"
         id="name"
         label="Insira aqui o link"
         type="text"
         fullWidth
       />
     </DialogContent>
     <DialogActions>
       <Button onClick={(e) => props.handleDialogStateAction(e, false, "URLInputDialog", null)} color="primary">
         Cancelar
       </Button>
       <Button onClick={(e) => props.handleDialogStateAction(e, false, "URLInputDialog", "previewModalOpen")}
				 			 disabled={validURL ? false : true}
							 color="primary">
         Incorporar link
       </Button>
     </DialogActions>
   </Dialog>
  )
}
