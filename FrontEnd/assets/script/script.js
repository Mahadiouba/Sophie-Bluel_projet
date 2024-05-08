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
  const filtersContainer = document.querySelector(".filters");
  
  // Création d'un bouton "Toutes les catégories"
  const allButton = document.createElement("button");
  allButton.textContent = "Toutes les catégories";
  allButton.addEventListener("click", () => {
    // Afficher toutes les œuvres
    showAllWorks();
  });
  filtersContainer.appendChild(allButton);

  // Création d'un bouton pour chaque catégorie
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener("click", () => {
      // Filtrer les œuvres en fonction de la catégorie
      filterWorksByCategory(category.id);
    });
    filtersContainer.appendChild(button);
  });
}

function showAllWorks() {
  const gallery = document.querySelector(".gallery");
  // Supprimer toutes les œuvres actuellement affichées
  gallery.innerHTML = "";
  // Re-construire la galerie avec toutes les œuvres
  getWorks().then((works) => buildGallery(works, "mainGallery"));
}

function filterWorksByCategory(categoryId) {
  const gallery = document.querySelector(".gallery");
  // Supprimer toutes les œuvres actuellement affichées
  gallery.innerHTML = "";
  // Récupérer les œuvres de la catégorie spécifiée
  getWorks().then((works) => {
    const filteredWorks = works.filter((work) => work.category === categoryId);
    // Re-construire la galerie avec les œuvres filtrées
    buildGallery(filteredWorks, "mainGallery");
  });
}
