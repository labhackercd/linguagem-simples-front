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

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
            sessionDate:new Date(),
            sessionType:"" ,
            acompanheTransmissionChannel:true,
            twitterTransmissionChannel:false
        };
        this.handleSessionDateChange = this.handleSessionDateChange.bind(this);
        this.handleSessionTypeChange = this.handleSessionTypeChange.bind(this);
        this.handleAcompanheTransmissionChannelChange = this.handleAcompanheTransmissionChannelChange.bind(this);
        this.handleTwitterTransmissionChannelChange = this.handleTwitterTransmissionChannelChange.bind(this);
        this.submitCreateSessionForm = this.submitCreateSessionForm.bind(this);
    }

    handleSessionDateChange = (e) =>
    {
      this.setState({sessionDate: e.target.value});
      console.log(this.state.sessionDate)
    };
    
    handleSessionTypeChange = (e) =>
    {
      this.setState({sessionType: e.target.value});
      console.log(this.state.sessionType)
    };

    handleAcompanheTransmissionChannelChange = (e) =>
    {
      this.setState({acompanheTransmissionChannel: e.target.checked});
      console.log(this.state.acompanheTransmissionChannel)
    };

    handleTwitterTransmissionChannelChange = (e) =>
    {
      this.setState({twitterTransmissionChannel: e.target.checked});
      console.log(this.state.twitterTransmissionChannel)
    };

    submitCreateSessionForm = (event) =>
    {
        event.preventDefault();

        axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(
                result => {
                  console.log(result)
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                    this.setState({succesfullLogin:true})
                }
        ).catch (error => {
            throw error;
        })

    };

    render(){
    const { classes } = this.props;

        return(
        <Box>
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
                            <div><Typography variant="h6"> Local </Typography></div>
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
                            <div><Typography variant="h6" color="textSecondary"> Comissão </Typography></div>
                            <TextField id="selectComission" value="" variant="outlined" size="small" fullWidth={true} disabled select>
                                <MenuItem value="">Selecione</MenuItem>
                                <MenuItem value="Virtual">Virtual</MenuItem>
                                <MenuItem value="Presencial">Presencial</MenuItem>
                            </TextField>
                        </Box>

                    </Grid>
                    <Grid item xs={5}>
                        <Box display="block" justifyContent="flex-start" >
                            <div><Typography variant="h6"> Data </Typography></div>

                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
                                <KeyboardDatePicker
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
                            <div><Typography variant="h6"> Tipo de Sessão </Typography></div>
                            <TextField id="sessionType" value="1" variant="outlined" size="small" fullWidth={true} select onChange={(e)=>{this.handleSessionTypeChange(e)}}>
                                <MenuItem value="1">Sessão Deliberativa Extraordinária</MenuItem>
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="block" justifyContent="flex-start" >
                            <div><Typography variant="h6"> Canais de transmissão </Typography></div>
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
                                    <Checkbox color="primary" checked={this.state.twitterTransmissionChannel}  
                                               onChange={(e)=>{this.handleTwitterTransmissionChannelChange(e)}} 
                                               name="checkedTwitterTransmissionChannel"/>
                                }
                                label="Twitter"
                                onChange={(e)=>{this.handleTwitterTransmissionChannelChange(e)}}
                                />
                            </FormGroup>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
        <Box pt={4} pb={8}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SendIcon />}
                onClick={() => { this.submitCreateSessionForm() }}
            >
                Iniciar Sessão
            </Button>
        </Box>
    </Box>

        )
    }
}

export default withStyles(useStyles)(NewSessionFormComponent);