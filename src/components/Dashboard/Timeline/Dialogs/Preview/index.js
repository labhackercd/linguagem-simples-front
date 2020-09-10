import React from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent,
	      DialogTitle, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import ExitIcon from './../../../../../assets/exit_icon.svg';
import { ReactTinyLink } from 'react-tiny-link';

const useStyles = theme => ({
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
		console.log("chega aqui com state " + state)
		this.setState({dialogOpen: false})
		console.log(this.state.dialogOpen)
	}

	render() {
		const { classes } = this.props;
		return (
			<Dialog
				fullWidth={true}
				maxWidth={'sm'}
				PaperProps={{
					style: {
						backgroundColor: '#F2F2F2',
					},
				}}
				open={this.props.previewModalOpen}
				onClose={(e) => this.props.handleDialogStateAction(e, false, "previewDialog", null)}>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					 <DialogTitle id="form-dialog-title">Nova atualizacao</DialogTitle>
					 <img src={ExitIcon}
								style={{margin: '0 1rem 0 0'}}
								onClick={(e) => this.props.handleDialogStateAction(e, false, "previewDialog", null) }
								alt="exit" />
				 </div>
				 <Paper style={{backgroundColor: 'white', padding: '1rem', borderRadius: '15px'}} elevation={0}>
				 <DialogContent className={classes.previewModal}>
						 <TextField
							 id="textfield"
							 multiline
							 rows={4}
							 bgcolor="white"
							 name="previewModalUpdateText"
							 placeholder={"Inserir nota"}
							 onChange = {this.props.handleChange}
							 elevation={0}
							 InputProps={{ disableUnderline: true }}
							 style={{width: '100%'}}
						 />
					 {this.props.tweetID ?
						 <TwitterTweetEmbed
 							style={{alignSelf: 'center'}}
 							tweetId={this.props.tweetID}
 						/> : ''}
					{this.props.customURL ?
						<ReactTinyLink
							cardSize="small"
							showGraphic={true}
							maxLine={2}
							minLine={1}
							url={this.props.customURL} /> :
							''}
				 </DialogContent>
			 </Paper>
				 <DialogActions className={classes.previewModalFooter}>
					 <Typography className={classes.time} style={{alignSelf: 'flex-start'}} variant="h6"> {this.props.time} </Typography>
					 <Button onClick={(e) => this.props.handleDialogStateAction(e, false, "previewDialog", "dispatchPayload")} variant="contained" className={classes.previewModalSubmitButton}>
						 Publicar
					 </Button>
				 </DialogActions>
			 </Dialog>
		)
	}
}

export default withStyles(useStyles)(PreviewDialog);
