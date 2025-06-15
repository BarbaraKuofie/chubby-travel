import axios from 'axios';

export const searchHotel = (hotel: string) => {
  const options = {
    method: 'GET',
    url: 'https://api.content.tripadvisor.com/api/v1/location/search',
    params: {
      key: 'B5C9926A22F845A08F6D41891704D0B2',
      searchQuery: hotel,
      category: 'hotels',
      language: 'en'
    },
    headers: {
      accept: '*/*',
    },
  };

  axios
    .request(options)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}
