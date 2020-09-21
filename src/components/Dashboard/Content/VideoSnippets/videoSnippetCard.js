import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase'
import VideoSnippetModal from './VideoSnippetModal/videoSnippetModal'

export default function SnippetCard(props){
  const deputado = props.data.author;
  const siglaPartidaria = props.data.legend;

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Box width="100%" height="100%" marginX={0.3} marginTop={0.5}>
      <ButtonBase onClick={handleClickOpen} id={"openModal"}>
        <div>
            <img style={{width:"100%", height:"6vh"}} id="image" src={props.data.thumbnail} alt="Thumbanail trecho"></img>
            <Box fontSize={10}>
            <Typography>{deputado}</Typography>
            </Box>
            <Box fontSize={8}>
            <Typography variant="body2">{siglaPartidaria}</Typography>
            </Box>
        </div>
        </ButtonBase>
      <VideoSnippetModal open={open} onClose={handleClose} data={props.data} />
    </Box>
  );
}