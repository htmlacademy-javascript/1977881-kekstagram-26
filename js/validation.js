const hashtagsRe = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_LENGTH_COMMENT = 140;
const MIN_HASHTAGS_COUNT = 1;
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_MAX_LENGTH = 20;

const imgloadFormElement = document.querySelector('.img-upload__form');
const hashtagsElement = imgloadFormElement.querySelector('.text__hashtags');
const descriptionElement = imgloadFormElement.querySelector('.text__description');

const pristine = new Pristine(imgloadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'field__error'
});

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

const isEditMode = () => (document.activeElement === hashtagsElement || document.activeElement === descriptionElement);
const isValid = () => pristine.validate();

function onValidation(){
  pristine.addValidator(hashtagsElement, validateHashtags,
    `Хэш-тег должен начинаться с # и содержать хотя бы ${MIN_HASHTAGS_COUNT} символ (буквы и цифры), но не более ${MAX_HASHTAG_MAX_LENGTH} символов`);
  pristine.addValidator(hashtagsElement, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
  pristine.addValidator(hashtagsElement, validateHashtagsCount, `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`);
  pristine.addValidator(descriptionElement, checkLengthComment, `Максимальное количество символов - ${MAX_LENGTH_COMMENT}`);
}

export {isValid, isEditMode, onValidation};
