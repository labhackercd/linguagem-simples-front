import React from 'react';
import { Grid } from '@material-ui/core';
import TitleRow from '../TitleRow';
import Update from '../Update';

export default function Timeline(props) {
	return (
		<Grid container>
			<Grid container>
				<TitleRow></TitleRow>
			</Grid>
			<Grid container>
        <Update sessionID={props.sessionID}></Update>
			</Grid>
		</Grid>
	)
}
