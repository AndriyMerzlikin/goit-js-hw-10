import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '.breed-select',
});

const loader = document.querySelector('.loader');
const textError = document.querySelector('.error');
const container = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
select.addEventListener('change', onSelectBreed);

// loader.hidden = false;
textError.hidden = true;

// function load() {
//   if (!fetchBreeds) {
//     loader.hidden = false;
//     select.hidden = true;
//   } else {
//     loader.hidden = true;
//     textError.hidden = true;
//   }
// }

// load();

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.append(option);
    });
  })
  .catch(error => {
    textError.hidden = false;
  });

function onSelectBreed(evt) {
  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId);
  console.log(fetchCatByBreed(breedId));

  fetchCatByBreed(breedId)
    .then(arr => {
      //   console.log(arr[0].breeds[0].description);

      const breedItems = {
        name: arr[0].breeds[0].name,
        description: arr[0].breeds[0].description,
        temperament: arr[0].breeds[0].temperament,
        imgUrl: arr[0].url,
      };
      // console.log(breedItems);
      function createMarkup({ name, description, temperament, imgUrl }) {
        container.innerHTML = `<img src="${imgUrl}" alt="cat" width="350">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament: </b>${temperament}</p>`;
      }

      createMarkup(breedItems);
    })
    .catch(error => {
      textError.hidden = false;
    });
}
