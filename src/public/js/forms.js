const uploadForm = document.querySelector('#image-upload');

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

const deleteForms = document.querySelectorAll('.delete-image');

deleteForms.forEach(form => form.addEventListener('submit', e => deleteImage(e)));

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