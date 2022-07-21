import './data.js';
import './utils.js';
import './miniatures.js';
import './big-pictures.js';
import {similarObjects} from './data.js';
import {renderPhotos} from './miniatures.js';
import './validation-date.js';

renderPhotos(similarObjects());
