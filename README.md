# Online Photo Album
*Browser Technologies @cmda-minor-web 20-21*

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
I am most likely going to research the [MediaStream Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API) for this project, since I might be able to offer users the feature to capture an image and directly put it into their album.

## Progressive enhancement idea
The goal of this project is to build a fully progressive enhanced website that works on many different browsers, with / without javascript and with / without CSS. Here's how I technically plan to achieve these so-called layers:

### 1. HTML only layer
* Allow user to login with their previous ID (to continue with their albums)
* If they don't have an ID, allow them to generate one
* Through every navigation, pass this ID with requests to the server and make sure the server always sends it back in the generated HTML
* Use form methods to communicate data to the server

### 2. HTML & CSS layer
* Potentially add a more neat progressive disclosure pattern to the album creation page
* Communication/navigation through the server is the same as the first layer, as there is no javascript yet

### 3. HTML, CSS & Javascript layer
* Possibility to use client-side rendering to avoid page refreshes and give the user a more 'appy' experience, as calls for data are handled by Javascript.
* If localstorage is available, the user ID is stored here and automatically given back with requests. The user won't have to fill it in anymore.
* Requests for posting can mostly be handled by javascript clientside, instead of navigating to a post route with the browser through a form.

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
* [MediaStream Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API)

## TODO from 24-03
- [x] Add metadata to photos
- [x] Edit photo album
  - [x] Edit order
  - [x] Upload new photos
  - [x] Delete photo
- [x] Delete album
- [ ] Edit photo metadata
- [ ] Preview album in carroussel
- [ ] Preview album in slideshow