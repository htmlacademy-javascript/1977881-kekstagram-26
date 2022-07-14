import {getRandomPositiveInteger} from './utils.js';
import {getRandomArrayElement} from './utils.js';

const MAX_COUNT = 25;
const MIN_ID_AVATAR = 1;
const MAX_ID_AVATAR = 6;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_COMMENT = 1;
const MAX_COMMENT = 5;
const AVATAR_WEIGHT = 35;
const AVATAR_HEIGHT = 35;

const DESCRIPTIONS = [
  'мой мир',
  'мой дом',
  'мой друг',
  'мой кот'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Федор',
  'Аксинья',
  'Маргарита',
  'Василий',
  'Виталик',
  'Анна',
  'Ангелина'
];

const idComments = (() => {
  const result = [];
  for(let i = 0; i <= 100; i++){
    result[i] = i;
  }
  return result;

})();


const createUsersComments = (numberOfComments) => {
  const comments = [];
  for(let i = 0; i < numberOfComments; i++){
    comments[i] = {
      idComment: getRandomArrayElement(idComments, true),
      avatar: `img/avatar-${getRandomPositiveInteger(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    };
  }
  return comments;
};

const createFotosObjects = (i)=>({
  id: i,
  url: `photos/${i}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
  сomment: createUsersComments(getRandomPositiveInteger(MIN_COMMENT, MAX_COMMENT))
});

const similarObjects = () => Array.from({length: MAX_COUNT},(v,i)=> createFotosObjects(i+1));

export {similarObjects, AVATAR_WEIGHT, AVATAR_HEIGHT};
