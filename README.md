# Online Photo Album
*Browser Technologies @cmda-minor-web 20-21*

## Table of contents
* Wireframes + P/E
* Web API research

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