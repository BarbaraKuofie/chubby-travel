import * as React from 'react';
import { useState, useEffect } from 'react';
// import { getReviews } from '../Service/DataApi';
import { Button, Card, CardContent, CardMedia, Typography, CardActions, Container } from '@mui/material';
import { classes } from '../Styles';


const Reviews = () => {
	return (
		<Container sx={classes.container}>
			{/* <Card > */}
				{/* <CardMedia
					sx={classes.cardMedia}
					image="https://via.placeholder.com/150"
					title="Review Image"
				/> */}
				{/* <CardContent sx={classes.cardContent}> */}
					<Typography gutterBottom variant="subtitle1">
						Review Title
					</Typography>
					<Typography variant="body2" color="text.secondary">
						This is a sample review description. It provides insights about the property.
					</Typography>
				{/* </CardContent>
				<CardActions> */}
					<Button size="small" color="primary">
						Read More
					</Button>
				{/* </CardActions>
			</Card> */}
		</Container>
	);
};

export default Reviews;