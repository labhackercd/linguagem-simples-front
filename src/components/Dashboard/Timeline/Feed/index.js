import React, {useState} from 'react';
import {Paper,Button, Popover, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  IconButton, List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import { ReactComponent as MoreOptionsIcon } from './../../../../assets/more_options_icon.svg';
import { ReactComponent as LixeiraIcon } from './../../../../assets/lixeira.svg';
import { ReactComponent as EditIcon } from './../../../../assets/edit_icon.svg';
import { parseHourMinute } from './../../../Util';
import { ReactTinyLink } from 'react-tiny-link';

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		borderRadius: 0,
		width: '14%',
		boxShadow: '0px -1px 10px -2px rgba(71,71,71,0.05)',
	},
  updatesArea: {
    overflow: 'auto',
    maxHeight: '50vh',
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
		width: '100%'
	},
}))

export default function Feed(props) {
  const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	}

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

  return (
    <Grid container className={classes.updatesArea}>
      <List style={{width: '100%'}}>
          {props.updates ? props.updates.slice(0).reverse().map(update =>  //creates a shallow copy of the array and reverses it
						<ListItem divider key={update.id}>
              <Grid container>
                <Grid item xs={2}>
                  <Typography variant="h6">
										{parseHourMinute(update.created)}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Grid container className={classes.itemHeader}>
                    <Typography variant="h5" className={classes.title}>
                      {update.title}
                    </Typography>
                    <Grid item>
											<IconButton aria-describedby={id} onClick={handleClick}>
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
													<Grid item className={classes.popoverItem}>
														<EditIcon/><h5 style={{alignSelf: 'flex-start'}}>Editar</h5>
													</Grid>
													<Grid item className={classes.popoverItem}>
														<LixeiraIcon /><h5 style={{alignSelf: 'flex-start'}}>Excluir</h5>
													</Grid>
												</Grid>
											</Popover>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.timelinePost}>
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
          ) : ''}
      </List>
    </Grid>
  )
}
