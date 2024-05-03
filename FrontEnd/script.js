// get works from DataBase
async function getWorks() {
  try {
    const worksDB = await fetch("http://localhost:5678/api/works");
    const works = await worksDB.json();
    return works;
  } catch (error) {
    window.alert(error);
  }
}
// get Categoriers from DataBase
async function getCategories() {
  try {
    const categoriesDB = await fetch("http://localhost:5678/api/categories");
    const categories = await categoriesDB.json();
    return categories;
  } catch (error) {
    window.alert(error);
  }
}

(() => {
  getWorks().then((works) => buildGallery(works, "mainGallery"));
  getCategories().then((categories) => buildFilters(categories));
})();

function buildGallery(works, type) {
  for (let i in works) {
    let figureWork = document.createElement("figure");
    let imageWork = document.createElement("img");
    let captionWork = document.createElement("figcaption");

    imageWork.src = works[i].imageUrl;
    imageWork.alt = works[i].title;
    captionWork.innerText = works[i].title;

    figureWork.append(imageWork, captionWork);
    document.querySelector(".gallery").appendChild(figureWork);
  }
}

function buildFilters(categories) {
  
}
