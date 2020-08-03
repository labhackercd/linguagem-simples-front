import React, {useState} from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitleRow from './titleRow';
import SummaryBox from './summaryBox';
import NewUpdate from './newUpdate';

const useStyles = makeStyles((theme) => ({
  summaryBox: {
  	height: '30vh',
  },
  updateSection: {
  	height: '70vh',
  },
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
			<Grid container className={classes.updateSection}>
        <NewUpdate></NewUpdate>
			</Grid>
		</Grid>
	)
}
