import React from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import MoreOptionsIcon from './../../../../assets/more_options_icon.svg';
import { parseHourMinute } from './../../../Util';
import { ReactTinyLink } from 'react-tiny-link';

const useStyles = makeStyles((theme) => ({
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
}))

export default function Feed(props) {
  const classes = useStyles();
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
                      <img src={MoreOptionsIcon} alt="more options icon"/>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.timelinePost}>
                    <div style={{width: '100%'}}>
                      <Typography style={{color: '#666', alignSelf: 'flex-start'}} variant="body1">
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
