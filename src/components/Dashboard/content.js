import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '0 1.5rem 0 1.5rem'
  },
  header: {
    margin: '1rem 0 0 0',
    height: '10vh',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.primary.main
  },
  headerMenu: {
    alignItems: 'flex-end'
  },
  headerMenuItem: {
    display: 'flex',
    padding: '0 1rem 0 1rem'
  },
  firstRow: {
    height: '40vh',
    backgroundColor: "blue",
  },
  firstRowLeftColumn: {
    backgroundColor: "green",
  },
  firstRowRightColumn: {
    backgroundColor: "red",
  },
  secondRow: {
    height: '30vh',
    backgroundColor: "yellow"
  },
  thirdRow: {
    backgroundColor: "green",
    height: '30vh',
  }
}));

export default function Content() {
  const classes = useStyles();
  return (
		<Grid container className={classes.body}>
      <Grid container className={classes.header}>
        <Grid item className={classes.headerTitle}>
          <Typography variant="h3" className={classes.title}>Conteúdos</Typography>
        </Grid>
        <Grid item className={classes.headerMenu}>
          <a href="/"><Typography variant="h5" className={classes.headerMenuItem}> Sincronizar </Typography></a>
          <a href="/"><Typography variant="h5" className={classes.headerMenuItem}> Ver Acompanhe </Typography></a>
        </Grid>
      </Grid>
      <Grid container className={classes.firstRow}>
        <Grid item md={6} className={classes.firstRowLeftColumn}>
        </Grid>
        <Grid item md={6} className={classes.firstRowRightColumn}>
        </Grid>
      </Grid>
      <Grid container className={classes.secondRow}>
      </Grid>
      <Grid container className={classes.thirdRow}>
      </Grid>
		</Grid>
  )
}
