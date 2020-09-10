import React, {useState} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';

export default function TwitterDialog(props) {

  return (
    <Dialog open={props.twitterDialogOpen} onClose={props.handleTwitterDialogClose}>
     <DialogContent>
       <DialogContentText>
         Insira no campo abaixo o link para o tweet desejado
       </DialogContentText>
       <TextField
         autoFocus
         name="tweetURL"
         onChange={(e) => props.setTweetURL(e.target.value)}
         margin="dense"
         id="name"
         label="Link para o tweet"
         type="text"
         fullWidth
       />
     </DialogContent>
     <DialogActions>
       <Button onClick={props.handleTwitterDialogClose} color="primary">
         Cancelar
       </Button>
       <Button onClick={props.handleTwitterDialogClose} color="primary">
         Incorporar tweet
       </Button>
     </DialogActions>
   </Dialog>
  )
}
