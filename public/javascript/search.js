const searchBtn = document.querySelector('.searchBtn')
const searchForm = document.getElementById('searchContainer')

searchBtn.addEventListener('click', () => {
    if (searchForm.style.display == "block") {
        searchForm.style.setProperty("display", "none")
    } else {
        searchForm.style.setProperty("visibility", "visible")
        searchForm.style.setProperty("display", "block")
    }
})