import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import  UserIcon  from './../../../assets/User.svg';
import  HomeIcon  from './../../../assets/Home.svg';
import  ACIcon  from './../../../assets/AC.svg';
import  ExitIcon  from './../../../assets/Exit.svg';

const useStyles = makeStyles((theme) => ({
  sidebar: {
  	backgroundColor: "#00AF82",
  	display: 'flex',
  	flexDirection: 'column',
  	justifyContent: 'space-between',
  	height: '100%',
  },
  user: {
  	display: 'flex',
  	alignSelf: 'center',
  	margin: '1rem 1rem 0 0'
  },
  middleSection: {
  	display: 'flex',
  	flexDirection: 'column',
  	justifyContent: 'space-around',
  	alignItems: 'center',
  },
  middleIcon: {
  	padding: '1rem 0 0 0'
  },
  exit: {
  	display: 'flex',
  	alignSelf: 'center',
    alignContent: 'flex-end',
  },
  exitIcon: {
    display: 'flex',
    alignSelf: 'flex-end',
    margin: '0 0 1rem 0'
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
		<Grid container className={classes.sidebar}>
			<Grid item md={3} className={classes.user}>
				<a href="/"><img src={UserIcon} alt="user icon"/></a>
			</Grid>
			<Grid container className={classes.middleSection}>
				<Grid item md={6} className={classes.middleIcon}>
					<a href="/"><img src={HomeIcon} alt="home icon"/></a>
				</Grid>
				<Grid item md={6} className={classes.middleIcon}>
					<a href="/"><img src={ACIcon} alt="AC icon"/></a>
				</Grid>
			</Grid>
			<Grid item md={3} className={classes.exit}>
        <div className={classes.exitIcon}>
				    <a href="/"><img src={ExitIcon} alt="Exit icon"/></a>
        </div>
			</Grid>
		</Grid>
  )
}
