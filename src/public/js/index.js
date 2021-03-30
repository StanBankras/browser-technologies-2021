function sendNotification(type, message) {
  const body = document.querySelector('body');
  const notification = document.createElement('div');

  notification.classList.add('notification');
  notification.textContent = message;

  if(type === 'error') {
    notification.classList.add('error');
  }

  body.appendChild(notification);

  setTimeout(function() { notification.remove() }, 3000);
}

function getChildNodeIndex(el) {
  let position = 0;
  while ((el = el.previousSibling) != null) {
    if (el.nodeType != Node.TEXT_NODE) position++;
  }

  return position;
}