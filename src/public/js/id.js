// Only add 'click to copy' if javascript is available and supports clipboard
if ('clipboard' in navigator) {
  const idText = document.querySelector('h1 span');
  const id = idText.innerText;
  const el = document.createElement('textarea');
  const body = document.querySelector('body');

  idText.innerText = id + ' (click to copy)';
  idText.classList.add('copy');
  idText.addEventListener('click', function() {
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copied your ID to your clipboard!');
  });
}