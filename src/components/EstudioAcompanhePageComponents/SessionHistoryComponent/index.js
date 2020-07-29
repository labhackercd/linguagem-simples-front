import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SvgIcon from '@material-ui/core/SvgIcon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import { ReactComponent as DocumentIcon } from './document_icon.svg';
import ScheduleIcon from './schedule_session.svg'
import FinishedIcon from './finished_session.svg'


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
  iconSessionHistoryCard:{
    background:'#FFFFFF',
    margin:5
  },
  boxPaper:{
      padding:"5px"
  }
});


export default function SessionHistoryComponent(){
  const classes = useStyles();

    return (

        <Box>
            <Grid container>
                <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-start" paddingBottom={3}>
                                    <Typography variant="h4" color="textSecondary">Histórico</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-end" paddingBottom={3}>
                                    <TextField
                                        id="standard-adornment-weight"
                                        endAdornment={<InputAdornment position="end"><SearchIcon></SearchIcon></InputAdornment>}
                                        size="small"
                                        type="date"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid item xs={12}>
                    <List className={classes.sessionList}>
                        <ListItem><Box><ScheduleSessionHistoryCard status="agendada"></ScheduleSessionHistoryCard></Box></ListItem>
                        <ListItem><Box><ScheduleSessionHistoryCard status="agendada"></ScheduleSessionHistoryCard></Box></ListItem>
                        <ListItem><Box><ScheduleSessionHistoryCard status="encerrada"></ScheduleSessionHistoryCard></Box></ListItem>
                        <ListItem><Box><ScheduleSessionHistoryCard status="agendada"></ScheduleSessionHistoryCard></Box></ListItem>
                        <ListItem><Box><ScheduleSessionHistoryCard status="agendada"></ScheduleSessionHistoryCard></Box></ListItem>
                        <ListItem><Box><ScheduleSessionHistoryCard status="agendada"></ScheduleSessionHistoryCard></Box></ListItem>
                    </List>
                </Grid>
            </Grid>
            <Box pt={2}>
                
            </Box>
        </Box>
    );
}

function ScheduleSessionHistoryCard(props){
    const classes = useStyles();
    const sessionStatus = props.status;

    return (
        <Paper elevation={0} className={classes.sessionHistoryCard}>
            <Grid container>
                <Grid item xs={2}>
                    <Paper elevation={0} className={classes.iconSessionHistoryCard}>
                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.boxPaper}>                           
                            {sessionStatus === "agendada" ? 
                                <AccessTimeIcon fontSize="large" style={{ color: "FAC915" }}></AccessTimeIcon>
                                : 
                                <SvgIcon fontSize="large"><DocumentIcon></DocumentIcon></SvgIcon>
                            }
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Box m={1}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="body1">17/07</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-end">
                                {sessionStatus === "agendada" ? 
                                    <img src={ScheduleIcon} alt="Status sessão agendada"></img>
                                    : 
                                    <img src={FinishedIcon} alt="Status sessão encerrada"></img>
                                }
                                    
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ color: "grey" }}>Sessão Deliberativa Extraordinária</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

