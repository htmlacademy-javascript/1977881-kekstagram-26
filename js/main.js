import {onUploadImage} from './upload-image.js';
import {loadPictures, onMiniatures} from './miniatures.js';
import {addSliderUpdater, initSlider} from './filters.js';
import {onValidation} from './validation.js';

initSlider();
addSliderUpdater();
onValidation();
onUploadImage();
onMiniatures();
loadPictures();
