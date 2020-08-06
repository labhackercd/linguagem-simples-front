import React from 'react';
import { Grid } from '@material-ui/core';
import TitleRow from '../TitleRow';
import Update from '../Update';

export default function Timeline() {
	return (
		<Grid container>
			<Grid container>
				<TitleRow></TitleRow>
			</Grid>
			<Grid container>
        <Update></Update>
			</Grid>
		</Grid>
	)
}
