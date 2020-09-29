import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';



export default function CongressPersonLine(props){
 
    return(
        <Box width="100%" marginTop={0.5}>
            <Grid container>
                <Grid item xs={8}>
                    <Typography style={{ color: "#666666" }} variant="body1">{props.data.nome} ({props.data.partido}-{props.data.uf})</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" justifyContent="flex-end">
                    {props.data.legendaPresenca === "P"
                        ? <Typography style={{ color: "green" }}  variant="body1">Presente</Typography>
                        : <Typography style={{ color: "red" }}  variant="body1">Ausente</Typography>
                    }       
                    </Box>
                </Grid>
            </Grid>
            <Divider light />
        </Box>
    );
}
