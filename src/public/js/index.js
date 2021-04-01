// Sends user a bit of feedback once something is saved to the database
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

// Get the index of the element when looking at its parent
function getChildNodeIndex(el) {
  let position = 0;
  while ((el = el.previousSibling) != null) {
    if (el.nodeType != Node.TEXT_NODE) position++;
  }

  return position;
}

// Remove the need for using ES6 spread operator
function addToArray(items) {
    const array = [];
    items.forEach(function(item) {
      item.forEach(function(subitem) { array.push(subitem) });
    });
    
    return array;
}

// Feature detection: check if promises are supported
function promisesSupported() {
  try {
    const promise = new Promise(function (x, y) {});
    return true;
  } catch (e) {
    return false;
  }
}