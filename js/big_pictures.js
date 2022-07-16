import {isEscapeKey} from './utils.js';
const AVATAR_WEIGHT = 35;
const AVATAR_HEIGHT = 35;


const bigPictureElement = document.querySelector('.big-picture__img');
const bigPictureImgElement= bigPictureElement.querySelector('img');
const likesCountElement = document.querySelector('.likes-count');
const commentCountElement= document.querySelector('.comments-count');
const sosialCaptionElement = document.querySelector('.social__caption');
const picturesCloseElement = document.querySelector('#picture-cancel');
const pictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const cocialCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const socialCommentsElement = document.querySelector('.social__comments');


const createCommentElement = (comment)=> {
  const socialComments = document.createElement('li');
  socialComments.classList.add('social__comment');

  const elementImg = document.createElement('img');
  elementImg.classList.add('social__picture');
  elementImg.src = comment.avatar;
  elementImg.alt = comment.alt;
  elementImg.width = AVATAR_WEIGHT;
  elementImg.height = AVATAR_HEIGHT;

  const elementP = document.createElement('p');
  elementP.classList.add('social__text');
  elementP.textContent = comment.message;

  socialComments.appendChild(elementImg);
  socialComments.appendChild(elementP);
  return socialComments;
};


const renderBigPhotos = (url, likes, сomments, description) => {
  bigPictureImgElement.src = url;
  likesCountElement.textContent = likes.lenght;
  commentCountElement.textContent = сomments.lenght;
  sosialCaptionElement.textContent = description;
  socialCommentsElement.innerHTML = '';
  сomments.forEach((element) => {
    const newCommentELement = createCommentElement(element);
    socialCommentsElement.appendChild(newCommentELement);
  });

  openUserModal();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();

  }
};
function openUserModal () {
  pictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  cocialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
}


function closeUserModal () {
  pictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  cocialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');


  document.removeEventListener('keydown', onPopupEscKeydown);
}

picturesCloseElement.addEventListener('click', () => {
  closeUserModal();
});

export {renderBigPhotos};
