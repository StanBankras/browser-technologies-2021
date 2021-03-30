const uploadForm = document.querySelector('#image-upload');
const deleteForms = document.querySelectorAll('.delete-image');
const changeOrderForms = addToArray([document.querySelectorAll('form.move-up'), document.querySelectorAll('form.move-down')]);
const orderPage = document.querySelector('.order .images');

// If on order photo page, add missing buttons so ordering can be handled by JS
if(orderPage) {
  for(child of orderPage.children) {
    if(child.children.length <= 2) {
      let form;
      for(el of child.children) {
        if(el.nodeName === 'FORM') form = el;
      }
      
      const clone = form.cloneNode(true);
      const isUp = clone.action.includes('/up');
      const curr = isUp ? 'down' : 'up';
      const old = isUp ? 'up' : 'down';
      let button;
      for(el of clone.children) {
        if(el.nodeName === 'BUTTON') button = el;
      }

      clone.action = clone.action.replace(old, curr);
      clone.classList.remove(`move-${old}`);
      clone.classList.add(`move-${curr}`);
      button.innerText = `Move ${curr}`;
      child.appendChild(clone);
    }
  }
}

if(changeOrderForms.length > 0 && promisesSupported()) {
  changeOrderForms.forEach(function(form) { form.addEventListener('submit', function(e) { changeImageOrder(e) }) });
}

if(deleteForms.length > 0 && promisesSupported()) {
  deleteForms.forEach(function(form) { form.addEventListener('submit', function(e) { deleteImage(e) }) });
}

if(uploadForm && promisesSupported()) {
  uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const url = e.target.action;

    fetch(e.target.action + '&type=json', {
      method: 'POST',
      body: new FormData(uploadForm)
    }).then(function(response) {
      if(response.status !== 200) {
        sendNotification('error', 'Image upload failed.');
      } else {
        response.json().then(function(data) {
          const images = document.querySelector('.images');
          images.insertAdjacentHTML('beforeEnd', `
            <div>
              <img src="data:image/jpeg;base64,${data.photo.base64}" alt="${data.photo.alt}">
              <form class="${data.photo.id}" action="/albums/${data.albumId}/${data.photo.id}/delete?userId=${data.userId}" method="post">
                <button type="submit">Delete</button>
              </form>
            </div>
          `);
      
          uploadForm.reset();
      
          const form = document.querySelector(`.${data.photo.id}`);
          form.addEventListener('submit', e => deleteImage(e));
          sendNotification('success', 'Image uploaded.');
        });
      }
    });
  });
}

function deleteImage(event) {
  event.preventDefault();
  const url = event.target.action;
  fetch(event.target.action, {
    method: 'POST'
  }).then(function(response) {
    if(response.status === 200) {
      event.target.parentElement.remove();
    }
  });
}

function changeImageOrder(event) {
  event.preventDefault();
  const url = event.target.action;
  fetch(event.target.action, {
    method: 'POST'
  }).then(function(response) {
    if(response.status === 200) {
      const element = event.target.parentNode.cloneNode(true);
      const index = getChildNodeIndex(event.target.parentNode);
      const container = document.querySelector('.images');
      getAndHandleForms(element);
  
      if(event.target.action.includes('up')) {
        if(index === 0) return;
        container.insertBefore(element, event.target.parentNode.previousSibling.previousSibling);
      }
      if(event.target.action.includes('down')) {
        if(index === event.target.parentNode.parentNode.children.length - 1) return;
        container.insertBefore(element, event.target.parentNode.nextSibling.nextSibling.nextSibling);
      }
  
      event.target.parentNode.remove();
    }
  });
}

function getAndHandleForms(el) {
  let forms = [];
  for(child of el.childNodes) {
    if(child.nodeName === 'FORM') forms.push(child);
  }
  forms.forEach(function(form) { form.addEventListener('submit', function(e) { changeImageOrder(e) }) });
} 