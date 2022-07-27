import {applyFilters} from './zoom-foto-effects.js';

const sliderForm = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const changePhotoFilterForm = document.querySelector('.img-upload__effects');

const effectSettings = {
  chrome:{
    slider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    filter: 'grayscale',
    units: '',
  },
  sepia:{
    slider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    filter: 'sepia',
    units: '',
  },
  marvin:{
    slider: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    },
    filter: 'invert',
    units: '%',
  },
  phobos:{
    slider: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    },
    filter: 'blur',
    units: 'px',
  },
  heat:{
    slider: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    },
    filter: 'brightness',
    units: '',
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  connect: 'lower',
  start: 1,
});

sliderElement.noUiSlider.on('update', () => {
  sliderForm.classList.remove('hidden');
  const value = sliderElement.noUiSlider.get();
  valueElement.setAttribute('value', value);
  const selectedFilter = changePhotoFilterForm.querySelector('.effects__radio:checked').value;

  const settings = effectSettings[selectedFilter];
  if(settings) {
    applyFilters(`${settings.filter}(${value}${settings.units})`);
  }
});

const onChangeFilter = (evt) => {
  sliderForm.classList.remove('hidden');
  const effect = effectSettings[evt.target.value];
  if (effect) {
    sliderElement.noUiSlider.updateOptions(effectSettings[evt.target.value].slider);
    return;
  }
  applyFilters('');
};

const changePhotoFilter = () => {
  document.querySelectorAll('.effects__radio').forEach((element) => element.addEventListener('change', onChangeFilter));
};

export {changePhotoFilter};
