import {renderBigPhotos} from './big-pictures.js';
import {showNotification, hideNotification} from './notification.js';
import {getRandomArrayElement} from './utils.js';

const picturesTemplateElement  = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();

//const imgFiltersElement = document.querySelector('.img-filters');
//const btnFilterDefaultElement = document.getElementById('filter-default');
//const btnFilterRandomsElement = document.getElementById('filter-random');
//const btnFilterDiscussedElement = document.getElementById('filter-discussed');

const renderPhotos = (similarMiniatures) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((element)=>picturesContainerElement.removeChild(element));
  similarMiniatures.forEach (({url, likes, comments, description}) => {
    const pictureElement= picturesTemplateElement.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');

    imgElement.src = url;
    imgElement.addEventListener('click', (evt)=>{
      evt.preventDefault();
      renderBigPhotos(url, likes, comments, description);
    });

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(picturesFragment);
};

/*const showImgFilters = ()=>{
  imgFiltersElement.classList.remove('img-filters--inactive');
};*/


const loadPictures = (filter)=>{
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) =>
      response.json()
    ).then((data) => {

      if( filter){
        data = filter(data);
      }
      renderPhotos(data);
      //showImgFilters();
      hideNotification();
    })
    .catch(() => {
      showNotification('ERROR OCCURRED WHILE LOADING PICTURES');
    });
};

const randomFilter = (pictures)=>
  Array.from({length: 10},()=> getRandomArrayElement(pictures));

/*const discussedFilter = (pictures)=>{
  const sortablePictures = pictures.sort(commentCompare);
  return sortablePictures;
};*/

function commentCompare(a, b) {
  if (a.comments.length< b.comments.length) {
    return 1;
  }
  if (a.comments.length> b.comments.length) {
    return -1;
  }

  return 0;
}

/*const resetFilter= (element, active)=>{
  if(active){
    element.classList.add('img-filters__button--active');
  }else{
    element.classList.remove('img-filters__button--active');
  }
};
*/
/*const updateFilterStates =(bydefault,random, discussed)=>{
  resetFilter(btnFilterDefaultElement, bydefault);
  resetFilter(btnFilterRandomsElement, random);
  resetFilter(btnFilterDiscussedElement, discussed);
};*/

/*const initEvents=()=>{
  btnFilterDefaultElement.addEventListener('click', ()=> updateFilterStates(true, false, false));
  btnFilterDefaultElement.addEventListener('click', debounce(() =>{ loadPictures();}));

  btnFilterRandomsElement.addEventListener('click', () => updateFilterStates(false, true, false));
  btnFilterRandomsElement.addEventListener('click', debounce(() =>{ loadPictures(randomFilter);}));

  btnFilterDiscussedElement.addEventListener('click', () => updateFilterStates(false, false, true));
  btnFilterDiscussedElement.addEventListener('click', debounce(() =>{ loadPictures(discussedFilter);}));
};*/

const showPictures=()=>
{
// initEvents();
  loadPictures();
};


/*function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}*/

export {showPictures};
