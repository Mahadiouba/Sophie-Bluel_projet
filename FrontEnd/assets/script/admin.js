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

// Build the gallery with works
function buildGallery(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Clear the gallery before appending new elements

  works.forEach((work) => {
    let figureWork = document.createElement("figure");
    let imageWork = document.createElement("img");
    let captionWork = document.createElement("figcaption");

    imageWork.src = work.imageUrl;
    imageWork.alt = work.title;
    captionWork.innerText = work.title;

    figureWork.append(imageWork, captionWork);
    gallery.appendChild(figureWork);
  });
}

