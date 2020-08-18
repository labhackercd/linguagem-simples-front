import React, {useState} from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axiosInstance from '../../../auth/axiosApi.js';

const useStyles = makeStyles((theme) => ({
	body: {
		width: '100%',
		padding: '0 1rem 0 1rem',
	},
	summaryBox: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	summaryHeader: {
  	display: 'flex',
		margin: '1rem 0 1rem 0',
  },
	notchedOutline: {
		border: '2px solid #F2F2F2',
		borderWidthBottom: '0px',
		color: theme.palette.secondary,
		borderRadius: '0 0 0 0',
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
	buttonRow: {
		display: 'flex'
	},
	button: {
		height: '70%',
		alignSelf: 'flex-end',
	},
	divider: {
		color: theme.palette.cinza2
	},
	submenu: {
		display: 'flex',
	},
	subMenuItem: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		margin: '0 0.5rem 0 1rem',
	},
	updatesArea: {
		margin: '1rem 0 0 0',
		overflow: 'auto',
		display: 'flex',
		height: '100%',
		width: '100%',
	},
	updateItem: {
		overflow: 'auto',
		width: '100%',
		height: 'auto',
		alignItems: 'flex-start',
		display: 'flex',
		margin: '1rem 0',
	},
	updateItemBody: {
		color: theme.palette.grey
	},
	title: {
		color: theme.palette.primary.main
	},
	itemHeader: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	time: {
		color: theme.palette.primary.main
	},
	previewModal: {
	}
}));

