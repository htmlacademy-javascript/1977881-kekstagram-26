import {isEscapeKey} from './utils.js';

const AVATAR_WEIGHT = 35;
const AVATAR_HEIGHT = 35;
const COMMENT_BLOCK_SHOW = 5;


const bigPictureElement = document.querySelector('.big-picture__img');
const bigPictureImgElement= bigPictureElement.querySelector('img');
const likesCountElement = document.querySelector('.likes-count');
const commentCountElement= document.querySelector('.comments-count');
const sosialCaptionElement = document.querySelector('.social__caption');
const picturesCloseElement = document.querySelector('#picture-cancel');
const pictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const socialCommentsElement = document.querySelector('.social__comments');
let totalCommentCount = 0;

const createCommentElement = (comment, hidden)=> {
  const socialComments = document.createElement('li');
  socialComments.classList.add('social__comment');

  if(hidden){
    socialComments.classList.add('hidden');
  }

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

const showLoadButton = (length)=>{
  if(length>0){
    commentsLoaderElement.classList.remove('hidden');
  }
  else{commentsLoaderElement.classList.add('hidden');}
};


function updateCommentСounter(totalnumbercomments){
  const hiddenCommentCount = document.querySelectorAll('.social__comment.hidden');
  const displaedCommentCount = totalnumbercomments - hiddenCommentCount.length;
  socialCommentCountElement.textContent = `${displaedCommentCount} из ${totalnumbercomments}`;
}


const renderBigPhotos = (url, likes, сomments, description) => {
  bigPictureImgElement.src = url;
  likesCountElement.textContent = likes.length;
  commentCountElement.textContent = сomments.length;
  sosialCaptionElement.textContent = description;
  socialCommentsElement.textContent = '';
  totalCommentCount = сomments.length;
  for(let i = 0; i<сomments.length; i++){
    const newCommentELement = createCommentElement(сomments[i],i>=5);
    socialCommentsElement.appendChild(newCommentELement);

  }
  openUserModal(сomments.length - COMMENT_BLOCK_SHOW);
};


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();

  }
};

function handleCommentsLoaderElementCLick(evt){
  evt.preventDefault();
  const loadComments = document.querySelectorAll('.social__comment.hidden');

  let lenght = 5;

  if(loadComments.length < COMMENT_BLOCK_SHOW){
    lenght = loadComments.length;

  }

  for(let j = 0; j<lenght; j++){
    loadComments[j].classList.remove('hidden');
  }
  showLoadButton(loadComments.length - COMMENT_BLOCK_SHOW);
  updateCommentСounter(totalCommentCount);
}

function openUserModal (totalComments) {
  pictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);

  commentsLoaderElement.addEventListener('click', handleCommentsLoaderElementCLick);
  showLoadButton(totalComments);
  updateCommentСounter(totalCommentCount);
}

const picturesClose = () => {picturesCloseElement.addEventListener('click', () => {
  closeUserModal();

});};

function closeUserModal () {
  pictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  commentsLoaderElement.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoaderElement.removeEventListener('click',handleCommentsLoaderElementCLick);
}

picturesClose();
export {renderBigPhotos, bodyElement};
