const uploadForm = document.querySelector('#image-upload');
const deleteForms = document.querySelectorAll('.delete-image');
const changeOrderForms = [...document.querySelectorAll('form.move-up'), ...document.querySelectorAll('form.move-down')];
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

if(changeOrderForms.length > 0) {
  changeOrderForms.forEach(form => form.addEventListener('submit', e => changeImageOrder(e)));
}

if(deleteForms.length > 0) {
  deleteForms.forEach(form => form.addEventListener('submit', e => deleteImage(e)));
}

if(uploadForm) {
  uploadForm.addEventListener('submit', async e => {
    e.preventDefault();
    const url = e.target.action;
    const response = await fetch(e.target.action + '&type=json', {
      method: 'POST',
      body: new FormData(uploadForm)
    });
    
    const data = await response.json();
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
  });
}

async function deleteImage(event) {
  event.preventDefault();
  const url = event.target.action;
  const response = await fetch(event.target.action, {
    method: 'POST'
  });
  if(response.status === 200) {
    event.target.parentElement.remove();
  }
}

async function changeImageOrder(event) {
  event.preventDefault();
  const url = event.target.action;
  const response = await fetch(event.target.action, {
    method: 'POST'
  });
  if(response.status === 200) {
    const element = event.path[1].cloneNode(true);
    const index = getChildNodeIndex(event.path[1]);
    const container = document.querySelector('.images');
    getAndHandleForms(element);

    if(event.target.action.includes('up')) {
      if(index === 0) return;
      container.insertBefore(element, event.path[1].previousSibling.previousSibling);
    }
    if(event.target.action.includes('down')) {
      if(index === event.path[2].children.length - 1) return;
      container.insertBefore(element, event.path[1].nextSibling.nextSibling.nextSibling);
    }

    event.path[1].remove();
  }
}

function getAndHandleForms(el) {
  let forms = [];
  for(child of el.childNodes) {
    if(child.nodeName === 'FORM') forms.push(child);
  }
  forms.forEach(form => form.addEventListener('submit', e => changeImageOrder(e)));
} 