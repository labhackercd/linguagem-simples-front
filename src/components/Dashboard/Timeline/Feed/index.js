import React, {useState, useEffect} from 'react';
import { Paper,Button, Popover, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  IconButton, List, ListItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { ReactComponent as MoreOptionsIcon } from './../../../../assets/more_options_icon.svg';
import { ReactComponent as LixeiraIcon } from './../../../../assets/lixeira.svg';
import { ReactComponent as EditIcon } from './../../../../assets/edit_icon.svg';
import { ReactComponent as CoffeMugIcon } from './../../../../assets/coffee-mug-icon.svg';
import { parseHourMinute } from './../../../Util';
import { ReactTinyLink } from 'react-tiny-link';
import { deletePostFromFeed } from './../timelineAPIhandler';

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		borderRadius: 0,
		width: '8%',
		boxShadow: '0px -1px 10px -2px rgba(71,71,71,0.3)',
	},
  updatesArea: {
    overflow: 'auto',
    maxHeight: '50vh',
  },
	updatesAreaNoPosts: {
		overflow: 'auto',
		height: '50vh',
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
	},
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.primary.main
  },
  timelinePost: {
    overflow: 'auto',
    overflowWrap: 'break-word',
    display: 'flex',
    margin: '1rem 0',
    maxHeight: '25vh',
  },
	popover: {
		padding: '1rem',
		display: 'flex',
	},
	popoverItem: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	excludeText: {
		margin: '0 0 0 0.5rem',
	},
	editText: {
		color: '#C4C4C4',
	},
	alignIcon: {
		alignSelf: 'center',
	},
	noUpdate: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textNoUpdate: {
		color: '#989898',
		width: '60%',
		textAlign: 'center',
	}
}))

export default function Feed(props) {
  const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null)
	const [updates, setUpdates] = useState('')
	const { handleDeletePost } = props
	const [postToBeDeleted, setPostToBeDeleted] = useState('')

	useEffect(() => {
		if(props.updates) {
			const filteredUpdates = props.updates.filter(update => update.state === "published")
			setUpdates(filteredUpdates)	
		}
	}, [props.updates]);

	const handleClick = (event, update) => {
		setPostToBeDeleted(update)
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setPostToBeDeleted('')
		setAnchorEl(null);
	}

	const deletePost = async (e) => {
		e.preventDefault()
		handleDeletePost(postToBeDeleted.id)
		setPostToBeDeleted('')
		setAnchorEl(null);
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

  return (
    <Grid container className={classes.updatesArea}>
      <List style={{width: '100%'}}>
          {updates.length > 0 ? updates.slice(0).reverse().map(update =>  //creates a shallow copy of the array and reverses it
						<ListItem divider key={update.id}>
              <Grid container>
                <Grid item xs={2}>
                  <Typography variant="h6">
										{parseHourMinute(update.created)}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Grid container id={'item-header'} className={classes.itemHeader}>
                    <Typography variant="h5" className={classes.title}>
                      {update.title}
                    </Typography>
                    <Grid item>
											<IconButton id={'more-options-icon'} onClick={(e) => handleClick(e, update)}>
	                    	<MoreOptionsIcon />
											</IconButton>
											<Popover
												id={id}
												open={open}
												anchorEl={anchorEl}
												onClose={handleClose}
												elevation={0}
												PaperProps={{ classes: {root: classes.dialogPaper } }}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'center',
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'center',
												}}
											>
											<Grid container className={classes.popover}>
													<Grid container className={classes.popoverItem} >
														<Grid item xs={4} className={classes.alignIcon}>
															<IconButton>
																<EditIcon width="20" height="20"/>
															</IconButton>
														</Grid>
														<Grid item xs={8} className={classes.alignIcon}>
															<h5 className={classes.editText}>Editar</h5>
														</Grid>
													</Grid>
													<Grid item className={classes.popoverItem}>
														<Grid container className={classes.popoverItem}>
															<Grid item xs={4} className={classes.alignIcon}>
																<IconButton onClick={(e) => deletePost(e)}>
																	<LixeiraIcon width="20" height="20"/>
																</IconButton>
															</Grid>
															<Grid item xs={8} className={classes.alignIcon}>
																<a href="#" style={{textDecoration: 'none', color: 'inherit'}}>
																<Typography variant="h5"
																		className={classes.excludeText}
																		id={'delete-post-button'}
																		onClick={(e) => deletePost(e)}>Excluir</Typography></a>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Popover>
                    </Grid>
                  </Grid>
                  <Grid container id={'timeline-post'} className={classes.timelinePost}>
                    <div style={{width: '100%'}}>
                      <Typography
												style={{color: '#666', alignSelf: 'flex-start', whiteSpace: 'pre-line'}}
												variant="body1">
												{update.updateTextArea ?
												 update.updateTextArea :
												 ''
												}</Typography>
                    </div>
                    <section style={{width: '100%'}}>
                      {update.tweet_id ?
                        <TwitterTweetEmbed
                          style={{width: '100%', margin: '0 0 1rem 0'}}
                          tweetId={update.tweet_id}
                        /> : '' }
                      {update.image ?
                       <img src={update.image}  style={{maxWidth: '100%', maxHeight: '30vh'}} alt="timeline post"/> : '' }
											{update.customURL && !(props.URLInputIsTwitter) ?
												<ReactTinyLink
													cardSize="small"
													showGraphic={true}
													maxLine={2}
													minLine={1}
													url={update.customURL} /> :
													''}
                    </section>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          ) :
					<Grid container className={classes.updatesAreaNoPosts}>
						<Grid item className={classes.noUpdate}>
							<CoffeMugIcon />
							<Typography variant="h5" className={classes.textNoUpdate}> Você não possui atualizações </Typography>
						</Grid>
					</Grid>
				}
      </List>
    </Grid>
  )
}
