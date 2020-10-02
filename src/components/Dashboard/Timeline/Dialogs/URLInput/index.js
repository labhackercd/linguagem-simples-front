import React, {useState} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import  { isURLValid } from './../../../../Util';

export default function URLInputDialog(props) {
	const [validURL, setValidURL] = useState(false)
	const [urlInput, setURLInput] = useState('')
	const [standardProtocol] = useState('https://')

	function handlePaste(e) {
		e.preventDefault()
		e.target.value = e.clipboardData.getData('Text')
		validateStoreURL(e)
	}

	function validateStoreURL(e) {
			e.preventDefault()
			let inputURL = e.target.value
			if(inputURL.length > 0) {
				if(!(inputURL.indexOf("http://") == 0 || inputURL.indexOf("https://") == 0)) {
					e.target.value = standardProtocol + inputURL
				}
				if(isURLValid(e.target.value)) {
						props.setCustomURL(e.target.value)
						setValidURL(true)
				} else {
					setValidURL(false)
				}
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
				 onPaste={(e) => handlePaste(e)}
         onChange={(e) => validateStoreURL(e)}
         margin="dense"
         id="url-input"
         label="Insira aqui o link"
         type="text"
         fullWidth
       />
     </DialogContent>
     <DialogActions>
       <Button onClick={(e) => props.handleDialogStateAction(e, false, "URLInputDialog", null)}
			 				 color="primary"
							 style={{textTransform: 'capitalize'}}
							 id="cancel-button">
         Cancelar
       </Button>
       <Button onClick={(e) => props.handleDialogStateAction(e, false, "URLInputDialog", "previewModalOpen")}
				 			 disabled={validURL ? false : true}
							 style={{textTransform: 'capitalize'}}
							 color="primary"
							 id="submit-button">
         Incorporar link
       </Button>
     </DialogActions>
   </Dialog>
  )
}
