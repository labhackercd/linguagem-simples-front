import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/Dashboard/sidebar';

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#F2F2F2",
    border: 0,
    height: '100vh',
    width: '100%',
    position: 'relative',
    display: 'flex',
    fontFamily: 'Open sans',
  },
  timeline: {
  	backgroundColor: "#FFF",
  },
  sidebar: {
  	backgroundColor: "#00AF82"
  },
  content: {
  	backgroundColor: "#F2F2F2",
  }
}));

export default function Dashboard() {
  	const classes = useStyles();
		return (
			<Grid container className={classes.body}>
				<Grid item md={1} className={classes.sidebar}>
					<Sidebar></Sidebar>
				</Grid>
				<Grid item md={4} className={classes.timeline}>
				</Grid>
				<Grid item md={7} className={classes.content}>
				</Grid>
			</Grid>
		)
}