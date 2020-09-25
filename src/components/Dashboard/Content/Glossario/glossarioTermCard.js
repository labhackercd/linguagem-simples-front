import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';



const useStyles = makeStyles((theme) => ({
    body: {
      padding: '1rem',
      height: '100%',
      overflow: 'auto',
    },
    termGlossarioCard:{
      background:'#F4F4F4',
    },
}));

const dialogStyles = (theme) => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(dialogStyles)((props) => {

  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton id="closeButton" aria-label="close" className={classes.closeButton} onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function GlossarioTermCard(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Box width="97%" marginTop={0.5}>   
          <Paper elevation={0} className={classes.termGlossarioCard}>
            <Grid container>
              <ButtonBase onClick={handleOpen} style={{width: "100%", textAlign: "left" }}>
                <Grid item xs={12}>
                    <Box m={1}><Typography style={{ color: "gray" }}>{props.data.termo}</Typography></Box>
                </Grid>
              </ButtonBase>
            </Grid>
          </Paper>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <Paper style={{backgroundColor:"#F2F2F2"}}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography style={{ color: "gray" }}>{props.data.termo}</Typography>
              </DialogTitle>
              <MuiDialogContent style={{paddingTop:"2px"}}>
                <Paper elevation={0}>
                  <Box padding={1} >
                    <Typography gutterBottom variant="body1" align="justify">
                      {props.data.descricao}
                    </Typography>
                  </Box>
                </Paper>
              </MuiDialogContent>
            </Paper>
          </Dialog>
      </Box>
  );
}