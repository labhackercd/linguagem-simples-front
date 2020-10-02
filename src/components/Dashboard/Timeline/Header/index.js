import React, {useState} from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InitStreamIcon from './../../../../assets/init_stream_button_icon.svg';
import StartBroadcastAlert from './../Dialogs/Alert/StartBroadcast';
import EndBroadcastAlert from './../Dialogs/Alert/EndBroadcast';

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    margin: '1rem 0 -2rem 0rem',
  },
  titleRow: {
  	display: 'flex',
  	justifyContent: 'space-between',
  },
	title: {
		whiteSpace: 'nowrap',
		textDecoration: 'none',
		color: theme.palette.primary.main,
    justifyContent: 'flex-start',
	},
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonBroadcastingOnline: {
    alignSelf: 'flex-start',
  	height: '30%',
  	color: '#FFF',
  	backgroundColor: '#00AF82',
  },
  buttonBroadcastingOffline: {
    alignSelf: 'flex-start',
    height: '30%',
    color: '#FFF',
    backgroundColor: '#000000',
  }
}));

export default function Header(props){
	const classes = useStyles();
  const [startBroadcastDialogOpen, setStartBroadcastDialogOpen] = useState(false)
  const [endBroadcastDialogOpen, setEndBroadcastDialogOpen] = useState(false)
  const [userInput, setUserInput] = useState(false)

  const handleStartBroadcastDialogOpen = (e) => {
    e.preventDefault()
    setStartBroadcastDialogOpen(true)
  }

  const handleEndBroadcastDialogOpen = (e) => {
    e.preventDefault()
    setEndBroadcastDialogOpen(true)
  }

  const handleDialogClose = (userInput) => {
    setStartBroadcastDialogOpen(false)
    setEndBroadcastDialogOpen(false)
    props.setBroadcastingStatus(userInput)
  }

	return (
    <div className={classes.body}>
  		<Grid container className={classes.titleRow}>
  			<Grid item md={6} >
          <Typography variant="h3" className={classes.title}>Linha do Tempo </Typography>
  			</Grid>
  			<Grid item md={6} className={classes.buttonContainer}>
          {props.broadcastingOnline ?
            <Button
              variant="contained"
              disableElevation
              id="end-stream"
              onClick={(e) => handleEndBroadcastDialogOpen(e)}
              className={classes.buttonBroadcastingOffline}
              startIcon={<img src={InitStreamIcon} alt="button to init stream"/>}>
              <h6>Finalizar transmissão</h6>
            </Button> :
            <Button
    	        variant="contained"
              id="start-stream"
    	        disableElevation
    	        className={classes.buttonBroadcastingOnline}
              onClick={(e) => handleStartBroadcastDialogOpen(e)}
    	        startIcon={<img src={InitStreamIcon} alt="button to init stream"/>}>
    	        <h6>Iniciar transmissão</h6>
    	      </Button>
          }
  			</Grid>
  		</Grid>
      <StartBroadcastAlert keepMounted
                      open={startBroadcastDialogOpen}
                      onClose={handleDialogClose}
                      value={userInput} />
      <EndBroadcastAlert keepMounted
                      open={endBroadcastDialogOpen}
                      onClose={handleDialogClose}
                      value={userInput} />
    </div>
	)
}
