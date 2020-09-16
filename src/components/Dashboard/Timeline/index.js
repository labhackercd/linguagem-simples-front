import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import SummaryBox from './SummaryBox';
import Header from './Header';
import StatusSelection from './StatusSelection';
import NewUpdate from './NewUpdate';
import URLInputDialog from './Dialogs/URLInput';
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
				previewModalOpen: false,
				imageUploadModalOpen: false,
				inputIsImage: false,
				URLInputDialogOpen: false,
				URLInputIsTwitter: false,
				picture: false,
				time: '19:00',
				sessionID: props.sessionID,
			}
		}

		async componentDidMount() {
			let updates = await fetchFeedUpdates(this.state.sessionID)
			if (updates.length > 0) {
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
			} else {
				this.setState({updates: ''})
			}
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
			this.setState({URLInputIsTwitter: false})
			this.setState({picture: false})
			this.setState({updateTitle: ''})
			this.setState({updateTextArea: ''})
			this.setState({customURL: ''})
			this.setState({inputIsImage: false})
		}
		extractTweetIDFromURL = () => {
			let parseURL = this.state.customURL.split('/')
			let path = parseURL[parseURL.length-1]
			let id = path.split('?')[0]
			this.setState({tweetID: id})
		}
		setCustomURL = (url) => {
			this.setState({customURL: url})
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
					this.garbageCollection()
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
					if(this.state.URLInputIsTwitter) {
						this.extractTweetIDFromURL()
						this.setState({customURL: ''}) // in order to avoid rendering customURL and Twitter components
					}
					this.setState({previewModalOpen: true})
					break;
				case "URLInputIsTwitter":
					this.setState({URLInputIsTwitter: true})
					break;
				case "InputImage":
					this.setState({inputIsImage: true})
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
		startUpdateWithTitleFlow = (e, title) => {
			e.preventDefault()
			this.setState({updateTitle: title}, this.handleDialogStateAction(e, true, "previewDialog", null))
		}
		setUpdateTitle = (e, title) => {
			if (!title) {
				this.setState({updateTitle: ''})
			} else {
				this.setState({updateTitle: title})
			}
		}
		render() {
			const { classes } = this.props;
			return (
				<div className={classes.body} testid="timeline">
				<Header></Header>
				<SummaryBox sessionID={this.state.sessionID}></SummaryBox>
				<StatusSelection startUpdateWithTitleFlow={this.startUpdateWithTitleFlow}
													 setUpdateTitle={this.setUpdateTitle}
													 handleDialogStateAction={this.handleDialogStateAction}></StatusSelection>
				<NewUpdate handleClick={this.handleClick}
									 openImageDialog={this.openImageDialog}
									 updateTextArea={this.updateTextArea}
									 handleChange={this.handleChange}
									 handleDialogStateAction={this.handleDialogStateAction}></NewUpdate>
				<PreviewDialog previewModalOpen={this.state.previewModalOpen}
							handleDialogStateAction={this.handleDialogStateAction}
							handleChange={this.handleChange}
							tweetID={this.state.tweetID}
							URLInputIsTwitter={this.state.URLInputIsTwitter}
							time={this.state.time}
							customURL={this.state.customURL}
							onImageDrop={this.onImageDrop}
							inputIsImage={this.state.inputIsImage}
							updateTitle={this.state.updateTitle}
							setUpdateTitle={this.setUpdateTitle}></PreviewDialog>
				<URLInputDialog
							 URLInputDialogOpen={this.state.URLInputDialogOpen}
							 customURL={this.state.customURL}
							 setCustomURL={this.setCustomURL}
							 URLInputIsTwitter={this.state.URLInputIsTwitter}
							 handleDialogStateAction={this.handleDialogStateAction}></URLInputDialog>
			 <FeedMemo updates={this.state.updates}></FeedMemo>
				</div>
			)
		}
	}
export default withStyles(useStyles)(Timeline);
