const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.images');
let afterElement;

if(('draggable' in document.createElement('div')) && promisesSupported()) {
  if(draggables.length > 0) {
    document.querySelectorAll('.visible').forEach(function(form) { form.classList.remove('visible') });
  }
}

draggables.forEach(function(draggable) {
  draggable.addEventListener('dragstart', function() {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', function(e) {
    draggable.classList.remove('dragging');
    const imgId = e.target.dataset.id;
    const albumId = document.querySelector('.images').dataset.id;
    const userId = document.querySelector('.images').dataset.userid;
    let newIndex;

    // Decide where the element should be placed
    if(!afterElement) {
      newIndex = document.querySelector('.images').childElementCount;
    } else {
      newIndex = Math.max(getChildNodeIndex(afterElement.parentNode), 0);
      afterElement = undefined;
    }
    // Make the call to the API so save the new order
    const url = '/albums/' + albumId + '/' + imgId + '/order/' + newIndex + '?userId=' + userId;
    fetch(url, {
      method: 'POST'
    }).then(function() { sendNotification('success', 'Saved image order.') });
  })
})

containers.forEach(function(container) {
  container.addEventListener('dragover', function(e) {
    afterElement = getDragAfterElement(container, e.clientX, e.clientY);
    const draggable = document.querySelector('.dragging');
    
    if (afterElement == null) {
      container.appendChild(draggable.parentNode);
    } else {
      container.insertBefore(draggable.parentNode, afterElement.parentNode);
    }
    e.preventDefault();
  })
})

function getDragAfterElement(container, x, y) {
  const draggableElements = addToArray([container.querySelectorAll('.draggable:not(.dragging)')]);

  // Get element closest to cursor
  const el = draggableElements.reduce(function(closest, child, i) {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;
    if (offset < 0 && offset > closest.offset && y > box.top && y < box.bottom) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
  return el;
}