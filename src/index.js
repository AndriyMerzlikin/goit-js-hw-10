import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loader = document.querySelector('.loader');
loader.classList.add('hidden');
const textError = document.querySelector('.error');
const container = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
select.addEventListener('change', onSelectBreed);

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.append(option);
      loader.classList.add('hidden');
      select.hidden = false;
    });
  })
  .catch(error => {
    Notify.failure('Oops! Something went wrong!');
    textError.hidden = false;
  });

function onSelectBreed(evt) {
  const breedId = evt.currentTarget.value;

  loader.classList.remove('hidden');

  fetchCatByBreed(breedId);

  container.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(arr => {
      const breedItems = {
        name: arr[0].breeds[0].name,
        description: arr[0].breeds[0].description,
        temperament: arr[0].breeds[0].temperament,
        imgUrl: arr[0].url,
      };
      function createMarkup({ name, description, temperament, imgUrl }) {
        container.innerHTML = `<img src="${imgUrl}" alt="cat" width="350">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament: </b>${temperament}</p>`;
        loader.classList.add('hidden');
      }

      createMarkup(breedItems);
      textError.hidden = true;
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong!');
      textError.hidden = false;
      loader.classList.add('hidden');
    });
}
