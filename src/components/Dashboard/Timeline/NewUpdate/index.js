import React, {useState, useEffect} from 'react'
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DividerIcon from './../../../../assets/divider.svg';
import PictureUploadIcon from './../../../../assets/picture_upload.svg';
import TwitterIcon from './../../../../assets/twitter_icon.svg';
import LinkIcon from './../../../../assets/link.svg'
import { parseHourMinute } from './../../../Util';

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
	const dateAux = props.date ? parseHourMinute(props.date) : parseHourMinute(new Date())
	const [date, setDate] = useState(dateAux)

	useEffect(() => {
		setInterval(() => tick(), 1000)
	}, clearInterval(1000));

	const tick = () => {
		setDate(parseHourMinute(new Date()))
	}

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
                  id="newUpdateTextField"
                  multiline
                  rows={4}
									disabled={!props.broadcastingOnline}
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
                  <Typography className={classes.time} variant="h6"> {date} </Typography>
                </div>
                <div className={classes.subMenuItem}>
                  <img src={DividerIcon} alt="divider icon"/>
                </div>
                <div className={classes.subMenuItem}>
                  <a href="/"><img src={PictureUploadIcon} id={"picture-upload-icon"} alt="upload icon" onClick={(e) => props.handleDialogStateAction(e, true, "previewDialog", "InputImage")}/></a>
                </div>
								<div className={classes.subMenuItem}>
									<a href="/"><img src={TwitterIcon} id={"tweet-insert-icon"}alt="incorporate twitter icon" onClick={(e) => props.handleDialogStateAction(e, true, "URLInputDialog", "URLInputIsTwitter")}/></a>
								</div>
								<div className={classes.subMenuItem}>
									<a href="/"><img src={LinkIcon} id={"link-insert-icon"} alt="incorporate url icon" onClick={(e) => props.handleDialogStateAction(e, true, "URLInputDialog", "noAction")}/></a>
								</div>
              </Grid>
              <Grid item xs={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button disabled={!props.broadcastingOnline} id={"updateSubmitButton"}className={classes.button} onClick={props.handleClick} variant="contained" disableElevation>
                  Inserir
                </Button>
              </Grid>
            </Grid>
          </Box>
      </Grid>
    </Grid>
  )
}
