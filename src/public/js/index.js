function sendNotification(type, message) {
  const body = document.querySelector('body');
  const notification = document.createElement('div');

  notification.classList.add('notification');
  notification.textContent = message;

  body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}