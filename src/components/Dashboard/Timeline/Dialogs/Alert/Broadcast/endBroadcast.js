import React, {useState, useEffect} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';

export default function EndBroadcastAlert(props) {

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
			<Dialog open={open}>
			 <DialogContent>
				 <DialogContentText>
					 Confirmar fim da transmissão?
				 </DialogContentText>
			 </DialogContent>
			 <DialogActions>
				 <Button onClick={handleCancel}>
					 Cancelar
				 </Button>
				 <Button onClick={handleOk}
								 color="primary">
					 Ok
				 </Button>
			 </DialogActions>
		 </Dialog>
	 </>
  )
}
