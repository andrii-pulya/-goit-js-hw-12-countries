import axios from 'axios';
export function country(countryName) {
  axios.defaults.baseURL = 'https://restcountries.eu/rest/v2';

  return axios
    .get(`/name/${countryName}`)
    .then(response => response.data)
    .catch(error => console.log(error));
}
