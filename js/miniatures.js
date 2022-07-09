import {similarObjects} from './data.js';
const PICTURES_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const similarMiniatures = similarObjects();
const picturesFragment = document.createDocumentFragment();

similarMiniatures.forEach (({url, likes, сomment}) => {
  const pictureElement= PICTURES_TEMPLATE.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = сomment.length;

  picturesFragment.appendChild(pictureElement);
});
picturesContainer.appendChild(picturesFragment);

