const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.images');

if(!('draggable' in document.createElement('div'))) {
  if(draggables.length > 0) {
    document.querySelectorAll('.image form').forEach(form => form.classList.add('visible'));
  }
}

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', e => {
    draggable.classList.remove('dragging');

    const afterElement = getDragAfterElement(document.querySelector('.images'), e.clientX, e.clientY)
    const imgId = e.target.dataset.id;
    const albumId = document.querySelector('.images').dataset.id;
    const userId = document.querySelector('.images').dataset.userid;
    let newIndex;

    if(!afterElement) {
      newIndex = document.querySelector('.images').childElementCount;
    } else {
      newIndex = getChildNodeIndex(afterElement);
    }
    const url = `/albums/${albumId}/${imgId}/order/${newIndex}?userId=${userId}`;
    fetch(url, {
      method: 'POST'
    }).then(() => sendNotification('success', 'Saved image order.'));
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
    const draggable = document.querySelector('.dragging');
    if(afterElement === 'none') {
      console.log('none');
    } else if (afterElement == null) {
      container.appendChild(draggable.parentNode);
    } else {
      container.insertBefore(draggable.parentNode, afterElement.parentNode);
    }
  })
})

function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  const afterEl = draggableElements.reduce((closest, child, i) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;
    if (offset < 0 && offset > closest.offset && y > box.top && y < box.bottom) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;

  return afterEl;
}