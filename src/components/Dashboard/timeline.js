import React, {useState} from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TitleRow from './titleRow';
import NewUpdate from './newUpdate';

export default function Timeline() {
	return (
		<Grid container>
			<Grid container>
				<TitleRow></TitleRow>
			</Grid>
			<Grid container>
        <NewUpdate></NewUpdate>
			</Grid>
		</Grid>
	)
}
