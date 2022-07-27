import './utils.js';
import './big-pictures.js';
import {addFormValidation, addFieldValidation} from './validation-date.js';
import './notification.js';
import './message.js';
import {showPictures} from './miniatures.js';
import {defaultPhoto} from './zoom-foto-effects.js';
import {changePhotoFilter} from './filters.js';


showPictures();
defaultPhoto();
changePhotoFilter();
addFormValidation();
addFieldValidation();
