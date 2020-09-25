import React, {useState, useEffect} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box, IconButton, List, ListItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BroadcastOffIcon from './../../../../../../assets/broadcast_off.svg';
import ExitIcon from './../../../../../../assets/exit_icon.svg';

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
    maxWidth: '25%',
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
	},
	cancelButton: {
		backgroundColor: theme.palette.cinza1.main,
		padding: '0.1rem 0.5rem'
	},
	OkButton: {
		backgroundColor: theme.palette.verdeCamaraLight.main,
		color: theme.palette.white.main,
		padding: '0.1rem 0.5rem'
	},
  friendlyWarning: {
    padding: '0 1rem 0 0',
    fontSize: theme.typography.body1.fontSize,
    fontStyle: theme.typography.body1.fontStyle,
    color: theme.palette.grey.main,
  }
}))

export default function EndBroadcastAlert(props) {
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
		onClose(false)
	}

  return (
    <>
			<Dialog open={open} PaperProps={{ classes: {root: classes.dialogPaper } }}>
			 	<Grid container>
					<Grid item sm={11}></Grid>
					<Grid item sm={1}>
					<IconButton aria-label="exit">
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
						<img src={BroadcastOffIcon} alt="broadcast"/>
					</Grid>
					<Grid item sm={1}></Grid>
					<Grid item sm={7}>
						<DialogContentText className={classes.dialogContextTest}>
							Confirmar fim da transmissão?
						</DialogContentText>
            <DialogContentText className={classes.friendlyWarning}>
              Certifique-se de inserir um resumo da sessão antes de encerrar.
              Após encerrada, o resumo não poderá ser editado.
            </DialogContentText>
					</Grid>
				</Grid>
			 <DialogActions>
				 <Button className={classes.cancelButton}
				 				 variant="contained"
								 disableElevation
								 onClick={handleCancel}
								 id="cancel-flow-broadcast">
					 Cancelar
				 </Button>
				 <Button className={classes.OkButton}
				 					variant="contained"
									id="end-broadcast"
									disableElevation
									onClick={handleOk}>
					 Sim
				 </Button>
			 </DialogActions>
		 </Dialog>
	 </>
  )
}
