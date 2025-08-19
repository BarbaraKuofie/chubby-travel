import React from 'react';
import { useState, useEffect} from 'react';
import { searchChubbyHotels } from '../Service/DataApi';
import { Button, Card, CardContent, CardMedia, Typography, CardActions, Container } from '@mui/material';
import { classes } from '../Styles';

const ChubbyProperties = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [chubbyProperties, setChubbyProperties] = useState([]);

  const fetchProperties = async (location: string) => {
    const response: any = await searchChubbyHotels(location);
    setChubbyProperties(response);
    setIsLoading(false);
  };

  const validateImage =  (imageurl: string) => {
    const req = new XMLHttpRequest();
    req.open('HEAD', imageurl, false);
    req.send();
    return req.status === 200;
  };

  const renderImage = (images: any) => {
    let validImage = null;
    for (let i = 0; i < images.length; i++) {
      if (!validImage && validateImage(images[i].image_url)) {
        validImage = images[i].image_url;
      }
    }
    return validImage
  }

  useEffect(() => {
    setIsLoading(true);
    if (chubbyProperties.length === 0) {
      fetchProperties('chicago');
    }
  }, []);

  

  return (
    // <div >
   <Container sx={classes.container}>
    {isLoading ? <div style={{textAlign: "center"}}>Loading...</div> : 
      chubbyProperties && chubbyProperties.map((property: any) => (
       
        <Card key={property.id} sx={classes.card}>
          <CardMedia 
           sx={classes.cardMedia}
           image={property.images[0].image_url}
           title={property.name}
          />
          <CardContent sx={classes.cardContent}>
            <Typography gutterBottom variant="subtitle1" >
              {property.name.split(',')[0]}
            </Typography>
            <Typography variant="overline"  sx={{color: "text.secondary", fontSize: "0.6rem"}}>
              {property.description}
              </Typography>
        
          <CardActions sx={classes.cardActions}>
            <Button size="small" color='inherit'>Learn More</Button>
            <Button color='inherit' onClick={() => window.open(property.address)} size="small">Visit Property</Button>
          </CardActions>
            </CardContent>
        </Card>
   
      ))

    }
     </Container>
  )
}

export default ChubbyProperties