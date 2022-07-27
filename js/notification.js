const notificationElement = document.querySelector('.notification');
const notificationMessageElement = document.querySelector('.notification_message');

const showNotification = (message)=>{
  notificationElement.classList.remove('hidden');
  notificationMessageElement.textContent = message;
};

const hideNotification = ()=>{
  notificationMessageElement.innerHTML = '';
  notificationElement.classList.add('hidden');
};

export {showNotification, hideNotification};
