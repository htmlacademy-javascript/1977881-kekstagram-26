import {similarObjects} from './data.js';
import {renderBigPhotos} from './big_pictures.js';
const PICTURES_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');


const similarMiniatures = similarObjects();
const picturesFragment = document.createDocumentFragment();

const renderPhotos = () => {

  similarMiniatures.forEach (({url, likes, сomment}) => {
    const pictureElement= PICTURES_TEMPLATE.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');

    imgElement.src = url;
    imgElement.addEventListener('click', ()=>{
      renderBigPhotos(url, likes, сomment);
    });


    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = сomment.length;

    /* добавит обработчик по клику на просмотр большого изображения
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderBigPhotos(similarMiniatures);
    });*/
    picturesFragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(picturesFragment);
};
const clearSimilarList = () => {
  picturesContainer.textContent = '';
};
renderPhotos();
export {renderPhotos, clearSimilarList};
