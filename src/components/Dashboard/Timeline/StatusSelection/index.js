import React, {useState} from 'react';
import {Paper,Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
	      DialogTitle, Grid, Typography, Box,  List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	summaryBox: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	summaryHeader: {
  	display: 'flex',
		margin: '1rem 0 1rem 0',
  },
  tabs: {
    display: 'flex',
    minHeight: '0px',
    margin: '0.5rem 0 0 0',
    overflow: 'auto',
    flexWrap: 'no-wrap',
  },
  tab: {
    whiteSpace: 'nowrap',
    padding: '0 0.5rem',
    margin: '0 0.3rem',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
    minHeight: '0px',
    minWidth: 'auto',
    textTransform: 'capitalize'
  },
}))
export default function StatusSelection(props) {
  const classes = useStyles();
  const [titlesArray] = useState([
                                  'Pré-sessão',
                                  'Sessão Iniciada',
                                  'Votação Iniciada',
                                  'Votação Encerrada',
                                  'Próxima Pauta',
                                  'Sessão Encerrada',
                                  'Fim da transmissão'])
  return (
    <Grid container className={classes.summaryBox}>
      <Grid container className={classes.summaryHeader} style={{margin: '1rem 0 0 0'}}>
        <Grid item md={6} style={{display:'flex', justifyContent: 'flex-start'}}>
          <Typography variant="h5"> Status </Typography>
        </Grid>
        <Grid item md={6} style={{display:'flex', justifyContent: 'flex-end'}}>
        </Grid>
      </Grid>
      <Grid className={classes.tabs}>
          {titlesArray.map(function(title, index){
          return <Button key={index} uvariant="contained"
												 onClick={(e) => props.startUpdateWithTitleFlow(e, title)}
												 disableElevation
												 disabled={!props.broadcastingOnline}
												 className={classes.tab}>{title}</Button>
        })}
      </Grid>
    </Grid>
  )
}
