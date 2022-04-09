const API_KEY = '25171046-c4e920b5317faa91707fbb31b';
const BASE_URL = 'https://pixabay.com/api/';

function fetchPictures(searchQuery, page) {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`We couldn't find ${searchQuery}`));
  });
}

const API = { fetchPictures };

export default API;
