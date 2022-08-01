const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_VALUE = 25;
let value = MAX_VALUE;

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgBackgroundElement = document.querySelector('.img-upload__preview');
const imgUpLoadElement = imgBackgroundElement.querySelector('.img-upload__img');

const setImageScale = ()=>{
  scaleControlValueElement.value = `${value}%`;
  imgUpLoadElement.style.transform = `scale(${value / MAX_VALUE})`;
};

const onRescaleMore = ()=>{
  if (value < MAX_VALUE) {
    value += STEP_VALUE;
  }
  setImageScale();
};

const onImageReduction = () => {
  if (value > MIN_VALUE) {
    value -= STEP_VALUE;
  }
  setImageScale();
};

const resetFotoSizeToDefault = () => {
  value = MAX_VALUE;
  setImageScale();
};

const addZoomEffectEvents = () => {
  scaleControlSmallerElement.addEventListener('click', onImageReduction);
  scaleControlBiggerElement.addEventListener('click', onRescaleMore);
};

const removeZoomEffectEvents = () => {
  scaleControlSmallerElement.removeEventListener('click', onImageReduction);
  scaleControlBiggerElement.removeEventListener('click', onRescaleMore);
};

export {addZoomEffectEvents, removeZoomEffectEvents, resetFotoSizeToDefault};
