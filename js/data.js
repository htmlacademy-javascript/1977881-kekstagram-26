import {getRandomPositiveInteger} from './utils.js';
import {getRandomArrayElement} from './utils.js';

const MAX_COUNT = 25;
const minRandomIntegerlikes = 15;
const maxRandomIntegerlikes = 200;

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
  const maxIdComment = 100;
  for(let i = 0; i <= maxIdComment; i++){
    result[i] = i;
  }
  return result;

})();

const createUsersComments = (numberOfComments) => {
  const comments = [];
  for(let i = 0; i < numberOfComments; i++){
    const minRandomPositiveInteger = 1;
    const maxRandomPositiveInteger = 6;
    comments[i] = {
      idComment: getRandomArrayElement(idComments, true),
      avatar: `img/avatar-${getRandomPositiveInteger(minRandomPositiveInteger, maxRandomPositiveInteger)}.svg`,
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
  likes: getRandomPositiveInteger(minRandomIntegerlikes, maxRandomIntegerlikes),
  сomment: createUsersComments(getRandomPositiveInteger(1, idComments.length < 5? idComments.lenght:5))
});

const similarObjects = Array.from({length: MAX_COUNT }, (v,i)=>createFotosObjects(i+1));

export {similarObjects};
