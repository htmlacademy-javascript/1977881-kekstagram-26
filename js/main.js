import './data.js';
import './utils.js';
import './miniatures.js';
import './big_pictures.js';
import {similarObjects} from './data.js';
import {renderPhotos} from './miniatures.js';

renderPhotos(similarObjects());
