import {renderBigPhotos} from './big_pictures.js';

const picturesTemplateElement  = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();

const renderPhotos = (similarMiniatures) => {
  similarMiniatures.forEach (({url, likes, сomment, description}) => {
    const pictureElement= picturesTemplateElement.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');

    imgElement.src = url;
    imgElement.addEventListener('click', (evt)=>{
      evt.preventDefault();
      renderBigPhotos(url, likes, сomment, description);
    });


    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = сomment.length;


    picturesFragment.appendChild(pictureElement);
  });
  picturesContainerElement.appendChild(picturesFragment);
};


export {renderPhotos};
