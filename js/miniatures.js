import {reviewImage} from './preview-image.js';
import {showNotification, hideNotification} from './notification.js';
import {getRandomArrayElement} from './utils.js';

const picturesTemplateElement  = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const imgFiltersElement = document.querySelector('.img-filters');
const btnFilterDefaultElement = document.getElementById('filter-default');
const btnFilterRandomsElement = document.getElementById('filter-random');
const btnFilterDiscussedElement = document.getElementById('filter-discussed');
const RANDOM_PICTURES_MAX_COUNT = 10;
const DEBOUNCE_DELAY= 300;

const renderPictures = (similarMiniatures) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((element)=>picturesContainerElement.removeChild(element));
  similarMiniatures.forEach (({url, likes, comments, description}) => {
    const pictureElement= picturesTemplateElement.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');

    imgElement.src = url;
    imgElement.addEventListener('click', (evt)=>{
      evt.preventDefault();
      reviewImage(url, likes, comments, description);
    });

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.appendChild(pictureElement);
  });
  picturesContainerElement.appendChild(picturesFragment);
};

const randomFilter = (pictures)=> Array.from({length: RANDOM_PICTURES_MAX_COUNT},()=> getRandomArrayElement(pictures,true));
const discussedFilter = (pictures)=> pictures.sort(commentCompare);

function commentCompare(a, b) {
  if (a.comments.length< b.comments.length) {
    return 1;
  }
  if (a.comments.length> b.comments.length) {
    return -1;
  }

  return 0;
}

const showImgFilters = ()=>{
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const resetFilter= (element, active)=>{
  if(active){
    element.classList.add('img-filters__button--active');
  }else{
    element.classList.remove('img-filters__button--active');
  }
};

const updateFilterStates =(byDefault,random, discussed)=>{
  resetFilter(btnFilterDefaultElement, byDefault);
  resetFilter(btnFilterRandomsElement, random);
  resetFilter(btnFilterDiscussedElement, discussed);
};

function debounce(func, timeout = DEBOUNCE_DELAY){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const loadPictures = (filter)=>{
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {

      if(filter){
        data = filter(data);
      }

      renderPictures(data);
      showImgFilters();
      hideNotification();
    })
    .catch(() => {
      showNotification('Во время загрузки произошла ошибка');
    });
};

const onMiniatures=()=>{
  btnFilterDefaultElement.addEventListener('click', ()=> updateFilterStates(true, false, false));
  btnFilterDefaultElement.addEventListener('click', debounce(() => loadPictures()));

  btnFilterRandomsElement.addEventListener('click', () => updateFilterStates(false, true, false));
  btnFilterRandomsElement.addEventListener('click', debounce(() => loadPictures(randomFilter)));

  btnFilterDiscussedElement.addEventListener('click', () => updateFilterStates(false, false, true));
  btnFilterDiscussedElement.addEventListener('click', debounce(() => loadPictures(discussedFilter)));
};

export {loadPictures, onMiniatures};