export default function Update(){
	const classes = useStyles();
	const [updates, setUpdates] = useState([]);
	const [updateTextArea, setUpdateTextArea] = useState("");
	const [tweetURL, setTweetURL] = useState('');
	const [image] = useState(''); // will probably suffer modifications
	const [open, setOpen] = useState(false);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);

	function handleClick() {
		axiosInstance.post('/publications/', {
						state: 'published',
						content: updateTextArea,
						session: 1,
						tweet_url:  tweetURL,
				}).then(
						result => {
								if(result.status===201){
										let date = new Date(result.data.created)
										let formatDate = date.getHours() + ':' + ('0'+ date.getMinutes()).slice(-2) // reference: https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers
										let responseData = result.data;
										let newUpdate = {
											id: responseData.id,
											content: responseData.content,
											time: formatDate,
										}
										setUpdates(prevUpdates => [...prevUpdates, newUpdate])
										setUpdateTextArea("")
								}else{
										alert("Erro ao criar o post")
								}

						}
		).catch (error => {
				throw error;
		})
	}

	function handleTwitterDialogOpen() {
		setOpen(true)
	}
	function handleTwitterDialogClose() {
		setOpen(false)
		setPreviewModalOpen(true)
	}
	function handlePreviewModalOpen() {
		setPreviewModalOpen(true)
	}
	function handlePreviewModalClose() {
		setPreviewModalOpen(false)
	}
	function handleChange(e) {
		setUpdateTextArea(e.target.value)
	}

	return (
		<React.Fragment>
			<div className={classes.body}>
			{/* Summary box */}
			<Grid container className={classes.summaryBox}>
				<Grid container className={classes.summaryHeader}>
					<Grid item md={6} style={{display:'flex', justifyContent: 'flex-start'}}>
						<Typography variant="h5"> Resumo </Typography>
					</Grid>
					<Grid item md={6} style={{display:'flex', justifyContent: 'flex-end'}}>
						<a href="/"><img src="../../img/down-arrow.svg" alt="up arrow icon"/></a>
					</Grid>
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
					<Box borderTop={1} color="#F2F2F2" borderRadius="0 0 10px 25px" bgcolor="#F2F2F2">
						<Grid container>
							<Grid item xs={8} style={{display: 'flex', justifyContent: 'flex-start'}}></Grid>
							<Grid item xs={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
								<Button className={classes.button} variant="contained" disableElevation>
									Atualizar
								</Button>
							</Grid>
						</Grid>
					</Box>
			</Grid>
			{/* New update box */}
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
						          id="textfield"
						          multiline
						          rows={4}
						          variant="outlined"
											className={classes.textField}
											bgcolor="white"
											name = "updateText"
											value={updateTextArea}
											onChange = {handleChange}
											InputProps={{
												classes: {
													notchedOutline: classes.notchedOutline
												},
											}}
						        />
							    </form>
							</Grid>
							<Box borderTop={1} color="#F2F2F2" borderRadius="0 0 10px 25px" bgcolor="#F2F2F2">
								<Grid container>
									<Grid item xs={8} className={classes.submenu}>
										<div className={classes.subMenuItem}>
		                	<Typography className={classes.time} variant="h6"> 18:00 </Typography>
										</div>
										<div className={classes.subMenuItem}>
											<img src="../../img/divider.svg" alt="divider icon"/>
										</div>
										<div className={classes.subMenuItem}>
											<a href="/"><img src="../../img/picture_upload.svg" alt="upload icon"/></a>
										</div>
										<div className={classes.subMenuItem}>
											<img src="../../img/twitter_icon.svg" alt="incorporate tweet icon" onClick={handleTwitterDialogOpen}/>
										</div>
									</Grid>
									<Grid item xs={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
										<Button className={classes.button} onClick={handleClick} variant="contained" disableElevation>
											Atualizar
										</Button>
									</Grid>
								</Grid>
							</Box>
					</Grid>
				</Grid>

				{/* Twitter URL input dialog */}
					<Dialog open={open} onClose={handleTwitterDialogClose}>
					 <DialogTitle id="form-dialog-title">Link para o tweet</DialogTitle>
					 <DialogContent>
						 <DialogContentText>
							 Insira no campo abaixo o link para o tweet desejado
						 </DialogContentText>
						 <TextField
							 autoFocus
							 name="tweetURL"
							 onChange={(e) => setTweetURL(e.target.value)}
							 margin="dense"
							 id="name"
							 label="Link para o tweet"
							 type="text"
							 fullWidth
						 />
					 </DialogContent>
					 <DialogActions>
						 <Button onClick={handleTwitterDialogClose} color="primary">
							 Cancelar
						 </Button>
						 <Button onClick={handleTwitterDialogClose} color="primary">
							 Incorporar tweet
						 </Button>
					 </DialogActions>
				 </Dialog>
				{/* End of Twitter URL input dialog */}

				{/* Preview Modal dialog */}
				<Dialog
					fullWidth={true}
					maxWidth={'sm'}
					PaperProps={{
						style: {
							backgroundColor: '#F2F2F2',
						},
					}}
					open={previewModalOpen}
					onClose={handlePreviewModalClose}>
				 <DialogTitle id="preview-modal-title">Nova atualização</DialogTitle>
					 <DialogContent class={classes.previewModal}>
						 <TextField
							 id="textfield"
							 multiline
							 rows={4}
							 variant="outlined"
							 className={classes.textField}
							 bgcolor="white"
							 name = "updateText"
							 onChange = {handleChange}
							 InputProps={{
								 classes: {
									 notchedOutline: classes.notchedOutline
								 },
							 }}
						 />
					 </DialogContent>
					 <DialogActions>
						 <Button onClick={handlePreviewModalClose} color="primary">
							 Cancelar
						 </Button>
						 <Button onClick={handlePreviewModalClose} color="primary">
							 Incorporar tweet
						 </Button>
					 </DialogActions>
				 </Dialog>
				{/* End of Preview Modal Dialog */}


				<Grid container className={classes.updatesArea}>
					<List style={{width: '100%'}}>
							{updates.slice(0).reverse().map(update =>  //creates a shallow copy of the array and reverses it
								<ListItem divider key={update.id}>
									<Grid container>
										<Grid item xs={2}>
											<Typography variant="h6">
												{update.time}
											</Typography>
										</Grid>
										<Grid item xs={10}>
											<Grid container className={classes.itemHeader}>
												<Typography variant="h5" className={classes.title}>
													{update.title}
												</Typography>
												<Grid item>
													<img src="../../img/more_options_icon.svg" alt="more options icon"/>
												</Grid>
											</Grid>
											<Grid container className={classes.updateItem}>
												<Typography style={{color: '#666'}} variant="body1">{update.content}</Typography>
											</Grid>
										</Grid>
									</Grid>
								</ListItem>
							)}
					</List>
				</Grid>
			</div>
		</React.Fragment>
	)
}
