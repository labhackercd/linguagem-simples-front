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
		margin: '1rem 0 0.5rem 0',
  },
  textArea: {
    height: '100%',
    width: '100%',
    border: '0',
  },
  textField: {
		height: '100%',
		width: '100%',
	},
  submenu: {
    display: 'flex',
		height: 'inherit',
  },
  subMenuItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 0.5rem 0 1rem',
  },
  button: {
    height: 'inherit',
    alignSelf: 'center',
		borderRadius: '0 0 5px 5px',
		backgroundColor: theme.palette.verdeCamaraLight.main,
		color: theme.palette.white.main,
		textTransform: 'capitalize',
  },
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		 height: 'inherit'
	},
  notchedOutline: {
    border: '2px solid #F2F2F2',
    borderWidthBottom: '0px',
    color: theme.palette.secondary,
    borderRadius: '5px 5px 0 0px',
  },
  time: {
    color: theme.palette.primary.main,
		fontWeight: 'bold',
		fontSize: 'smaller',
  },
	box: {
		height: '20%',
		borderRadius: '0 0 0 5px',
	},
	container: {
		height: '100%',
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
          <Box className={classes.box} color="#F2F2F2" bgcolor="#F2F2F2">
            <Grid container className={classes.container}>
              <Grid item xs={8} className={classes.submenu}>
                <div className={classes.subMenuItem}>
                  <p className={classes.time}> {date} </p>
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
              <Grid item xs={4} className={classes.buttonContainer}>
                <Button disabled={!props.broadcastingOnline} id={"updateSubmitButton"} className={classes.button} onClick={props.handleClick} variant="contained" disableElevation>
                  Publicar
                </Button>
              </Grid>
            </Grid>
          </Box>
      </Grid>
    </Grid>
  )
}
