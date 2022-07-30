import {isEscapeKey} from './utils.js';

const AVATAR_WEIGHT = 35;
const AVATAR_HEIGHT = 35;
const COMMENT_BLOCK_SHOW = 5;
const STEP_COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture__img');
const bigPictureImgElement = bigPictureElement.querySelector('img');
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
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImagePopup();
  }
};

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

const showLoadCommentsButton = (length)=>{
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
const renderImage = (url, likes, comments, description)=>{
  bigPictureImgElement.src = url;
  likesCountElement.textContent = likes.length;
  commentCountElement.textContent = comments.length;
  sosialCaptionElement.textContent = description;
  socialCommentsElement.textContent = '';
  totalCommentCount = comments.length;

  for(let i = 0; i<comments.length; i++){
    const newCommentELement = createCommentElement(comments[i],i>=STEP_COMMENTS_COUNT);
    socialCommentsElement.appendChild(newCommentELement);
  }
  showLoadCommentsButton(totalCommentCount - STEP_COMMENTS_COUNT);
  updateCommentСounter(totalCommentCount);
};

const reviewImage = (url, likes, comments, description) => {
  renderImage(url, likes, comments, description);
  openImagePopup(comments.length - COMMENT_BLOCK_SHOW);
};


function openImagePopup () {
  pictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  commentsLoaderElement.addEventListener('click', handleLoadCommentsButtonCLick);
  picturesCloseElement.addEventListener('click', () => {closeImagePopup();});
}

function closeImagePopup () {
  pictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoaderElement.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoaderElement.removeEventListener('click', handleLoadCommentsButtonCLick);
  picturesCloseElement.removeEventListener('click', () => {closeImagePopup();});
}

function handleLoadCommentsButtonCLick(evt){
  evt.preventDefault();
  const loadComments = document.querySelectorAll('.social__comment.hidden');

  let lenght = 5;
  if(loadComments.length < COMMENT_BLOCK_SHOW){
    lenght = loadComments.length;
  }

  for(let j = 0; j<lenght; j++){
    loadComments[j].classList.remove('hidden');
  }

  showLoadCommentsButton(loadComments.length - COMMENT_BLOCK_SHOW);
  updateCommentСounter(totalCommentCount);
}


export {reviewImage};
