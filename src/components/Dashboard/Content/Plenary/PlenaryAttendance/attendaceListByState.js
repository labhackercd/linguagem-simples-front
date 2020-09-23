import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import LaunchIcon from '@material-ui/icons/Launch';
import Divider from '@material-ui/core/Divider';
import CongressPersonLine from './congressPersonLine'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class AttendanceListByState extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        plenaryAttendanceList: props.plenaryAttendanceList,
        states:[{"label":"Acre","value":"AC"},{"label":"Alagoas","value":"AL"},{"label":"Amap\u00e1","value":"AP"},{"label":"Amazonas","value":"AM"},{"label":"Bahia","value":"BA"},{"label":"Cear\u00e1","value":"CE"},{"label":"Distrito Federal","value":"DF"},{"label":"Esp\u00edrito Santo","value":"ES"},{"label":"Goi\u00e1s","value":"GO"},{"label":"Maranh\u00e3o","value":"MA"},{"label":"Mato Grosso","value":"MT"},{"label":"Mato Grosso do Sul","value":"MS"},{"label":"Minas Gerais","value":"MG"},{"label":"Paran\u00e1","value":"PR"},{"label":"Para\u00edba","value":"PB"},{"label":"Par\u00e1","value":"PA"},{"label":"Pernambuco","value":"PE"},{"label":"Piau\u00ed","value":"PI"},{"label":"Rio Grande do Norte","value":"RN"},{"label":"Rio Grande do Sul","value":"RS"},{"label":"Rio de Janeiro","value":"RJ"},{"label":"Rond\u00f4nia","value":"RO"},{"label":"Roraima","value":"RR"},{"label":"Santa Catarina","value":"SC"},{"label":"Sergipe","value":"SE"},{"label":"S\u00e3o Paulo","value":"SP"},{"label":"Tocantins","value":"TO"}],
        dataLoaded: false,
        listFilteredByState:null
    };
  }



  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          //this.fetchSessionsList();    
      }
  }

   filterArray(siglaUf){

    var newArray = this.state.plenaryAttendanceList.filter(function (el) {
        return el.sigUF === siglaUf
      });

    return newArray;
      
  }

  renderListItem = ({index, style}) => {
    
    return(
      <ListItem style={style} >   
        <CongressPersonLine data={this.state.plenaryAttendanceList[index]}></CongressPersonLine>
      </ListItem>
    )
  }

  render(){
    //console.log(this.state.news)
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Box style={{maxHeight: "21vh", overflow: "auto"}}>
               {this.state.states.map((uf) => (
                        <Box paddingBottom={0.5} width={"98%"}>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{backgroundColor:'#F2F2F2'}}
                                >
                                    <Typography >{uf.label}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box width="100%">
                                        <List>
                                            {(this.filterArray(uf.value)).map((item) => (
                                                    <ListItem>
                                                        <CongressPersonLine data={item}></CongressPersonLine>
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>  
                    )
                )}
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}