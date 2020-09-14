import React from 'react'
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DividerIcon from './../../../../assets/divider.svg';
import PictureUploadIcon from './../../../../assets/picture_upload.svg';
import TwitterIcon from './../../../../assets/twitter_icon.svg';

const useStyles = makeStyles((theme) => ({
	summaryBox: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	summaryHeader: {
  	display: 'flex',
		margin: '1rem 0 1rem 0',
  },
  textArea: {
    height: '100%',
    margin: '0rem 0 0 0',
    width: '100%',
    border: '0',
  },
  textField: {
		margin: '0 1rem 0 0',
		height: '100%',
		width: '100%',
	},
  submenu: {
    display: 'flex',
  },
  subMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 0.5rem 0 1rem',
  },
  button: {
    height: '70%',
    alignSelf: 'flex-end',
  },
  notchedOutline: {
    border: '2px solid #F2F2F2',
    borderWidthBottom: '0px',
    color: theme.palette.secondary,
    borderRadius: '0 0 0 0',
  },
  time: {
    color: theme.palette.primary.main
  },
}))
export default function NewUpdate(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.summaryBox}>
      <Grid container className={classes.summaryHeader}>
        <Grid item md={6} style={{display:'flex', justifyContent: 'flex-start'}}>
          <Typography variant="h5"> Nova atualização </Typography>
        </Grid>
        <Grid item md={6} style={{display:'flex', justifyContent: 'flex-end'}}>
        </Grid>
      </Grid>
      <Grid item md={12}>
          <Grid container >
              <form className={classes.textArea} noValidate autoComplete="off">
                <TextField
                  id="textfield"
                  multiline
                  rows={4}
                  variant="outlined"
                  className={classes.textField}
                  bgcolor="white"
                  name = "updateText"
                  value={props.updateTextArea}
                  onChange = {props.handleChange}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    },
                  }}
                />
              </form>
          </Grid>
          <Box borderTop={1} color="#F2F2F2" borderRadius="0 0 10px 25px" bgcolor="#F2F2F2">
            <Grid container>
              <Grid item xs={8} className={classes.submenu}>
                <div className={classes.subMenuItem}>
                  <Typography className={classes.time} variant="h6"> 18:00 </Typography>
                </div>
                <div className={classes.subMenuItem}>
                  <img src={DividerIcon} alt="divider icon"/>
                </div>
                <div className={classes.subMenuItem}>
                  <a href="/"><img src={PictureUploadIcon} alt="upload icon" onClick={(e) => props.openImageDialog(e, true)}/></a>
                </div>
                <div className={classes.subMenuItem}>
                  <img src={TwitterIcon} alt="incorporate tweet icon" onClick={props.handleTwitterDialogOpen}/>
                </div>
              </Grid>
              <Grid item xs={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button className={classes.button} onClick={props.handleClick} variant="contained" disableElevation>
                  Inserir
                </Button>
              </Grid>
            </Grid>
          </Box>
      </Grid>
    </Grid>
  )
}