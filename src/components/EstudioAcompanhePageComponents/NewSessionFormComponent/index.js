import React from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

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

export default function NewSessionFormComponent(){
  const classes = useStyles();

    return (

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
                                value="Plenário"
                                InputProps={{
                                    className: classes.inputTextColor
                                  }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6" color="textSecondary"> Comissão </Typography></div>
                                <TextField id="selectComission" value="1" variant="outlined" size="small" fullWidth={true} disabled select>
                                    <MenuItem value="1">Selecione</MenuItem>
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
                                        value=""
                                        id="sessionDate"
                                        InputLabelProps={{
                                            shrink: true,
                                          }}
                                        inputVariant="outlined"
                                        size="small"
                                        />
                                    </MuiPickersUtilsProvider>

                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6"> Tipo de Sessão </Typography></div>
                                <TextField id="sessionType" value="1" variant="outlined" size="small" fullWidth={true} select>
                                    <MenuItem value="1">Selecione</MenuItem>
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6"> Canais de transmissão </Typography></div>
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                    id="acompanheTransmissionChannel"
                                    value="true"
                                    control={
                                        <Checkbox
                                          checked={true}
                                          name="checkedB"
                                          color="primary"
                                        />
                                    }
                                    label="Acompanhe"
                                    className={classes.inputBorderColor}
                                    />
                                    <FormControlLabel
                                    id="twitterTransmissionChannel"
                                    value="Twitter"
                                    control={<Checkbox color="primary" />}
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
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SendIcon />}
                >
                    Iniciar Sessão
                </Button>
            </Box>
        </Box>

    );

}

