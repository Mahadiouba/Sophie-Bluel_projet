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
/*
let modifier = document.querySelector('.buton__modifier');

modifier.addEventListener(click , () => {

})*/

document.addEventListener("DOMContentLoaded", () => {
  const modale = document.getElementById("modale");
  const openModalButtons = document.querySelectorAll(".js__modale");
  const closeModalButton = modale.querySelector(".js-modale-close");

  // Fonction pour ouvrir la modale
  function openModal() {
    modale.style.display = "flex";
    modale.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Fonction pour fermer la modale
  function closeModal() {
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Ajouter des écouteurs d'événements pour ouvrir et fermer la modale
  openModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeModalButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
  });

  // Fermer la modale en cliquant en dehors de son contenu
  window.addEventListener("click", (event) => {
    if (event.target === modale) {
      closeModal();
    }
  });
  

  (() => {
    getWorks().then((works) => buildGalleryModale(works, ".js-admin-projets"));
  })();

  function buildGalleryModale(works) {
    const galleryModale = document.querySelector(".js-admin-projets");
    galleryModale.innerHTML = ""; // Clear the gallery before appending new elements
    const modifier = document.querySelector(".js__modale");
    modifier.addEventListener("click", () => {});
    works.forEach((work) => {
      let figureWork = document.createElement("figure");
      let imageWork = document.createElement("img");
      let edit = document.createElement('p')
  
      imageWork.src = work.imageUrl;
      imageWork.alt = work.title;
      edit.innerText = "Éditer";
  
      figureWork.append(imageWork, edit);
      galleryModale.appendChild(figureWork);
    });
  }
});
