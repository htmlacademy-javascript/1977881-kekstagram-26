import {isEscapeKey} from './utils.js';

const AVATAR_WEIGHT = 35;
const AVATAR_HEIGHT = 35;
const COMMENT_BLOCK_SHOW = 5;
const STEP_COMMENTS_COUNT = 5;
let totalCommentCount = 0;

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

const updateCommentСounter = (totalnumbercomments)=>{
  const hiddenCommentCount = document.querySelectorAll('.social__comment.hidden');
  const displaedCommentCount = totalnumbercomments - hiddenCommentCount.length;
  socialCommentCountElement.textContent = `${displaedCommentCount} из ${totalnumbercomments}`;
};

const onLoadCommentsButtonCLick =(evt)=>{
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
};

const closeImagePopup = () => {
  pictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', onLoadCommentsButtonCLick);
};

const onCloseImagePopup = () => {
  closeImagePopup();
  document.removeEventListener('keydown', onCloseImagePopup);
  picturesCloseElement.removeEventListener('click', onCloseImagePopup);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImagePopup();
  }
};

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

const openImagePopup = () => {
  pictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  commentsLoaderElement.addEventListener('click', onLoadCommentsButtonCLick);
  picturesCloseElement.addEventListener('click', onCloseImagePopup);
};

const reviewImage = (url, likes, comments, description) => {
  renderImage(url, likes, comments, description);
  openImagePopup(comments.length - COMMENT_BLOCK_SHOW);
};

export {reviewImage};
