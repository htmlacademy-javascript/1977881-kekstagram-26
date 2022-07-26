
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_VALUE = 25;

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgBackgroundElement = document.querySelector('.img-upload__preview');
const imgUpLoadElement = imgBackgroundElement.querySelector('.img-upload__img');
let value = MAX_VALUE;

const rescaleMore = ()=>{
  if (value < MAX_VALUE) {
    value += STEP_VALUE;
  }
  scaleControlValueElement.value = `${value}%`;
  imgUpLoadElement.style.transform = `scale(${value / 100})`;
};

const imageReduction = () => {
  if (value > MIN_VALUE) {
    value -= STEP_VALUE;
  }
  scaleControlValueElement.value = `${value}%`;
  imgUpLoadElement.style.transform = `scale(${value / 100})`;
};


const defaultPhoto = () => {
  value = MAX_VALUE;
  scaleControlValueElement.value = `${value}%`;
  imgUpLoadElement.style.transform = `scale(${value / 100})`;
};

const onResizeButtonClick = () => {
  scaleControlSmallerElement.addEventListener('click', imageReduction);
  scaleControlBiggerElement.addEventListener('click', rescaleMore);
};

const onCloseButtonClick = () => {
  scaleControlSmallerElement.removeEventListener('click', imageReduction);
  scaleControlBiggerElement.removeEventListener('click', rescaleMore);
};


export {onResizeButtonClick, onCloseButtonClick, defaultPhoto, imgUpLoadElement};
