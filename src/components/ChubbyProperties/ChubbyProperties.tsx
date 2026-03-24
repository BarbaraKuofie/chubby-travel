import React from 'react';
import { useState, useEffect} from 'react';
import { searchChubbyHotels } from '../Service/DataApi';
import { Button, Card, CardContent, CardMedia, Typography, CardActions, Container, CircularProgress } from '@mui/material';
import { classes } from '../Styles';
import { LocationSelection } from '../Header/LocationSelection';

const ChubbyProperties = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [chubbyProperties, setChubbyProperties] = useState([]);
  const [location, setLocation] = useState('thailand'); // Default location can be set here
  const fetchProperties = async (location: string) => {
    const response: any = await searchChubbyHotels(location);
    if (!response || response.length === 0) {
      setChubbyProperties([]);
      setIsLoading(false);
      return;
    }
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
    if (location) {
      fetchProperties(location);
    }
  }, [location]);

  

  return (
    <>
    <Container sx={{ top: 0, position: "relative", zIndex: 1000, padding: 2 }}>
     <LocationSelection setLocation={setLocation} />
   </Container>
    <Container sx={classes.container}>
     {isLoading ? <div style={{textAlign: "center"}}>
       <CircularProgress />

     </div> :
       chubbyProperties && chubbyProperties.map((property: any) => (

         <Card key={property.id} sx={classes.card}>
           <CardMedia
            sx={classes.cardMedia}
            image={property.images[0]?.image_url}
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
      </>
   )
}

export default ChubbyProperties