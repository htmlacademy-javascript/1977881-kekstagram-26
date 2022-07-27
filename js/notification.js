const motificationElement = document.querySelector('.notification');
const motificationMessageElement = document.querySelector('.notification_message');

const showNotification = (message)=>{
  motificationElement.classList.remove('hidden');
  motificationMessageElement.innerHTML = message;
};

const hideNotification = ()=>{
  motificationMessageElement.innerHTML = '';
  motificationElement.classList.add('hidden');
};

export {showNotification, hideNotification};
