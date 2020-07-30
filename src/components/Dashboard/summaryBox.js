import React from 'react';
import {Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  titleRow: {
  	display: 'flex',
  	justifyContent: 'space-between',
  	height: '2vh',
  },
	title: {
		fontSize: '12',
		fontWeight: '600',
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
		whiteSpace: 'nowrap',
		textDecoration: 'none',
		color: '#3E3E3E',
	},
	textField: {
	}
}));

export default function SummaryBox(){
	const classes = useStyles();
	return (
		<React.Fragment>
		<Grid container className={classes.titleRow}>
			<Grid item md={6}>
				<div className={classes.title}> Resumo </div>
			</Grid>
			<Grid item md={6}>			
			</Grid>
		</Grid>
		<Grid item md={12}>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField fullWidth="true" className={classes.textField} id="outlined-basic" label="Outlined" variant="outlined" />
    </form>			
		</Grid>
		</React.Fragment>
	)
}