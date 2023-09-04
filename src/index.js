import Notiflix from 'notiflix';
import axios from 'axios';
const searchForm = document.querySelector('.search-form');
const inputText = document.querySelector('[name="searchQuery"]')
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let page = 1;
const API_KEY = "39227373-dd01e2c6342e880b425481406";
let perPage = 40;
let searchQuery = '';
loadMoreBtn.style.display = "none";
function createPhotoCard(img) {
    const createCard = `<div class="photo-card">
  <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${img.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${img.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${img.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${img.downloads}
    </p>
  </div>
</div>`
    gallery.insertAdjacentHTML('beforeend',createCard);
}
async function fetchData() {
  try {
    const mainURL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    const response = await axios.get(mainURL);
    const data = response.data;

        if (data.hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else {
          const photoCards = data.hits.map((img) => createPhotoCard(img)).join('');
          gallery.append(...photoCards);

          if (data.totalHits > perPage) {
                loadMoreBtn.style.display = "block";
            } else {
              loadMoreBtn.style.display = "none";
          }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
  }
}

function handleSearchFormSubmit(event) {
  event.preventDefault()
  searchQuery = inputText.value.trim();
if (!searchQuery) {
        return
    }
  gallery.innerHTML = '';
  page = 1;
  fetchData();
}

function loadMorePages() {
  page += 1;
  fetchData();
}

searchForm.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', loadMorePages);