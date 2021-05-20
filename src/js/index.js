import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import countryIndicatedTpl from '../templates/country-indicated.hbs';
import countryListTpl from '../templates/country-list.hbs';
import { country } from './services/fetchCountries';
import '../sass/main.scss';

const refs = {
  countryListRoot: document.querySelector('.country-container'),
  countryInputField: document.querySelector('.country-input'),
};

refs.countryInputField.addEventListener(
  'input',
  debounce(e => {
    country(e.target.value)
      .then(response => {
        refs.countryListRoot.innerHTML = '';
        if (response.length > 10) {
          console.log(response.length);
          return error({
            text: 'Too many matches found. Please enter a more specific query!',
          });
        } else if (response.length > 1) {
          const murkupCountries = countryListTpl(response);

          refs.countryListRoot.insertAdjacentHTML('beforeend', murkupCountries);
        } else {
          const murkupCountry = countryIndicatedTpl(response);
          //   refs.countryListRoot.innerHTML = '';
          refs.countryListRoot.insertAdjacentHTML('beforeend', murkupCountry);
        }
      })
      .catch(error => console.log(error));
  }, 500),
);
