import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';



export default function CongressPersonLine(props){
    return(
        <Box width="100%" marginTop={0.5}>
        <Grid container>
            <Grid item xs={6}>
                <Typography style={{ color: "#666666" }} variant="body1">{props.data.nomReduzido}</Typography>
                </Grid>
                <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end">
                    <Typography style={{ color: "#666666" }}  variant="body1">{props.data.sigPartido}-{props.data.sigUF}</Typography>
                </Box>
            </Grid>
        </Grid>
        <Divider light />
    </Box>

    );
}
