import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import SummaryBox from './SummaryBox';
import Header from './Header';
import StatusSelection from './StatusSelection';
import NewUpdate from './NewUpdate';
import TwitterDialog from './Dialogs/Twitter';
import URLInputDialog from './Dialogs/URLInput';
import ImageUploadDialog from './Dialogs/ImageUpload';
import PreviewDialog from './Dialogs/Preview';
import Feed from './Feed';
import axiosInstance from '../../../auth/axiosApi.js';
import { fetchFeedUpdates } from './timelineAPIhandler';
import { parseHourMinute } from './../../Util';
import {API_PUBLICATIONS_URL} from './../../../api_urls'

const FeedMemo = React.memo(Feed)

const useStyles = theme => ({
	body: {
		padding: '0 1rem 0 1rem',
		height: '100vh',
	}
})

const errorMessages = {
	lacks_payload_content: 'Voce deve submeter pelo menos uma atualizacao, ou imagem ou tweet para prosseguir'
}

class Timeline extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				updates: [],
				updateTitle: '',
				updateTextArea: '',
				tweetURL: '',
				tweetID: '',
				customURL: '',
				twitterDialogOpen: false,
				previewModalOpen: false,
				imageUploadModalOpen: false,
				URLInputDialogOpen: false,
				picture: false,
				time: '19:00',
				sessionID: props.sessionID,
			}
		}

		async componentDidMount() {
			let updates = await fetchFeedUpdates(this.state.sessionID)
			for (let i = 0; i < updates.length; i++) {
				let content = JSON.parse(updates[i].content)
				if(content.updateTextArea) {
					updates[i]['updateTextArea'] = content.updateTextArea
				}
				if(content.customURL) {
					updates[i]['customURL'] = content.customURL
				}
			}
			this.setState({updates: updates})
		}

		dispatchPayload = () => {
			let { updates, picture, updateTitle, updateTextArea, sessionID, tweetID, customURL } = this.state;
		  if (this.validatePayload()) {
		    const formData = new FormData()
		    if(picture) {
		      formData.append('image', picture, picture.name)
		    }
				let content = {
					"updateTextArea": updateTextArea,
					"customURL": customURL,
				}
				formData.append('content', JSON.stringify(content))
		    formData.append('title', updateTitle)
		    formData.append('session', sessionID)
		    formData.append('tweet_id', tweetID)
		    axiosInstance.post(API_PUBLICATIONS_URL, formData, {
		      headers: { 'Content-Type': 'multipart/form-data'},
		    }).then(result => {
		      if(result.status===201) {
							let data = result.data
							let content = JSON.parse(data.content)
		          let newUpdate = {
		            id: data.id,
		            created: data.created
		          }
							if(content.updateTextArea) {
								newUpdate['updateTextArea'] = content.updateTextArea
							}
							if(content.customURL) {
								newUpdate['customURL'] = content.customURL
							}
		          if(data.tweet_id.length > 0) {
		            newUpdate['tweet_id'] = data.tweet_id
		          }
		          if(data.image){
		            newUpdate['image'] = data.image
		          }
		          if(data.title) {
		            newUpdate['title'] = data.title
		          }
							this.setState({updates: [...updates, newUpdate]})
							this.garbageCollection()
		          return newUpdate
		      }
		    }).catch(err => {
		      console.log(err)
		    })
		  } else {
		    alert(errorMessages.lacks_payload_content)
		  }
		}
		validatePayload = () => {
			let contentExists = this.state.updateTextArea.length > 0
			let tweetExists = this.state.tweetID.length > 0
			return this.state.picture || contentExists || tweetExists;
		}

		handleClick = () => {
			this.dispatchPayload()
		}

	 listenerExternalContent = (data) => {
			return true
		}

		garbageCollection = () => {
			this.setState({tweetID: ''})
			this.setState({picture: false})
			this.setState({updateTitle: ''})
			this.setState({updateTextArea: ''})
			this.setState({customURL: ''})
		}
		/* Twitter Dialog */
		handleTwitterDialogOpen = (e) => {
			e.preventDefault()
			this.setState({twitterDialogOpen: true})
		}
		handleTwitterDialogClose = () => {
			this.setState({twitterDialogOpen: false})
			let parseURL = this.state.tweetURL.split('/')
			let path = parseURL[parseURL.length-1]
			let id = path.split('?')[0]
			this.setState({tweetID: id})
			this.setState({previewModalOpen: true})
		}
		setTweetURL = (url) => {
			this.setState({tweetURL: url})
		}
		setCustomURL = (url) => {
			this.setState({customURL: url})
		}
		/* Image Dialog */
		openImageDialog = (e, status) => {
			e.preventDefault()
			this.setState({imageUploadModalOpen: status})
		}
		closeImageDialogSendPayload = (e) => {
			this.openImageDialog(e, false)
			this.dispatchPayload()
		}
		onImageDrop = (picture) => {
			picture.length > 0 ?  this.setState({picture: picture[0]}) : this.setState({picture: false})
		}
		/* Preview Modal */
		handleDialogStateAction = (e, state, dialog, action) => {
			e.preventDefault()
			switch(dialog) {
				case "previewDialog":
					this.setState({previewModalOpen: state})
					break;
				case "URLInputDialog":
					this.setState({URLInputDialogOpen: state})
					break;
			}
			switch(action) {
				case "dispatchPayload":
					this.dispatchPayload()
					break;
				case "previewModalOpen":
					this.setState({previewModalOpen: true})
					break;
			}
		}

		handlePreviewModalClose = () => {
			this.dispatchPayload()
			this.setState({previewModalOpen: false})
		}
		/* Text area */
		handleChange = (e) => {
			this.setState({updateTextArea: e.target.value})
		}
		startUpdateWithTitleFlow = (e,title) => {
			title.length > 0 ? this.setState({updateTitle: title}) : this.setState({updateTitle: ''})
			this.openImageDialog(e, true)
		}
		setUpdateTitle = () => {
			this.setState({updateTitle: ''})
		}
		render() {
			const { classes } = this.props;
			return (
				<div className={classes.body} testid="timeline">
					<Header></Header>
					<SummaryBox sessionID={this.state.sessionID}></SummaryBox>
					<StatusSelection startUpdateWithTitleFlow={this.startUpdateWithTitleFlow}></StatusSelection>
					<NewUpdate handleClick={this.handleClick}
										 handleTwitterDialogOpen={this.handleTwitterDialogOpen}
										 openImageDialog={this.openImageDialog}
										 updateTextArea={this.updateTextArea}
										 handleChange={this.handleChange}
										 handleDialogStateAction={this.handleDialogStateAction}></NewUpdate>
				 <TwitterDialog handleTwitterDialogClose={this.handleTwitterDialogClose}
							 twitterDialogOpen={this.state.twitterDialogOpen}
							 setTweetURL={this.setTweetURL}></TwitterDialog>
				 <ImageUploadDialog imageUploadModalOpen={this.state.imageUploadModalOpen}
							 closeImageDialogSendPayload={this.closeImageDialogSendPayload}
							 openImageDialog={this.openImageDialog}
							 updateTitle={this.state.updateTitle}
							 setUpdateTitle={this.setUpdateTitle}
							 handleChange={this.handleChange}
							 onImageDrop={this.onImageDrop}
							 time={this.state.time}></ImageUploadDialog>
				<PreviewDialog previewModalOpen={this.state.previewModalOpen}
							handleDialogStateAction={this.handleDialogStateAction}
							handleChange={this.handleChange}
							tweetID={this.state.tweetID}
							time={this.state.time}
							customURL={this.state.customURL}></PreviewDialog>
				<URLInputDialog
							 URLInputDialogOpen={this.state.URLInputDialogOpen}
							 customURL={this.state.customURL}
							 setCustomURL={this.setCustomURL}
							 handleDialogStateAction={this.handleDialogStateAction}></URLInputDialog>
			 <FeedMemo updates={this.state.updates}></FeedMemo>
				</div>
			)
		}
	}
export default withStyles(useStyles)(Timeline);
