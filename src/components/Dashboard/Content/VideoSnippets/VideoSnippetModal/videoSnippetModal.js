import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import getSnippetVideoFromUrl from './fetchVideoSnippetFile'

const dialogStyles = (theme) => ({
    root: {
      margin: 0,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  });

const DialogTitle = withStyles(dialogStyles)((props) => {

    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} size="small" id="closeVideoSnippetModal">
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });


export default function VideoSnippetModal(props){
  const { onClose, open } = props;
  const [fullWidth, ] = useState(true);
  const [maxWidth, ] = useState('md');
  const [videoUrl, setVideoUrl] = useState("");


  async function getVideoSnippet(){
      const videoFile = await getSnippetVideoFromUrl(props.data.url)
      setVideoUrl(videoFile)
  }

  useEffect(() => {
    getVideoSnippet();
  }, []);

  const handleClose = () => {
    onClose();
  };

  //console.log(props.data)
    return (  
            <Dialog fullWidth={fullWidth}  maxWidth={maxWidth} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
              <Paper>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  <Typography style={{ color: "gray" }}>Trecho da Transmissão</Typography>
                </DialogTitle>
                <MuiDialogContent style={{paddingTop:"2px"}}>
                    <div id="snippetVideo" className="video" style={{align:"center"}}>
                        <iframe
                            style={{
                            width: "100%",
                            height: "500px"
                            }}
                            src={videoUrl}
                            title="Trecho da Sessão Plenária"
                        />
                    </div>
                    <Typography variant="h4">{props.data.author}({props.data.legend}) - {props.data.schedule}</Typography>
                </MuiDialogContent>
              </Paper>
            </Dialog>
    );
  }