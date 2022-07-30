const CROME_MIN_VALUE = 0;
const CROME_MAX_VALUE = 1;
const CROME_STEP = 0.1;

const SEPIA_MIN_VALUE = 0;
const SEPIA_MAX_VALUE = 1;
const SEPIA_STEP = 0.1;

const MARVIN_MIN_VALUE = 0;
const MARVIN_MAX_VALUE = 100;
const MARVIN_STEP = 1;

const PHOBOS_MIN_VALUE = 0;
const PHOBOS_MAX_VALUE = 3;
const PHOBOS_STEP = 0.1;

const HEAT_MIN_VALUE = 1;
const HEAT_MAX_VALUE = 3;
const HEAT_STEP = 0.1;

const imageBackgroundElement = document.querySelector('.img-upload__preview');
const imageElement = imageBackgroundElement.querySelector('.img-upload__img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const noEffectElement = document.querySelector('#effect-none');
const cromeEffectElement = document.querySelector('#effect-chrome');
const sepiaEffectElement = document.querySelector('#effect-sepia');
const marvinEffectElement = document.querySelector('#effect-marvin');
const phobosEffectElement = document.querySelector('#effect-phobos');
const heatEffectElement = document.querySelector('#effect-heat');

const initSlider = () => {
  noEffectElement.checked = true;

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    connect: 'lower',
    start: 1,
  });
};

const addSliderUpdater = () => {
  let value = 1;

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();

    if (noEffectElement.checked) {
      value = 0;
    }

    if (cromeEffectElement.checked) {
      value = sliderValue;
      imageElement.style.filter = `grayscale(${value})`;
    }

    if (sepiaEffectElement.checked) {
      value = sliderValue;
      imageElement.style.filter = `sepia(${value})`;
    }

    if (marvinEffectElement.checked) {
      value = sliderValue;
      imageElement.style.filter = `invert(${value}%)`;
    }

    if (phobosEffectElement.checked) {
      value = sliderValue;
      imageElement.style.filter = `blur(${value}px)`;
    }

    if (heatEffectElement.checked) {
      value = sliderValue;
      imageElement.style.filter = `brightness(${value})`;
    }

    effectValueElement.value = value;
  });
};

const removeFilterEffects = () => {
  imageElement.style.filter = '';
  imageElement.classList = '';
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = (minValue, maxValue, step) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    step: step,
    start: maxValue,
  });
};

const changeCromeEffect = () => {
  imageElement.classList.add('effects__preview--chrome');
  sliderContainerElement.classList.remove('hidden');

  updateSlider(CROME_MIN_VALUE, CROME_MAX_VALUE, CROME_STEP);
};

const changeSepiaEffect = () => {
  imageElement.classList = '';
  imageElement.classList.add('effects__preview--sepia');
  sliderContainerElement.classList.remove('hidden');

  updateSlider(SEPIA_MIN_VALUE, SEPIA_MAX_VALUE, SEPIA_STEP);
};

const changeMarvinEffect = () => {
  imageElement.classList = '';
  imageElement.classList.add('effects__preview--marvin');
  sliderContainerElement.classList.remove('hidden');

  updateSlider(MARVIN_MIN_VALUE, MARVIN_MAX_VALUE, MARVIN_STEP);
};

const changePhobosEffect = () => {
  imageElement.classList = '';
  imageElement.classList.add('effects__preview--phobos');
  sliderContainerElement.classList.remove('hidden');

  updateSlider(PHOBOS_MIN_VALUE, PHOBOS_MAX_VALUE, PHOBOS_STEP);
};

const changeHeatEffect = () => {
  imageElement.classList = '';
  imageElement.classList.add('effects__preview--heat');
  sliderContainerElement.classList.remove('hidden');

  updateSlider(HEAT_MIN_VALUE, HEAT_MAX_VALUE, HEAT_STEP);
};

const onFillter = () => {
  noEffectElement.addEventListener('click', removeFilterEffects);
  cromeEffectElement.addEventListener('click', changeCromeEffect);
  sepiaEffectElement.addEventListener('click', changeSepiaEffect);
  marvinEffectElement.addEventListener('click', changeMarvinEffect);
  phobosEffectElement.addEventListener('click', changePhobosEffect);
  heatEffectElement.addEventListener('click', changeHeatEffect);
};

const offFillter = () => {
  noEffectElement.removeEventListener('click', removeFilterEffects);
  cromeEffectElement.removeEventListener('click', changeCromeEffect);
  sepiaEffectElement.removeEventListener('click', changeSepiaEffect);
  marvinEffectElement.removeEventListener('click', changeMarvinEffect);
  phobosEffectElement.removeEventListener('click', changePhobosEffect);
  heatEffectElement.removeEventListener('click', changeHeatEffect);
};

export {onFillter, offFillter, addSliderUpdater, initSlider, removeFilterEffects};
