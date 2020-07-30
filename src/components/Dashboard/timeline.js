import React, {useState} from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitleRow from './titleRow';
import SummaryBox from './summaryBox';

const useStyles = makeStyles((theme) => ({
  summaryBox: {
  	height: '40vh',
  },
  newUpdateBox: {
  	height: '30vh',
  	backgroundColor: 'blue'
  },
  postsTimeline: {
  	height: '50vh',
  	backgroundColor: 'purple'
  }
}));

export default function Timeline() {
	const classes = useStyles();
	const [updates, setUpdates] = useState([])
	return (
		<Grid container className={classes.body}>
			<Grid container>
				<TitleRow></TitleRow>
			</Grid>
			<Grid container className={classes.summaryBox}>
				<SummaryBox></SummaryBox>
			</Grid>
			<Grid container className={classes.newUpdateBox}>
			</Grid>
			<Grid container className={classes.postsTimeline}>
			</Grid>
		</Grid>
	)
}
