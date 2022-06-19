
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

export {getRandomPositiveInteger};
export {getRandomArrayElement};
