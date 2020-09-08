import React from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import ExitIcon from './../../../../../assets/exit_icon.svg';
import AlertIcon from './../../../../../assets/alert.svg';
import AlertDialogIcon from './../../../../../assets/alert_within_dialog_exit_icon.svg';

const useStyles = makeStyles((theme) => ({
  sessionTitleAlert: {
		backgroundColor: '#00AF82',
		width: '100%',
		borderRadius: '5px',
		color: 'white',
		padding: '0.2rem',
		fontWeight: '600',
		fontSize: '13',
		display: 'flex',
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
  previewModalSubmitButton: {
    color: '#FFF',
    alignSelf: 'flex-end',
    backgroundColor: '#00AF82',
    borderRadius: '0 0 5px 5px'
  },
}))

export default function ImageUploadDialog(props) {
  const classes = useStyles();
  return (
    <Dialog fullWidth={true}
              maxWidth={'sm'}
              PaperProps={{
                  style: {
                    backgroundColor: '#F2F2F2',
                  },
                }}
              open={props.imageUploadModalOpen}
              onClose={(e) => props.openImageDialog(e, false)}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
         <DialogTitle id="form-dialog-title">Nova atualizacao com imagem</DialogTitle>
         <img src={ExitIcon}
              style={{margin: '0 1rem 0 0'}}
              onClick={(e) => props.openImageDialog(e, false)}
              alt="exit" />
       </div>
       <Paper style={{backgroundColor: 'white', padding: '1rem', borderRadius: '15px'}} elevation={0}>
        <DialogContent>
          <Grid style={{display: props.updateTitle ? 'flex' : 'none' }}
                container
                className={classes.sessionTitleAlert}>
            <Grid item md={1} style={{padding: '0.1rem 0 0 0.5rem'}}>
              <img src={AlertIcon} alt="alert"/>
            </Grid>
            <Grid item md={10}>{props.updateTitle}</Grid>
            <Grid item md={1} style={{padding: '0.1rem 0.1rem 0rem 1rem'}}>
              <img src={AlertDialogIcon}
                   onClick={() => props.setUpdateTitle('')}
                   alt="exit" />
            </Grid>
          </Grid>
         <TextField
           id="textfield"
           multiline
           fullWidth={true}
           rows={4}
           bgcolor="white"
           onChange={props.handleChange}
           name="previewModalUpdateText"
           placeholder="Inserir nota"
           elevation={0}
           InputProps={{ disableUnderline: true }}
         />
         <ImageUploader
            withIcon={true}
            onChange={props.onImageDrop}
            imgExtension={[".jpg", ".png", ".jpeg"]}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
            buttonText="Escolher imagens"
            buttonStyles={{backgroundColor: '#00AF82',
                           borderRadius: '5px',
                           fontWeight: '600'}}
            style={{backgroundColor: '#F4F4F4'}}
            label="Tamanho máximo: 5mbs"
            alt="Image upload form"
          />
       </DialogContent>
     </Paper>
     <DialogActions className={classes.previewModalFooter}>
       <Typography className={classes.time} style={{alignSelf: 'flex-start'}} variant="h6">{props.time}</Typography>
       <Button onClick={(e) => props.closeImageDialogSendPayload(e)} className={classes.previewModalSubmitButton} variant="contained">
         Publicar
       </Button>
     </DialogActions>
     </Dialog>
  )
}
