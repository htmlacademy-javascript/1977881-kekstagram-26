//import {BIG_PICTURE} from './open_close_big_pictures.js';
import {AVATAR_WEIGHT, AVATAR_HEIGHT} from './data.js';
import {similarObjects} from './data.js';
import {renderPhotos} from './miniatures.js';

const bigPicturesImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentCount= document.querySelector('.comments-count');
const sosialCaption = document.querySelector('.social__caption');


const similarObject = similarObjects();
const commentConection = ()=> {
  const socialComments = document.createElement('li');
  socialComments.classList.add('social__comment');

  const elementImg = document.createElement('img');
  elementImg.classList.add('social__picture');
  elementImg.src = similarObject.url;
  elementImg.alt = similarObject.alt;
  elementImg.width = AVATAR_WEIGHT;
  elementImg.height = AVATAR_HEIGHT;

  const elementP = document.createElement('p');
  elementP.classList.add('social__text');

  socialComments.appendChild(elementImg);

  socialComments.appendChild(elementP);
  return socialComments;
};

/*const photo = renderPhotos();*/
const renderBigPhotos = (photo) => {
  bigPicturesImg.src = photo.url;
  likesCount.textContent = photo.lenght;
  commentCount.textContent = photo.lenght;
  //socialComments = commentConection();
  sosialCaption.textContent = photo.description;
};
//console.log(commentConection());
//console.log(renderBigPhotos());

export {renderBigPhotos, commentConection};
