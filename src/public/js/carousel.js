const carousel = document.getElementById('carousel');
const container = document.querySelector('.container');
const photos = document.querySelector('.photos');

// Add classes and HTML that is needed when Javascript works
photos.classList.add('js');
carousel.insertAdjacentHTML('beforeEnd', `
  <div class="controls">
    <button id="prev">Previous</button>
    <button id="play">Play slideshow</button>
    <button id="next">Next</button>
  </div>
`);

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const containerWidth = container.getBoundingClientRect().width;
const amountOfPhotos = carousel.dataset.photos;
let index = 0;
let direction = 'next';
let auto = false;


nextButton.addEventListener('click', () => {
  if(index < amountOfPhotos - 1) index++;
  auto = false;
  playButton.innerText = 'Play slideshow'
  photos.style.transform = `translate(${-index * 316}px, 0)`;
});

prevButton.addEventListener('click', () => {
  if(index > 0) index--;
  auto = false;
  playButton.innerText = 'Play slideshow'
  photos.style.transform = `translate(${-index * 316}px, 0)`;
});

playButton.addEventListener('click', () => {
  if(auto) {
    auto = false;
    playButton.innerText = 'Play slideshow'
  } else {
    playButton.innerText = 'Stop slideshow'
    auto = true;
    autoSlideShow();
  }
});

function autoSlideShow() {
  if(!auto) return;
  if(index < amountOfPhotos - 1 && direction === 'next') index++;
  if(index > 0 && direction === 'prev') index--;
  if(index === amountOfPhotos - 1) {
    direction = 'prev';
  }
  if(index === 0) {
    direction = 'next';
  }
  photos.style.transform = `translate(${-index * 316}px, 0)`;
  setTimeout(autoSlideShow, 2000);
}
