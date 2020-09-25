import React, {useState, useEffect} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box, IconButton, List, ListItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BroadcastIcon from './../../../../../../assets/broadcast.svg';
import ExitIcon from './../../../../../../assets/exit_icon.svg';

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		padding: '1rem',
	},
  dialogContextTest: {
    fontSize: theme.typography.h4.fontSize,
		fontStyle: theme.typography.h4.fontStyle,
		color: '#000',
  },
	broadcastIcon: {
		display: 'flex'
	},
	exitIcon: {
		padding: '0 0.5rem 0 0'
	},
	cancelButton: {
		backgroundColor: theme.palette.cinza1.main,
		padding: '0.1rem 0.5rem'
	},
	OkButton: {
		backgroundColor: theme.palette.verdeCamaraLight.main,
		color: theme.palette.white.main,
		padding: '0.1rem 0.5rem'
	}
}))

export default function StartBroadcastAlert(props) {
	const classes = useStyles();
	const { onClose, value: valueProp, action, open, ...other } = props;
	const [value, setValue] = React.useState(valueProp);

	useEffect(() => {
		if(!open) {
			setValue(valueProp)
		}
	}, [valueProp, open]);

	const handleCancel = () => {
		onClose()
	}

	const handleOk = () => {
		onClose(true)
	}

  return (
		<>
			<Dialog open={open} >
			 	<Grid container className={classes.exitIcon}>
					<Grid item sm={11}></Grid>
					<Grid item sm={1} spacing={1}>
					<IconButton aria-label="exit" id="exit-button-start-broadcast" onClick={handleCancel}>
						<img src={ExitIcon} />
					</IconButton>
					</Grid>
				</Grid>
			 	<Grid container>
					<Grid item sm={1}></Grid>
					<Grid item
								alignItems="center"
	  						justify="center"
								sm={3}
								className={classes.broadcastIcon}>
						<img src={BroadcastIcon} alt="broadcast"/>
					</Grid>
					<Grid item sm={1}></Grid>
					<Grid item sm={7}>
						<DialogContentText className={classes.dialogContextTest}>
							Confirmar início da transmissão?
						</DialogContentText>
					</Grid>
				</Grid>
			 <DialogActions>
				 <Button className={classes.cancelButton}
				  			 variant="contained"
								 id="start-broadcast-cancel"
								 disableElevation
								 onClick={handleCancel}>
					 Cancelar
				 </Button>
				 <Button className={classes.OkButton}
				  			 variant="contained"
								 id="start-broadcast"
								 disableElevation
								 onClick={handleOk}>
					 Sim
				 </Button>
			 </DialogActions>
		 </Dialog>
	 </>
  )
}
