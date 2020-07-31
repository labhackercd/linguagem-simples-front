import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/Dashboard/sidebar';
import Timeline from '../../components/Dashboard/timeline';
import Content from '../../components/Dashboard/content';

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

const plenaryUpdates = [
  {title: 'REQ 1502/2020',
   link: '/',
   authors: 'Autores: Wellington Roberto (PL-PB), Arthur Lira (PP-AL) Fred Costa (PATRIOTA-MG), Jhonatan de Jesus (REPUBLIC-RR) , Wolney Queiroz (PDT-PE)'},
  {title: 'REQ 104/2020',
   link: '/',
   authors: 'Autora: Christiane de Souza Yared(PL-PR)'},
  {
    title: 'REQ 2801/2020',
    link: '/',
    authors: 'Felipe Rigoni(PL-PR)'
  }]

export default function Dashboard() {
  	const classes = useStyles();
		return (
			<Grid container className={classes.body}>
				<Grid item md={1} className={classes.sidebar}>
					<Sidebar></Sidebar>
				</Grid>
				<Grid item md={4} className={classes.timeline}>
          <Timeline></Timeline>
				</Grid>
				<Grid item md={7} className={classes.content}>
          <Content></Content>
				</Grid>
			</Grid>
		)
}
