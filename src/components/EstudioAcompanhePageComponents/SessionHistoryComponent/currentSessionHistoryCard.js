import React from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import StartedIcon from './assets/session_started.svg'
import 'date-fns';
import FormatStringData from './utils';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';


const useStyles = makeStyles({
  root: {
    background:'#007E5A',
    border: 0,
    height: '100%',
    width: '100%',
    position: "fixed",
    display: "flex"
  },
  sessionList:{
    overflow: 'auto',
    maxHeight: 350,
    maxWidth: '100%'
  },
  input:{
      color: "green"
  },
  sessionHistoryCard:{
    background:'#F4F4F4',
  },
  currentSessionHistoryCard:{
    background:'#00AF82',
    color: 'white',
  },
  iconCurrentSessionHistoryCard:{
    background:'#007E5A',
    margin:5
  },
  iconSessionHistoryCard:{
    background:'#FFFFFF',
    margin:5
  },
  boxPaper:{
      padding:"5px"
  }
});



export default function CurrentSessionHistoryCard(props){
    const classes = useStyles();
    const sessionDate = FormatStringData(props.infoSession.date);

    return (
        <Paper elevation={0} className={classes.currentSessionHistoryCard}>
            <Grid container>
                <Grid item xs={2}>
                    <Paper elevation={0} className={classes.iconCurrentSessionHistoryCard}>
                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.boxPaper}>
                            <FormatListBulletedIcon fontSize="large" style={{ color: "#FFFFFF" }}></FormatListBulletedIcon>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Box m={1}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="body1">{sessionDate}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-end">
                                    <img src={StartedIcon} alt="Status sessão iniciada"></img>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">Sessão Deliberativa Extraordinária</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}