import './data.js';
import './utils.js';
import './miniatures.js';
import './big-pictures.js';
import {similarObjects} from './data.js';
import {renderPhotos} from './miniatures.js';
import './validation-date.js';
import {defaultPhoto} from './zoom-foto-effects.js';
import {changePhotoFilter} from './filters.js';


renderPhotos(similarObjects());
defaultPhoto();
changePhotoFilter();
