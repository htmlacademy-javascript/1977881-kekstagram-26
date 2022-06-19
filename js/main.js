
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

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements, shouldBeRemoved = false) => {
  const index = getRandomPositiveInteger(0, elements.length - 1);
  const value = elements[index];
  if(shouldBeRemoved) {
    delete elements[index];
    return value;
  }
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};


const idComments = (() => {
  const result = [];
  for(let i = 0; i <= 100; i++){
    result[i] = i;
  }
  return result;

})();

const MAX_COUNT = 25;

const createUsersComments = (numberOfComments) => {
  const comments = [];
  for(let i = 0; i < numberOfComments; i++){
    comments[i] = {
      idComment: getRandomArrayElement(idComments, true),
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
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
  likes: getRandomPositiveInteger(15, 200),
  сomment: createUsersComments(getRandomPositiveInteger(1, idComments.length < 5? idComments.lenght:5))
});

const similarObjects = Array.from({length: MAX_COUNT }, (v,i)=>createFotosObjects(i+1));


