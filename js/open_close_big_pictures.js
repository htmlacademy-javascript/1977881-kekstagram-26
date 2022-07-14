import {isEscapeKey} from './utils.js';
import {renderPhotos, clearSimilarList} from './miniatures.js';


const picturesCloseElement = document.querySelector('#picture-cancel');
const BIG_PICTURE = document.querySelector('#big-picture');
const bodyElement = document.querySelector('body');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    clearSimilarList();
  }
};

function openUserModal () {
  BIG_PICTURE.classList.remove('hidden');
  renderPhotos();
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

function closeUserModal () {
  BIG_PICTURE.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  clearSimilarList();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

renderPhotos.addEventListener('click', () => {
  openUserModal();
});


picturesCloseElement.addEventListener('click', () => {
  closeUserModal();
});

export {BIG_PICTURE};
