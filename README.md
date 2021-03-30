# Online Photo Album
*Browser Technologies @cmda-minor-web 20-21*

![copy detect](https://github.com/StanBankras/browser-technologies-2021/blob/master/img/preview.png?raw=true)

## [Live demo](https://pe-photo-album.herokuapp.com/)

## Table of contents
* Wireframes + P/E
* Web API research
* Progressive enhancement idea
* Core functionalities
* Browsers I will test in

## Wireframes + P/E
### Empty state
<img src="https://github.com/StanBankras/browser-technologies-2021/blob/master/img/wireframes/empty-state.jpg?raw=true" alt="Empty state" height="500"/>
  
This page is the empty state where the user clearly sees the purpose of the website. They can click to create a new album for their photos.

#### Functional/reliable layer: semantic HTML to use
* button

#### Usable layer extras
* Style the button to make it more prominent

### New album creation - step 1: details
<img src="https://github.com/StanBankras/browser-technologies-2021/blob/master/img/wireframes/new.jpg?raw=true" alt="New album" height="500"/>

  
This page is the first step of creating a new album. The user can enter a name and optionally a description.

#### Functional/reliable layer: semantic HTML to use
* input
* textbox
* button

#### Usable layer extras
* Improve the layout

#### Pleasurable
* Break down the process in steps

### New album creation - step 2: upload
<img src="https://github.com/StanBankras/browser-technologies-2021/blob/master/img/wireframes/upload.jpg?raw=true" alt="Upload images" height="500"/>

  
This page is the second step of creating a new album. The user can upload images to their album.

#### Functional/reliable layer: semantic HTML to use
* input[type=file]
* figure with figcaption
* button

#### Usable layer extras
* Make the input clearer
* Layout of the uploaded images for better overview

#### Pleasurable
* No page refreshes needed as javascript can take care of uploading

### New album creation - step 2.1: image details
<img src="https://github.com/StanBankras/browser-technologies-2021/blob/master/img/wireframes/photo-details.jpg?raw=true" alt="add photo metadata" height="500"/>

This page is within the second step of creating a new album. The user can attach meta data to the images they upload.

#### Functional/reliable layer: semantic HTML to use
* img
* textbox
* input[type=text]
* button

#### Usable layer extras
* Scale image so it's not too big

#### Pleasurable
* This page comes as a popup, so user doesn't leave the upload page

### New album creation - step 3: order
<img src="https://github.com/StanBankras/browser-technologies-2021/blob/master/img/wireframes/order.jpg?raw=true" alt="Order photos" height="500"/>

This page is the third step of creating a new album. The user can sort their uploaded images in the order they want.

#### Functional/reliable layer: semantic HTML to use
* button
* figure with figcaption
* input[type=number]

#### Usable layer extras
* Place image & its buttons next to eachother

#### Pleasurable
* Ordering happens without page refresh


### Albums overview
<img src="https://github.com/StanBankras/browser-technologies-2021/blob/master/img/wireframes/albums.jpg?raw=true" alt="See albums in overview" height="500"/>

This page is the overview if the user has albums.

#### Functional/reliable layer: semantic HTML to use
* img
* h1/h2
* p

#### Usable layer extras
* Display first few images in a nice grid view

### Carroussel
<img src="https://github.com/StanBankras/browser-technologies-2021/blob/master/img/wireframes/carroussel.jpg?raw=true" alt="Carroussel" height="500"/>

Each album can be viewed in a carroussel

#### Functional/reliable layer: semantic HTML to use
* figure with figcaption
* button

#### Usable layer extras
* Display images inline so user can scroll through it

#### Pleasurable layer
* Javascript can allow for nice carroussel experience

## Web API research
At first, I was most likely going to research the [MediaStream Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API) for this project, since I might be able to offer users the feature to capture an image and directly put it into their album.

However, I found out that mobile & tablet users already get the option to capture images immediately when they press to upload a file to a file input (that supports images). I didn't see this API as an enhancement to my app anymore

## Progressive enhancement idea
The goal of this project is to build a fully progressive enhanced website that works on many different browsers, with / without javascript and with / without CSS. Here's how I technically plan to achieve these so-called layers:

### 1. Functional
* Allow user to login so they can continue where they left off
* The user can upload and build their full photo album

### 2. Usable
* Photo dimensions can become the same width or height, so the editing and uploading process is a lot smoother and the user can see more at a glance
* Layout can be improved so that the interface will be more easily navigated through making for a more usable experience.
* Preview the photo albums in a neat way

### 3. Pleasurable
* Upload & delete images without seeing page refreshes happen: it removes some distraction and it feels like things happen more instantly.
* Allow users to directly capture an image from inside the browser, so they can for instance build a photo album while on vaction, or digitalize an old photo book/album.
* Automatically play albums as a slideshow

## Core functionalities
* Create new photo album (name & description)
* Add photos to the album
* Order photos differently in the album
* Edit existing albums
* Attach metadata to photos
* View the album in carroussel or slideshow

## Browsers I will test
* Browsers desktop: chrome & firefox
* Mobile: iOS & Android (safari & chrome)

**Web technology I will research**
* ~~[MediaStream Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API)~~
* [Drag & drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

## Test results
[Find out about my test results in the wiki of this repository](https://github.com/StanBankras/browser-technologies-2021/wiki/Testing-my-app)

## Choices of code written
I want to be able to support as many browsers as possible, while still writing relatively modern code. At first, I wrote most of my code in ES6, as I am most used to that. 

### ES6 specific features
After looking at ES6 features that I use, like `spread operators: [...array, ...array]` on [caniuse](https://caniuse.com/), I started to rewrite my code. The spread operator for example is not supported on Internet Explorer at all. I replaced my spread operator usage with this function I made:
```js
function addToArray(items) {
    const array = [];
    items.forEach(function(item) {
      item.forEach(function(subitem) { array.push(subitem) });
    });
    
    return array;
}
```
It gives me the same result, and I can support more browsers this way.

### Arrow functions
I'm a big fan of using arrow functions, because it means writing less and more clean code. Sadly, arrow functions are also not supported by IE, so I rewrote them to normal `function()`.

### Cutting the mustard
At some point, I don't want to endlessly refactor my code to support the most ancient browsers. My 'javascriptless' experience is good, everything works without it. That's why I chose to for instance keep my `forEach` in. It might not be supported in old IE, Chrome or Firefox browsers, but they can still use my app. I used a feature detection in Javascript to make this happen.

#### Check if browser supports promises
If not, disable all javascript code based on this boolean that uses them (fetch).
```js
function promisesSupported() {
  try {
    const promise = new Promise(function (x, y) {});
    return true;
  } catch (e) {
    return false;
  }
}
// https://stackoverflow.com/a/22517230

// in code:

if(promisesSupported()) {
```

#### Check if copy is possible
```js
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
```

Only when clipboard is available, I will show the user that they can click to copy their ID. I don't want users to see a functionality, while when they go for the interaction, nothing might happen. This feature detect prevents that from happening.

![copy detect](https://github.com/StanBankras/browser-technologies-2021/blob/master/img/accessible/copy-detect.png?raw=true)

### CSS

#### Feature detection
In my CSS, I used a mediaquery to detect a touch/inaccurate device:
```scss
@media (pointer:coarse) {
  .image {
    form {
      opacity: 1;
    }
  }
  #image-order {
    opacity: 1;
    max-height: unset;
    max-width: unset;
    padding: 0.5rem 1rem;
  }
}
// https://medium.com/@ferie/detect-a-touch-device-with-only-css-9f8e30fa1134
```

#### Remove variables
At the start, I used `:root` variables in my CSS, however, I found out that they are not supported in latest versions of IE. As I don't want my users to see no colors, I removed my variables.

## TODO from 24-03
- [x] Add metadata to photos
- [x] Edit photo album
  - [x] Edit order
  - [x] Upload new photos
  - [x] Delete photo
- [x] Delete album
- [x] Edit photo metadata
- [x] Preview album in carroussel
- [x] Preview album in slideshow
- [x] Test browsers

## Acknowledgements
* [Drag & Drop API tutorial](https://www.youtube.com/watch?v=jfYWwQrtzzY)
* [Promise feature detection](https://stackoverflow.com/a/22517230)
* [Detect touch or inaccurate devices](https://medium.com/@ferie/detect-a-touch-device-with-only-css-9f8e30fa1134)