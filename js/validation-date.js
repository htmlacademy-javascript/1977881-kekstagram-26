import { bodyElement } from './big-pictures.js';
import {isEscapeKey} from './utils.js';
import {onResizeButtonClick, onCloseButtonClick} from './zoom-foto-effects.js';
import {showApprove, showError} from './message.js';
import { showPictures } from './miniatures.js';


const DEFAULT_IMAGE = 'img/upload-default-image.jpg';
const hashtagsRe = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_LENGTH_COMMENT = 140;
const MIN_HASHTAGS_COUNT = 1;
const MAX_HASHTAGS_COUNT = 5;

const imgLoadOverlayElement= document.querySelector('.img-upload__overlay');
const imgloadFormElement = document.querySelector('.img-upload__form');
const downloadInputElement = imgloadFormElement.querySelector('#upload-file');
const hashtagsElement = imgloadFormElement.querySelector('.text__hashtags');
const descriptionElement = imgloadFormElement.querySelector('.text__description');
const imgUpLoadPreviewElement = imgLoadOverlayElement.querySelector('.img-upload__preview img');
const imgUpLoadCancelBtnElement = imgLoadOverlayElement.querySelector('#upload-cancel');
const submitButtonElement = imgloadFormElement.querySelector('#upload-submit');

const pristine = new Pristine(imgloadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'field__error'
});

const onUpLoadOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagsElement || document.activeElement === descriptionElement) {
      evt.stopPropagation();
    } else {
      closeUpLoadOverlay();
    }
  }
};

//const onImageDownload = () => {
downloadInputElement.addEventListener('change', () => {
  imgLoadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  document.addEventListener('keydown', onUpLoadOverlayEscKeydown);
  onResizeButtonClick();
});
//};


function closeUpLoadOverlay() {
  imgLoadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  document.removeEventListener('keydown', onUpLoadOverlayEscKeydown);
  imgloadFormElement.reset();
  downloadInputElement.value = '';
  imgUpLoadPreviewElement.src = DEFAULT_IMAGE;
}
/*проверить ф-цию может снять обработчики*/

//const closeDownloadImagePopup = () =>{
imgUpLoadCancelBtnElement.addEventListener('click', () => {
  closeUpLoadOverlay();
  onCloseButtonClick();
});
//};

const checkLengthComment = (comment) => comment.length <= MAX_LENGTH_COMMENT;


const getHashtags = (value) => {
  const hashtags =  value.toLowerCase().split(' ');
  return hashtags.filter((hashtag) => hashtag !== '');
};

const validateHashtags = (value) => {
  const hashtags = getHashtags(value);


  return value === ''|| hashtags.every((hashtag) => hashtagsRe.test(hashtag));
};

const validateUniqueHashtags = (value) => {
  const hashtags = getHashtags(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

const validateHashtagsCount = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const addBlockButton = () => {
  submitButtonElement.setAttribute('disabled', 'disabled');
  submitButtonElement.textContent = 'публикую...';
};

const removeBlockButton = () => {
  submitButtonElement.removeAttribute('disabled');
  submitButtonElement.textContent = 'опубликовать';
};

const addFieldValidation = () => {
  pristine.addValidator(hashtagsElement, validateHashtags,
    `Хэш-тег должен начинаться с # и содержать хотя бы ${MIN_HASHTAGS_COUNT} символ (буквы и цифры)`);
  pristine.addValidator(hashtagsElement, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
  pristine.addValidator(hashtagsElement, validateHashtagsCount, `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`);
  pristine.addValidator(descriptionElement, checkLengthComment, `Максимальное количество символов - ${MAX_LENGTH_COMMENT}`);
};

const addFormValidation = (onSuccess) => {
  imgloadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      addBlockButton();

      showPictures(
        () => {
          removeBlockButton();
          onSuccess();
          showApprove();
        },
        () => {
          removeBlockButton();
          showError();
        },
        new FormData(evt.target)
      );
    }
  });
};

export {addFormValidation, addFieldValidation};
