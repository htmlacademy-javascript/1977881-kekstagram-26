import {addUploadImageEvents} from './upload-image.js';
import {loadPictures, addMiniatureEvents} from './miniatures.js';
import {addSliderUpdater, initSlider} from './filters.js';
import {initValidation} from './validation.js';

initSlider();
addSliderUpdater();
initValidation();
addMiniatureEvents();
addUploadImageEvents();
loadPictures();
