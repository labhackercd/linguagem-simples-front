import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import CongressPersonLine from './congressPersonLine'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';


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

  async filterListByState(){
    const states = this.state.states;
    var filteredList = []

    for(var i = 0; i < states.length; i++) {
        let filteredArray = (this.state.plenaryAttendanceList).filter(it => it.uf.includes(states[i].value));
        let object = {siglaUf:states[i].value, uf:states[i].label, deputies:filteredArray};
        filteredList.push(object)
    }

    await this.setState({listFilteredByState:filteredList})
    this.setState({dataLoaded:true})
  }


  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.filterListByState();
          //this.fetchSessionsList();    
      }
  }

  render(){
    //console.log(this.state.news)
    if(!this.state.dataLoaded){
        return (        
          <Box display="flex" justifyContent="center" alignItems="center" minWidth="40vh" minHeight="10vh" width={1}>
            <LinearProgress></LinearProgress>
          </Box>
        )
    }

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box style={{maxHeight: "23vh", overflow: "auto"}}>
              <List>
               {this.state.listFilteredByState.map((state) => (
                  <ListItem key={state.uf} style={{paddingTop:0}}>
                    <Box width={"98%"}>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{backgroundColor:'#F2F2F2', minHeight:30}}
                            >
                                <Box width="100%">
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography style={{ color: "#666666" }} variant="body1">{state.uf}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Typography style={{ color: "#00AF82" }}  variant="body1">{state.deputies.length}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box width="100%">
                                    <List>
                                        {(state.deputies).map((item) => (
                                                <ListItem key={item.ideCadastro}>
                                                    <CongressPersonLine data={item}></CongressPersonLine>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                      </Box>  
                    </ListItem>
                  )
                )}
              </List>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}