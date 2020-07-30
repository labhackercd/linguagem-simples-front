import React from 'react';
import {Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  titleRow: {
  	display: 'flex',
  	justifyContent: 'space-between',
  	height: '10vh',
  	margin: '1rem 0 0 0'
  },
	title: {
		fontSize: '24',
		fontWeight: '600',
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
		whiteSpace: 'nowrap',
		textDecoration: 'none',
		color: '#00AF82',
	},
	buttonText: {
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
		whiteSpace: 'nowrap',
		textDecoration: 'none'		
	},
  button: {
  	height: '30%',
  	alignItems: 'center',
  	color: 'default',
  	backgroundColor: '#00AF82',
  }
}));

export default function TitleRow(){
	const classes = useStyles();
	return (
		<Grid container className={classes.titleRow}>
			<Grid item md={6}>
				<div className={classes.title}> Linha do Tempo </div>
			</Grid>
			<Grid item md={6}>
	      <Button
	        variant="contained"
	        color="secondary"
	        disableElevation
	        className={classes.button}
	        startIcon={<img src="../../img/init_stream_button_icon.svg" />}>
	        <h6 className={classes.buttonText}>Iniciar transmissão</h6>
	      </Button>				
			</Grid>
		</Grid>
	)
}
