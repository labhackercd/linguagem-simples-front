import React, {useState} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axiosInstance from '../../../auth/axiosApi.js';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import ImageUploader from 'react-images-upload';

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
	previewModalSubmitButton: {
		color: '#FFF',
		alignSelf: 'flex-end',
		backgroundColor: '#00AF82',
		borderRadius: '0 0 5px 5px'
	},
	previewModalFooter: {
		padding: '0',
		margin: '0 0 0 1rem',
		display: 'flex',
		justifyContent: 'space-between'
	},
}));

export default function Update(){
	const classes = useStyles();
	const [updates, setUpdates] = useState([]);
	const [updateTextArea, setUpdateTextArea] = useState("");
	const [tweetURL, setTweetURL] = useState('');
	const [tweetID, setTweetID] = useState('');
	const [open, setOpen] = useState(false);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
	const [picture, setPicture] = useState([]);

	function dispatchPayload() {
		const formData = new FormData()
		formData.append('image', picture, picture.name)
		formData.append('content', updateTextArea)
		formData.append('session', 1)
		formData.append('tweet_id', tweetID)
		axiosInstance.post('/publications/', formData, {
			headers: { 'Content-Type': 'multipart/form-data'},
		}).then(result => {
			console.log(result)
		}).catch(err => {
			console.log(err)
		})
	}
	function handleClick() {
		dispatchPayload()
	}
	function handleTwitterDialogOpen() {
		setOpen(true)
	}
	function handleTwitterDialogClose() {
		setOpen(false)
		let parseURL = tweetURL.split('/')
		let path = parseURL[parseURL.length-1]
		{/* removes suplemental information after the tweet's id */}
		let id = path.split('?')[0]
		setTweetID(id)
		setPreviewModalOpen(true)
	}
	function garbageCollection() {
		setTweetID('')
		setPicture([])
	}
	function handleImageUploadDialogOpen(e){
		e.preventDefault()
		setImageUploadModalOpen(true)
	}
	function handleImageUploadDialogClose() {
		setImageUploadModalOpen(false)
		dispatchPayload()
		garbageCollection()
	}
 	function handlePreviewModalOpen() {
		setPreviewModalOpen(true)
	}
	function handlePreviewModalClose() {
		dispatchPayload()
		setPreviewModalOpen(false)
		garbageCollection()
	}
	function handleChange(e) {
		setUpdateTextArea(e.target.value)
	}
	function onImageDrop(picture) {
		setPicture(picture[0])
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
											<a href="/"><img src="../../img/picture_upload.svg" alt="upload icon" onClick={handleImageUploadDialogOpen}/></a>
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

				{/* Image Upload Dialog */}
					<Dialog open={imageUploadModalOpen} onClose={handleImageUploadDialogClose}>
					 <DialogTitle id="form-dialog-title">Link para o tweet</DialogTitle>
					 <DialogContent>
						 <DialogContentText>
							 Faça upload da Imagem
						 </DialogContentText>
						 <TextField
							 id="textfield"
							 multiline
							 rows={4}
							 bgcolor="white"
							 onChange={(e) => setUpdateTextArea(e.target.value)}
							 name="previewModalUpdateText"
							 placeholder="Inserir nota"
							 onChange = {handleChange}
							 elevation={0}
							 InputProps={{ disableUnderline: true }}
						 />
						 <ImageUploader
								withIcon={true}
								onChange={onImageDrop}
								imgExtension={[".jpg", ".png", ".jpeg"]}
								maxFileSize={5242880}
								withPreview={true}
								singleImage={true}
							/>
					 </DialogContent>
					 <DialogActions>
						 <Button onClick={(e) => console.log(picture.length > 0 ? 'picture exists' : 'picture doesnt exist')} color="primary">
							 Fazer Upload da Imagem
						 </Button>
					 </DialogActions>
				 </Dialog>
				{/* End of Image Upload Dialog */}

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
				 	<Paper style={{backgroundColor: 'white', padding: '1rem', borderRadius: '15px'}} elevation={0}>
					 <DialogContent className={classes.previewModal}>
							 <TextField
								 id="textfield"
								 multiline
								 rows={4}
								 bgcolor="white"
								 onChange={(e) => setUpdateTextArea(e.target.value)}
								 name="previewModalUpdateText"
								 placeholder="Inserir nota"
								 onChange = {handleChange}
								 elevation={0}
								 InputProps={{ disableUnderline: true }}
							 />
							 <TwitterTweetEmbed
								style={{alignSelf: 'center'}}
								tweetId={tweetID}
							/>
						 {/*
							 */}
					 </DialogContent>
				 </Paper>
					 <DialogActions className={classes.previewModalFooter}>
						 <Typography className={classes.time} style={{alignSelf: 'flex-start'}} variant="h6"> 18:00 </Typography>
						 <Button onClick={handlePreviewModalClose} variant="contained" className={classes.previewModalSubmitButton}>
							 Publicar
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
												{update.tweet_url ?
													<TwitterTweetEmbed
																				style={{alignSelf: 'center'}}
																				tweetId={update.tweet_url}
																			/> : '' }
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
