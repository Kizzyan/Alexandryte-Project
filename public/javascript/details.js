const image = document.querySelector('#image')
const imageCont = document.querySelector('#image-container-minor')
const imageInput = document.querySelector('#imageUrl')
const darken = document.querySelector('#darken')
const deleteBtn = document.querySelector('#delete-btn')
const cancelBtn = document.querySelector('#cancel-btn-form')
const deleteForm = document.querySelector('#delete-form')

let width = image.width;
let height = image.height;

if (width > height || width == height) {
    image.style.setProperty("height", "auto")
    image.style.setProperty("max-width", "100%")
    imageCont.style.setProperty("display", "grid")
    imageCont.style.setProperty("align-content", "center")
}


deleteBtn.addEventListener('click', () => {
    deleteForm.style.setProperty("display", "block")
    darken.style.setProperty('display', 'block')
})
cancelBtn.addEventListener('click', () => {
    deleteForm.style.setProperty("display", "none")
    darken.style.setProperty("display", "none")
})
darken.addEventListener('click', () => {
    deleteForm.style.setProperty("display", "none")
    darken.style.setProperty("display", "none")
})