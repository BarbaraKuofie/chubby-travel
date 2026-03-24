import React, { useState, useEffect } from 'react';
import { getHotel } from '../Service/DataApi';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  ImageList,
  ImageListItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface HotelProps {
  hotelId: number;
  onBack: () => void;
}

const Hotel = ({ hotelId, onBack }: HotelProps) => {
  const [hotel, setHotel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [validImages, setValidImages] = useState<string[]>([]);

  useEffect(() => {
    if (hotelId) {
      fetchHotelData(hotelId);
    }
  }, [hotelId]);

  const validateImage = async (imageUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  };

  const filterValidImages = async (images: any[]) => {
    const imageUrls = images.map((img) => img.image_url);
    const validated: string[] = [];

    for (const url of imageUrls) {
      const isValid = await validateImage(url);
      if (isValid) {
        validated.push(url);
      }
    }

    setValidImages(validated);
  };

  const fetchHotelData = async (hotelId: number) => {
    setIsLoading(true);
    try {
      const response: any = await getHotel(hotelId);
      if (response && response.length > 0) {
        const hotelData = response[0];
        setHotel(hotelData);
        if (hotelData.images && hotelData.images.length > 0) {
          await filterValidImages(hotelData.images);
        }
      }
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!hotel) {
    return (
      <Container sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h6">Hotel not found</Typography>
        <Button variant="contained" onClick={onBack} sx={{ marginTop: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ marginBottom: 2 }}
      >
        Back
      </Button>

      {/* Hotel Header */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          {hotel.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {hotel.city}, {hotel.state} {hotel.zip} - {hotel.country}
        </Typography>
      </Box>

      {/* Rating Section */}
      <Box sx={{ marginBottom: 3, display: 'flex', gap: 2 }}>
        <Card sx={{ flex: 1, padding: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Overall Rating
          </Typography>
          <Typography variant="h4" sx={{ color: '#8B8B8B' }}>
            {hotel.overall_rating} 
          </Typography>
        </Card>
        <Card sx={{ flex: 1, padding: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Location Rating
          </Typography>
          <Typography variant="h4" sx={{ color: '#8B8B8B' }}>
            {hotel.location_rating} 
          </Typography>
        </Card>
        <Card sx={{ flex: 1, padding: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Rate (per night)
          </Typography>
          <Typography variant="h4" sx={{ color: '#0f4408ff' }}>
            ${hotel.rate}
          </Typography>
        </Card>
      </Box>

      {/* Images Gallery */}
      {validImages && validImages.length > 0 && (
        <Card sx={{ marginBottom: 3, padding: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Gallery
          </Typography>
          <ImageList sx={{ width: '100%', height: 500 }} cols={3} rowHeight={164}>
            {validImages.map((imageUrl: string, index: number) => (
              <ImageListItem key={index}>
                <img
                  src={imageUrl}
                  alt={`Hotel ${index}`}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Card>
      )}

      {/* Description */}
      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Description
        </Typography>
        <Typography variant="body1">{hotel.description}</Typography>
      </Card>

      {/* Hotel Details */}
      <Card sx={{ marginBottom: 3, padding: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Hotel Details
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <div>
            <Typography variant="subtitle2" color="textSecondary">
              Hotel Type
            </Typography>
            <Typography variant="body2">{hotel.HotelType}</Typography>
          </div>
          <div>
            <Typography variant="subtitle2" color="textSecondary">
              Class
            </Typography>
            <Typography variant="body2">{hotel.hotelClass}</Typography>
          </div>
          <div>
            <Typography variant="subtitle2" color="textSecondary">
              Continent
            </Typography>
            <Typography variant="body2">{hotel.continent}</Typography>
          </div>
          <div>
            <Typography variant="subtitle2" color="textSecondary">
              Address
            </Typography>
            <Typography variant="body2">{hotel.address}</Typography>
          </div>
        </Box>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => window.open(hotel.link, '_blank')}
        >
          Visit Hotel Website
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={onBack}
        >
          Back to Properties
        </Button>
      </Box>
    </Container>
  );
};

export default Hotel;
