import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { ReactComponent as DocumentIcon } from './assets/document_icon.svg';
import ScheduleIcon from './assets/schedule_session.svg'
import FinishedIcon from './assets/finished_session.svg'
import StartedIcon from './assets/session_started.svg'
import SessionHappening from './assets/session_happening_icon.svg'
import CircularProgress from '@material-ui/core/CircularProgress';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBrLocale from "date-fns/locale/pt-BR";

import axiosInstance from '../../../auth/axiosApi.js'


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


function ScheduleOrFinishedSessionHistoryCard(props){
    const classes = useStyles();
    const sessionStatus = props.status;

    return (
        <Paper elevation={0} className={classes.sessionHistoryCard}>
            <Grid container>
                <Grid item xs={2}>
                    <Paper elevation={0} className={classes.iconSessionHistoryCard}>
                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.boxPaper}>                           
                            {sessionStatus === "pre_session" ? 
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
                                {sessionStatus === "pre_session" ? 
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

function CurrentSessionHistoryCard(props){
    const classes = useStyles();

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
                                <Typography variant="body1">17/07</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-end">
                                    <img src={StartedIcon} alt="Status sessão agendada"></img>
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


class SessionHistoryComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sessionsList: [],
            dataLoaded:false,
        };

    }

    loadSessions(callback){
        axiosInstance.get('/sessions/', {
        }).then(
            result => {
                console.log(result)
                console.log(result.data)
                if(result.status===200){
                    this.setState({sessionsList:result.data})
                }else{
                    alert("Erro ao recuperar sessões");
                }
                callback()
            } 
        ).catch (error => {
            throw error;
        })
    }

    componentDidMount(){
        this._isMounted = true;

        if(this._isMounted){
            this.loadSessions(() => {
                console.log("Data:" + this.state.sessionsList)
                this.setState({dataLoaded:true});
 
            });
        }
    }


    render(){
        const { classes } = this.props;

        if(!this.state.dataLoaded){
            return (<Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress></CircularProgress>
                    </Box>)
        }

        return(
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
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            value=""
                                            format="dd/MM/yyyy"
                                            id="date-picker-search"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Box>
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box paddingLeft={2}>
                        <img src={SessionHappening} alt="Uma sessão em andamento"></img>
                        </Box>

                        <List className={classes.sessionList} disablePadding dense={true}>
                        {this.state.sessionsList.map((session) =>
                            <ListItem key={session.id} value={session}> 
                                { (session.situation_session === "pre_session" || session.situation_session === "closed_session") ?
                                    <ScheduleOrFinishedSessionHistoryCard status={session.situation_session}></ScheduleOrFinishedSessionHistoryCard> :
                                    <CurrentSessionHistoryCard></CurrentSessionHistoryCard>
                                }
                            </ListItem>
                        )}

                        </List>
                    </Grid>
                </Grid>
                <Box pt={2}>
                    
                </Box>
            </Box>
        )
    }
}

export default withStyles(useStyles)(SessionHistoryComponent);