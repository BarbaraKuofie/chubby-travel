import * as React from 'react';
import { useState, useEffect } from 'react';
// import { getReviews } from '../Service/DataApi';
import { Button, Card, CardContent, CardMedia, Typography, CardActions, Container } from '@mui/material';
import { classes } from '../Styles';
import AddReview from './AddReview';

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	const [openReviewModal, setOpenReviewModal] = useState(false);
	return (
		<Container sx={classes.container}>
			<AddReview open={openReviewModal} setOpen={setOpenReviewModal} />
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
			<Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => setOpenReviewModal(true)}>
				Submit A Review
			</Button>
		</Container>
	);
};

export default Reviews;