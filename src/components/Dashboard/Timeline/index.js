import React, {useState} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import SummaryBox from './SummaryBox';
import axiosInstance from '../../../auth/axiosApi.js';
import Header from './Header';
import StatusSelection from './StatusSelection';
import NewUpdate from './NewUpdate';
import TwitterDialog from './Dialogs/Twitter';
import ImageUploadDialog from './Dialogs/ImageUpload';
import PreviewDialog from './Dialogs/Preview';
import Feed from './Feed';

const useStyles = makeStyles((theme) => ({
	body: {
		padding: '0 1rem 0 1rem',
		height: 'calc(100vh-3px)',
	}
}));

export default function Timeline(props){
	const classes = useStyles();
	const sessionID = props.sessionID;
	const [updates, setUpdates] = useState([]);
	const [updateTitle, setUpdateTitle] = useState('');
	const [updateTextArea, setUpdateTextArea] = useState("");
	const [tweetURL, setTweetURL] = useState('');
	const [tweetID, setTweetID] = useState('');
	const [twitterDialogOpen, setTwitterDialogOpen] = useState(false);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
	const [picture, setPicture] = useState(false);
	const [time] = useState('18:00');
	const errorMessages = {
				lacks_payload_content: 'Voce deve submeter pelo menos uma atualizacao, ou imagem ou tweet para prosseguir'
	}
	function dispatchPayload() {
		if (validatePayload()) {
			const formData = new FormData()
			if(picture) {
				formData.append('image', picture, picture.name)
			}
			formData.append('title', updateTitle)
			formData.append('content', updateTextArea)
			formData.append('session', sessionID)
			formData.append('tweet_id', tweetID)
			axiosInstance.post('/publications/', formData, {
				headers: { 'Content-Type': 'multipart/form-data'},
			}).then(result => {
				if(result.status===201) {
						let data = result.data
						console.log(data)
						let newUpdate = {
							id: data.id,
							content: data.content,
							time: parseHourMinute(new Date(data.created))
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
						setUpdates([...updates, newUpdate])
						garbageCollection()
				}
			}).catch(err => {
				console.log(err)
			})
		} else {
			alert(errorMessages.lacks_payload_content)
		}
	}
	{/* At least one field among content, image and tweet must not be null before we send a request to the API */}
	function validatePayload() {
		let contentExists = updateTextArea.length > 0
		let tweetExists = tweetID.length > 0
		return picture || contentExists || tweetExists;
	}
	function parseHourMinute(date) {
		return date.getHours() + ':' + ('0'+ date.getMinutes()).slice(-2)
	}
	function handleClick() {
		dispatchPayload()
	}
	function handleTwitterDialogOpen() {
		setTwitterDialogOpen(true)
	}
	function handleTwitterDialogClose() {
		setTwitterDialogOpen(false)
		let parseURL = tweetURL.split('/')
		let path = parseURL[parseURL.length-1]
		{/* removes suplemental information after the tweet's id */}
		let id = path.split('?')[0]
		setTweetID(id)
		setPreviewModalOpen(true)
	}
	function garbageCollection() {
		setTweetID('')
		setPicture(false)
		setUpdateTitle('')
		setUpdateTextArea('')
	}
	function handleImageUploadDialogOpen(e){
		e.preventDefault()
		setImageUploadModalOpen(true)
	}
	function handleImageUploadDialogClose() {
			setImageUploadModalOpen(false)
			dispatchPayload()
	}
	function handlePreviewModalClose() {
		dispatchPayload()
		setPreviewModalOpen(false)
	}
	function handleChange(e) {
		setUpdateTextArea(e.target.value)
	}
	function onImageDrop(picture) {
		picture.length > 0 ? setPicture(picture[0]) : setPicture(false)
	}
	function startUpdateWithTitleFlow(e, title) {
		handleSessionTitle(title)
		handleImageUploadDialogOpen(e)
	}
	function handleSessionTitle(title) {
		title.length > 0 ? setUpdateTitle(title) : setUpdateTitle('')
	}
	return (
		<div className={classes.body}>
			<Header></Header>
			<SummaryBox sessionID={sessionID}></SummaryBox>
			<StatusSelection startUpdateWithTitleFlow={startUpdateWithTitleFlow}></StatusSelection>
			<NewUpdate handleClick={handleClick}
								 handleTwitterDialogOpen={handleTwitterDialogOpen}
								 handleImageUploadDialogOpen={handleImageUploadDialogOpen}
								 updateTextArea={updateTextArea}
								 handleChange={handleChange}></NewUpdate>
			<TwitterDialog handleTwitterDialogClose={handleTwitterDialogClose}
										 twitterDialogOpen={twitterDialogOpen}
										 setTweetURL={setTweetURL}></TwitterDialog>
			<ImageUploadDialog imageUploadModalOpen={imageUploadModalOpen}
												 handleImageUploadDialogClose={handleImageUploadDialogClose}
												 setImageUploadModalOpen={setImageUploadModalOpen}
												 updateTitle={updateTitle}
												 setUpdateTitle={setUpdateTitle}
												 handleChange={handleChange}
												 onImageDrop={onImageDrop}
												 time={time}></ImageUploadDialog>
			<PreviewDialog previewModalOpen={previewModalOpen}
										 handlePreviewModalClose={handlePreviewModalClose}
										 setPreviewModalOpen={setPreviewModalOpen}
										 handleChange={handleChange}
										 tweetID={tweetID}
										 time={time}></PreviewDialog>
			<Feed updates={updates}></Feed>
		</div>
	)
}
