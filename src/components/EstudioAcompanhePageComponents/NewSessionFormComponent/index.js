import React from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import {Redirect } from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Alert, AlertTitle } from '@material-ui/lab';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBrLocale from "date-fns/locale/pt-BR";
import {DASHBOARD_BASE_URL} from '../../../api_urls'
import createSessionRequest from './createSessionRequest'
import CreatingSessionDialog from './dialogCreateSessionAlert'

const useStyles = makeStyles({
  root: {
    background:'#007E5A',
    border: 0,
    height: '100%',
    width: '100%',
    position: "fixed",
    display: "flex"
  },
  inputBorderColor:{
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "green"
      },
  },
  inputTextColor:{
    color:'green',
  }
});

class NewSessionFormComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            sessionPlace: "Plenário", 
            comission: "",
            sessionDate: new Date(),
            sessionType:"virtual" ,
            acompanheTransmissionChannel:true,
            twitterTransmissionChannel:false,
            sessionIdDadosAbertos:"",
            openCreatingSessionModal:false,
            sucessfullCreatedSession:false,
            idSessionCreatedToRedirect:null,
            errorCreateSession:false
        };
        this.handleSessionDateChange = this.handleSessionDateChange.bind(this);
        this.handleSessionTypeChange = this.handleSessionTypeChange.bind(this);
        this.handleAcompanheTransmissionChannelChange = this.handleAcompanheTransmissionChannelChange.bind(this);
        this.handleTwitterTransmissionChannelChange = this.handleTwitterTransmissionChannelChange.bind(this);
        this.submitCreateSessionForm = this.submitCreateSessionForm.bind(this);
    }

    handleSessionDateChange = (e) =>
    {
      this.setState({sessionDate: e});
    };
    
    handleSessionTypeChange = (e) =>
    {
      this.setState({sessionType: e.target.value});
    };

    handleAcompanheTransmissionChannelChange = (e) =>
    {
      this.setState({acompanheTransmissionChannel: e.target.checked});
    };

    handleTwitterTransmissionChannelChange = (e) =>
    {
      this.setState({twitterTransmissionChannel: e.target.checked});
    };

    async createSession(callback){
        const sessionJson = {
            location: "plenary",
            date:new Date(this.state.sessionDate).toISOString().slice(0,10),
            type_session: this.state.sessionType,
            situation_session:"pre_session",
            resume: "",
            enable:false
        }
        try{
            await this.setState({openCreatingSessionModal:true});

            const response = await createSessionRequest(sessionJson);

            if(response !== null){
                await this.setState({idSessionCreatedToRedirect:response.id, sucessfullCreatedSession:true});
            }

        }catch(e){
            await this.setState({errorCreateSession:true})
            await this.setState({openCreatingSessionModal:false});
            //Set error message here informing
        }
        
    }

    submitCreateSessionForm = (event) =>
    {
        event.preventDefault();

        this.createSession();
    };
    render(){
    const { classes } = this.props;
    
    if(this.state.sucessfullCreatedSession) {
        return <Redirect to={DASHBOARD_BASE_URL+this.state.idSessionCreatedToRedirect}/>
    }

    return(
        <Box>
            { this.state.errorCreateSession &&
                <div>
                    <Alert severity="error" style={{width:"95%",height:"100%"}}>
                    <AlertTitle>Erro :(</AlertTitle>
                        Um erro ocorreu ao tentar criar uma nova sessão. Tente novamente mais tarde!
                    </Alert>
                </div>
            }
            <CreatingSessionDialog open={this.state.openCreatingSessionModal}></CreatingSessionDialog>
            <Grid container>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-start" paddingBottom={3}>
                        <Typography variant="h4" color="textSecondary">Nova sessão</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography style={{ color: "#666666" }} variant="h6"> Local </Typography></div>
                                <TextField
                                className={classes.inputBorderColor}
                                id="sessionPlace"
                                variant="outlined"
                                size="small"
                                color="primary"
                                value={this.state.sessionPlace}
                                InputProps={{
                                    className: classes.inputTextColor
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6" style={{ color: "#C4C4C4" }}> Comissão </Typography></div>
                                <TextField id="selectComission" value="" variant="outlined" size="small" fullWidth={true} disabled select>
                                    <MenuItem value="">Selecione</MenuItem>
                                </TextField>
                            </Box>

                        </Grid>
                        <Grid item xs={5}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6" style={{ color: "#666666" }}> Data </Typography></div>

                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
                                    <KeyboardDatePicker
                                        disablePast
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        value={this.state.sessionDate}
                                        id="sessionDate"
                                        InputLabelProps={{
                                            shrink: true,
                                            }}
                                        inputVariant="outlined"
                                        size="small"
                                        onChange={(e)=>{this.handleSessionDateChange(e)}}
                                        />
                                    </MuiPickersUtilsProvider>

                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6" style={{ color: "#666666" }}> Tipo de Sessão </Typography></div>
                                <TextField id="sessionType" value={this.state.sessionType} variant="outlined" size="small" fullWidth={true} select onChange={(e)=>{this.handleSessionTypeChange(e)}}>
                                    <MenuItem value="virtual">Virtual</MenuItem>
                                    <MenuItem value="presential">Presencial</MenuItem>
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6" style={{ color: "#666666" }}> Canais de transmissão </Typography></div>
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                    id="acompanheTransmissionChannel"
                                    control={
                                        <Checkbox color="primary" checked={this.state.acompanheTransmissionChannel}  
                                                onChange={(e)=>{this.handleAcompanheTransmissionChannelChange(e)}} 
                                                name="checkedAcompanheTransmissionChannel"/>
                                    }
                                    label="Acompanhe"
                                    className={classes.inputBorderColor}
                                
                                    />
                                    <FormControlLabel
                                    id="twitterTransmissionChannel"
                                    control={
                                        <Checkbox style={{ color: "#C4C4C4" }} disabled color="primary" checked={this.state.twitterTransmissionChannel}  
                                                onChange={(e)=>{this.handleTwitterTransmissionChannelChange(e)}} 
                                                name="checkedTwitterTransmissionChannel"/>
                                    }
                                    label="Twitter"

                                    />
                                </FormGroup>
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            <Box pt={4} pb={8}>
                <Button
                    id="submitButton"
                    style= {{textTransform: 'capitalize', backgroundColor:"#00AF82", color:"white"}}
                    variant="contained"
                    color="white"

                    className={classes.button}
                    startIcon={<SendIcon />}
                    onClick={(e) => { this.submitCreateSessionForm(e) }}
                >
                    Criar Sessão
                </Button>
            </Box>
        </Box>

        )
    }
}

export default withStyles(useStyles)(NewSessionFormComponent);