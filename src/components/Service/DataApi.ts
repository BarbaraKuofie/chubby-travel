import axios from 'axios';

export const searchChubbyHotels = (location: string) => {
  return axios.get('http://18.116.90.240:8000/hotels', {
    params: {
      location: location
    }
  })
    .then(response => response.data)
    .catch(error => console.error('Error:', error));
}
