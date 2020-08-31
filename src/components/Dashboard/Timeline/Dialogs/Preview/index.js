import React from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TwitterTweetEmbed} from 'react-twitter-embed';

const useStyles = makeStyles((theme) => ({
  previewModalSubmitButton: {
    color: '#FFF',
    alignSelf: 'flex-end',
    backgroundColor: '#00AF82',
    borderRadius: '0 0 5px 5px'
  },
  previewModalFooter: {
    padding: '0',
    margin: '0 0 0 1rem',
    display: 'flex',
    justifyContent: 'space-between'
  },
  time: {
    color: theme.palette.primary.main
  },
}))

export default function PreviewDialog(props) {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{
        style: {
          backgroundColor: '#F2F2F2',
        },
      }}
      open={props.previewModalOpen}
      onClose={props.handlePreviewModalClose}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
         <DialogTitle id="form-dialog-title">Nova atualizacao do Twitter</DialogTitle>
         <img src="../../img/exit_icon.svg"
              style={{margin: '0 1rem 0 0'}}
              onClick={() => props.setPreviewModalOpen(false)}
              alt="exit" />
       </div>
       <Paper style={{backgroundColor: 'white', padding: '1rem', borderRadius: '15px'}} elevation={0}>
       <DialogContent className={classes.previewModal}>
           <TextField
             id="textfield"
             multiline
             rows={4}
             bgcolor="white"
             name="previewModalUpdateText"
             placeholder={"Inserir nota"}
             onChange = {props.handleChange}
             elevation={0}
             InputProps={{ disableUnderline: true }}
             style={{width: '100%'}}
           />
           <TwitterTweetEmbed
            style={{alignSelf: 'center'}}
            tweetId={props.tweetID}
          />
       </DialogContent>
     </Paper>
       <DialogActions className={classes.previewModalFooter}>
         <Typography className={classes.time} style={{alignSelf: 'flex-start'}} variant="h6"> {props.time} </Typography>
         <Button onClick={props.handlePreviewModalClose} variant="contained" className={classes.previewModalSubmitButton}>
           Publicar
         </Button>
       </DialogActions>
     </Dialog>
  )
}
