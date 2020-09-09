import React from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';

export default function URLInputDialog(props) {
  return (
    <Dialog open={props.URLInputDialogOpen} onClose={(e) => this.props.handleDialogStateAction(e, false, "URLInputDialog", null)}>
     <DialogContent>
       <DialogContentText>
         Insira no campo abaixo o link desejado
       </DialogContentText>
       <TextField
         autoFocus
         name="customURL"
         onChange={(e) => props.setCustomURL(e.target.value)}
         margin="dense"
         id="name"
         label="Insira aqui o link"
         type="text"
         fullWidth
       />
     </DialogContent>
     <DialogActions>
       <Button onClick={(e) => this.props.handleDialogStateAction(e, false, "URLInputDialog", null)} color="primary">
         Cancelar
       </Button>
       <Button onClick={(e) => this.props.handleDialogStateAction(e, false, "URLInputDialog", null)} color="primary">
         Incorporar link
       </Button>
     </DialogActions>
   </Dialog>
  )
}
