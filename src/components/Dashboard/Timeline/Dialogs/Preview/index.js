import React from 'react';
import {Paper,Grid,Button, TextField, Dialog, DialogActions, DialogContent,
	      DialogTitle, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import ExitIcon from './../../../../../assets/exit_icon.svg';
import AlertIcon from './../../../../../assets/alert.svg';
import AlertDialogIcon from './../../../../../assets/alert_within_dialog_exit_icon.svg';
import { ReactTinyLink } from 'react-tiny-link';
import ImageUploader from 'react-images-upload';

const useStyles = theme => ({
  previewModalSubmitButton: {
    color: '#FFF',
    alignSelf: 'flex-end',
    backgroundColor: '#00AF82',
    borderRadius: '0 0 5px 5px',
		textTransform: 'capitalize',
  },
  previewModalFooter: {
    padding: '0',
    margin: '0 0 0 1rem',
    display: 'flex',
    justifyContent: 'space-between'
  },
		sessionTitleAlert: {
		backgroundColor: '#00AF82',
		width: '100%',
		borderRadius: '5px',
		color: 'white',
		padding: '0.2rem',
		fontWeight: '600',
		fontSize: '13',
		display: 'flex',
	},
  time: {
    color: theme.palette.primary.main
  },
})

class PreviewDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: props.previewModalOpen,
		}
	}

	handleDialog = (e, state) => {
		e.preventDefault()
		this.setState({dialogOpen: false})
	}

	render() {
		const { classes } = this.props;
		return (
			<Dialog
				fullWidth={true}
				maxWidth={'sm'}
				style={{margin: '0 1rem'}}
				PaperProps={{
					style: {
						backgroundColor: '#F2F2F2',
					},
				}}
				open={this.props.previewModalOpen}
				onClose={(e) => this.props.handleDialogStateAction(e, false, "previewDialog", null)}>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					 <DialogTitle id="form-dialog-title">Nova atualização</DialogTitle>
					 <img src={ExitIcon}
								style={{margin: '0 1rem 0 0'}}
								id="close-preview-dialog"
								onClick={(e) => this.props.handleDialogStateAction(e, false, "previewDialog", null) }
								alt="exit" />
				 </div>
				 <Paper style={{backgroundColor: 'white',
				  							padding: '1rem',
												borderRadius: '15px',
												margin: '0 0.5rem'}} elevation={0}>
				 <DialogContent className={classes.previewModal}>
					<Grid style={{display: this.props.updateTitle ? 'flex' : 'none' }}
								container
								className={classes.sessionTitleAlert}>
						<Grid item md={1} style={{padding: '0.1rem 0 0 0.5rem'}}>
							<img src={AlertIcon} alt="alert"/>
						</Grid>
						<Grid item md={10}>{this.props.updateTitle}</Grid>
							<Grid item md={1} style={{padding: '0.1rem 0.1rem 0rem 1rem'}}>
								<img src={AlertDialogIcon}
										 id="remove-post-title"
										 onClick={() => this.props.setUpdateTitle('')}
										 alt="exit" />
							</Grid>
					</Grid>
						 <TextField
							 id="textfield-preview-dialog"
							 multiline
							 rows={4}
							 bgcolor="white"
							 disabled={!this.props.broadcastingOnline}
							 name="previewModalUpdateText"
							 placeholder={"Inserir nota"}
							 onChange = {this.props.handleChange}
							 elevation={0}
							 InputProps={{ disableUnderline: true }}
							 style={{width: '100%'}}
						 />
					 {this.props.URLInputIsTwitter ?
						 <TwitterTweetEmbed
 							style={{alignSelf: 'center'}}
 							tweetId={this.props.tweetID}
 						/> : ''}
					{this.props.customURL && (!this.props.URLInputIsTwitter) ?
						<ReactTinyLink
							cardSize="small"
							showGraphic={true}
							maxLine={2}
							minLine={1}
							url={this.props.customURL} /> :
							''}
					{this.props.inputIsImage ?
						<ImageUploader
	             withIcon={true}
	             onChange={this.props.onImageDrop}
	             imgExtension={[".jpg", ".png", ".jpeg"]}
	             maxFileSize={5242880}
	             withPreview={true}
	             singleImage={true}
	             buttonText="Escolher imagens"
	             buttonStyles={{backgroundColor: '#00AF82',
	                            borderRadius: '5px',
	                            fontWeight: '600'}}
	             style={{backgroundColor: '#F4F4F4'}}
	             label="Tamanho máximo: 5mbs"
	             alt="Image upload form"
	           /> : ''}
				 </DialogContent>
			 </Paper>
				 <DialogActions className={classes.previewModalFooter}>
					 <Typography className={classes.time} style={{alignSelf: 'flex-start'}} variant="h6"> {this.props.time} </Typography>
					 <Button disabled={!this.props.broadcastingOnline}
					 					onClick={(e) => this.props.handleDialogStateAction(e, false, "previewDialog", "dispatchPayload")}
										variant="contained"
										className={classes.previewModalSubmitButton}
										id="button-preview-click">
						 Publicar
					 </Button>
				 </DialogActions>
			 </Dialog>
		)
	}
}

export default withStyles(useStyles)(PreviewDialog);
