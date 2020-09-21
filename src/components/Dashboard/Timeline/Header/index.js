import React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InitStreamIcon from './../../../../assets/init_stream_button_icon.svg';

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    margin: '1rem 0 -2rem 1rem',
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
    margin: '0.3rem 0 0 0',
    padding: '0 1rem 0 0',
  },
  buttonBroadcastingOnline: {
    alignSelf: 'flex-start',
  	height: '30%',
  	color: 'default',
  	backgroundColor: '#00AF82',
  },
  buttonBroadcastingOffline: {
    alignSelf: 'flex-start',
    height: '30%',
    color: 'default',
    backgroundColor: '#000000',
  }
}));

export default function Header(props){
	const classes = useStyles();
  function handleChange(e, broadcastingStatus) {
    e.preventDefault()
    props.setBroadcastingStatus(broadcastingStatus)
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
    	        color="secondary"
    	        disableElevation
    	        className={classes.buttonBroadcastingOnline}
              onClick={(e) => handleChange(e, false)}
    	        startIcon={<img src={InitStreamIcon} alt="button to init stream"/>}>
    	        <h6>Iniciar transmissão</h6>
    	      </Button> :
            <Button
    	        variant="contained"
    	        color="secondary"
    	        disableElevation
    	        className={classes.buttonBroadcastingOffline}
              onClick={(e) => handleChange(e, true)}
    	        startIcon={<img src={InitStreamIcon} alt="button to init stream"/>}>
    	        <h6>Finalizar transmissão</h6>
    	      </Button>
          }
  			</Grid>
  		</Grid>
    </div>
	)
}
