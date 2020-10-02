import React from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SessionHappening from './assets/session_happening_icon.svg'
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBrLocale from "date-fns/locale/pt-BR";

import {fetchData,fetchCurrentSessionsData} from './fetchData'
import {DASHBOARD_BASE_URL} from '../../../api_urls'

import ScheduleOrFinishedSessionHistoryCard from './scheduleOrFinishedSessionHistoryCard'
import CurrentSessionHistoryCard from './currentSessionHistoryCard'

const useStyles = makeStyles({
  sessionList:{
    overflow: 'auto',
    maxHeight: 350,
    maxWidth: '100%'
  },
});


class SessionHistoryComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchDate: new Date(),
            sessionsList: [],
            currentSessionsList:null,
            dataLoaded:false,
        };
    }

    fetchSessions = async term => {
        try {
          const data = await fetchData();
          this.setState({sessionsList:data})

          const currentSessions = await fetchCurrentSessionsData();
          if(currentSessions !== null){
              this.setState({currentSessionsList:currentSessions})
          }
          
          this.setState({dataLoaded:true});
          
        } catch (error) {
            console.log("Erro")
            //throw error;
        }
      };

    componentDidMount(){
        this._isMounted = true;

        if(this._isMounted){
            this.fetchSessions();
        }
    }

    customListLink(props){
        let sessionId = props.value.id;
        let outgoingURL = DASHBOARD_BASE_URL + sessionId;
        return(
            <Link style={{ textDecoration: 'none' }} href={outgoingURL}  {...props} />
        )
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
                            <Grid item xs={8}>
                                <Box display="flex" justifyContent="flex-start" paddingBottom={2}>
                                    <Typography variant="h4" color="textSecondary">Histórico</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box display="flex" justifyContent="flex-end" paddingBottom={2}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        value={this.state.searchDate}
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
                    {(this.state.currentSessionsList !== null) &&
                        <Grid item xs={12}>
                            <Box paddingBottom={1}>
                                <Box paddingLeft={2}>
                                    <img src={SessionHappening} alt="Uma sessão em andamento"></img>
                                </Box>
                                <List className={classes.sessionList} disablePadding dense={true} style={{maxHeight: '100px', overflow: 'auto'}}>
                                    {this.state.currentSessionsList.map((session) =>
                                        <ListItem key={session.id} value={session} button component={this.customListLink}>
                                                <CurrentSessionHistoryCard infoSession={session}></CurrentSessionHistoryCard>
                                        </ListItem>
                                    )}
                                </List>
                            </Box>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <List className={classes.sessionList} disablePadding dense={true} style={{maxHeight: '250px', overflow: 'auto'}}z>
                        {this.state.sessionsList.map((session) =>
                            <ListItem key={session.id} value={session} button component={this.customListLink}>
                                    <ScheduleOrFinishedSessionHistoryCard infoSession={session}></ScheduleOrFinishedSessionHistoryCard>
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
