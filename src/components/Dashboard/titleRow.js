import React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  titleRow: {
  	display: 'flex',
  	justifyContent: 'space-between',
  	height: '10vh',
  	margin: '1rem 0 0 1rem',
  },
	title: {
		whiteSpace: 'nowrap',
		textDecoration: 'none',
		color: theme.palette.primary.main,
    justifyContent: 'flex-start',
	},
  button: {
    justifyContent: 'flex-end',
  	height: '30%',
  	color: 'default',
  	backgroundColor: '#00AF82',
  },
}));

export default function TitleRow(){
	const classes = useStyles();
	return (
		<Grid container className={classes.titleRow}>
			<Grid item md={6} >
        <Typography variant="h3" className={classes.title}>Linha do Tempo </Typography>
			</Grid>
			<Grid item md={6} style={{paddingLeft: '2rem'}}>
	      <Button
	        variant="contained"
	        color="secondary"
	        disableElevation
	        className={classes.button}
	        startIcon={<img src="../../img/init_stream_button_icon.svg" />}>
	        <h6>Iniciar transmissão</h6>
	      </Button>
			</Grid>
		</Grid>
	)
}
