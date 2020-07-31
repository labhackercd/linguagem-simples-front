import React from 'react';
import {Button, Grid, Typography, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	notchedOutline: {
		border: '2px solid #F2F2F2',
		borderWidthBottom: '0px',
		color: theme.palette.secondary,
		borderRadius: '0 0 0 0',
	},
	summaryBox: {
		margin: '0 1rem 1rem 1rem',
		display: 'flex',
		flexDirection: 'row',
	},
  summaryHeader: {
  	display: 'flex',
  	height: '2vh',
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
	underneathBarArea: {
		backgroundColor: theme.palette.cinza1,
		height: '1vh',
	},
	box: {
		background: theme.palette.cinza1,
		height: '5vh'
	},
	buttonRow: {
		display: 'flex'
	},
	button: {
		height: '70%',
	},
  time: {
    color: theme.palette.primary.main
  },
	divider: {
		color: theme.palette.cinza2
	},
	submenu: {
		display: 'flex',
		margin: '0.1rem 0 0 0',
		justifyContent: 'flex-start',
		padding: '0 1rem 0 1rem',
	}
}));

export default function NewUpdate(){
	const classes = useStyles();
	return (
		<React.Fragment>
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
					          id="outlined-multiline-static"
					          multiline
					          rows={4}
					          variant="outlined"
										className={classes.textField}
										bgcolor="white"
										InputProps={{
											classes: {
												notchedOutline: classes.notchedOutline
											},
										}}
					        />
						    </form>
						</Grid>
						<Box borderTop={1} color="#F2F2F2" borderRadius="0 0 10px 25px" bgcolor="#F2F2F2" height="18%">
						<Grid container style={{display: 'flex', padding: '0rem 0 0 1rem'}}>
							<Grid item xs={8} className={classes.submenu}>
                <Typography className={classes.time} variant="h6"> 18:00 </Typography>
								<img src="../../img/divider.svg" />
								<a href="/"><img src="../../img/picture_upload.svg" /></a>
              </Grid>
							<Grid item xs={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
								<Button className={classes.button} variant="contained" color="#C4C4C4" disableElevation>
									Atualizar
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
