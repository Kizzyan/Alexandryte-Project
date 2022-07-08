const image = document.querySelector('#image')
const imageInput = document.querySelector('#imageUrl')

let width = image.width;
let height = image.height;

if (width > height || width == height) {
    image.style.setProperty("height", "auto")
    image.style.setProperty("max-width", "100%")
}