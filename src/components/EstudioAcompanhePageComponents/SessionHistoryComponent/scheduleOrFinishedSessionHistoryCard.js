import React from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as DocumentIcon } from './assets/document_icon.svg';
import ScheduleIcon from './assets/schedule_session.svg'
import FinishedIcon from './assets/finished_session.svg'
import 'date-fns';
import FormatStringData from './utils'

const useStyles = makeStyles({
    sessionHistoryCard:{
      background:'#F4F4F4',
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
  

export default function ScheduleOrFinishedSessionHistoryCard(props){
    const classes = useStyles();
    const sessionStatus = props.infoSession.situation_session;
    const sessionDate = FormatStringData(props.infoSession.date);


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
                                <Typography variant="body1">{sessionDate}</Typography>
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
