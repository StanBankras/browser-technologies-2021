const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.images');

document.getElementById('image-order').remove();

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
    console.log(url);
    fetch(url, {
      method: 'POST'
    }).then(() => sendNotification('success', 'Saved image order.'));
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientX, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = x - box.left - box.width / 2
    if (offset < 0 && offset > closest.offset && y > box.top && y < box.bottom) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function getChildNodeIndex(el) {
  let position = 0;
  while ((el = el.previousSibling) != null) {
    if (el.nodeType != Node.TEXT_NODE) position++;
  }

  return position;
}