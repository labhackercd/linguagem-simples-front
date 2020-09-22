import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'

import LaunchIcon from '@material-ui/icons/Launch';
import Divider from '@material-ui/core/Divider';

//import axios from 'axios'


export default function AgendaCard(props){
    //console.log(props)
    /*
    const [description, setDescription] = useState("");

    async function fetchData(){
        //const response = await axios.get(props.pautaInfo.proposicao_.uri+"/autores");
        //console.log(response)
        //console.log(response.data.dados[0].nome)
    }

    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
        fetchData();
      });*/

    return (
        <Box width="97%"  >
            <Paper elevation={0} >
                <Box m={1}>
                    <Grid container>
                        <Grid item xs={10}>
                            <Box fontWeight="fontWeightRegular">
                                <Typography variant="h6" style={{ color: "#007E5A" }}>
                                    {props.pautaInfo.proposicao_.siglaTipo}  {props.pautaInfo.proposicao_.numero}/ {props.pautaInfo.proposicao_.ano}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end">
                                <a rel={'external noopener noreferrer'} target="_blank" href={props.pautaInfo.proposicao_.uri} style={{textDecoration: "none"}}>
                                    <IconButton aria-label="Ir para Proposicao" size="small">
                                        <LaunchIcon  fontSize="inherit" />
                                    </IconButton>    
                                </a>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box fontSize={11}>
                            <Typography style={{ color: "gray" }}>
                                Texto Descritivo dos autores da proposição.
                                Deputado X, Deputado Y
                            </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>        
                <Divider variant="middle" />
            </Paper>
        </Box>
    );
}