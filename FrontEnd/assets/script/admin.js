// Fonction pour récupérer les travaux depuis la base de données
async function getWorks() {
  try {
    const worksDB = await fetch("http://localhost:5678/api/works");
    const works = await worksDB.json();
    return works;
  } catch (error) {
    window.alert(error);
  }
}

// Fonction pour récupérer les catégories depuis la base de données
async function getCategories() {
  try {
    const categoriesDB = await fetch("http://localhost:5678/api/categories");
    const categories = await categoriesDB.json();
    return categories;
  } catch (error) {
    window.alert(error);
  }
}

// Fonction pour construire la galerie principale
function buildGallery(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Vider la galerie avant d'ajouter de nouveaux éléments

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

// Fonction pour construire la galerie dans la modale
function buildGalleryModale(works) {
  const galleryModale = document.querySelector(".js-admin-projets");
  galleryModale.innerHTML = ""; // Vider la galerie avant d'ajouter de nouveaux éléments

  works.forEach((work) => {
    let figureWork = document.createElement("figure");
    let imageWork = document.createElement("img");

    imageWork.src = work.imageUrl;
    imageWork.alt = work.title;

    figureWork.append(imageWork);
    galleryModale.appendChild(figureWork);
  });
}

/*************MODALEPROJET************ */

document.addEventListener("DOMContentLoaded", () => {
  getWorks().then((works) => {
    buildGallery(works);
    buildGalleryModale(works);
  });

  getCategories().then((categories) => {
    buildFilters(categories);
  });

  const modale = document.getElementById("modale");
  const modaleProjet = document.getElementById("modaleProjet");
  const openModalButtons = document.querySelectorAll(".js__modale");
  const closeModalButtons = document.querySelectorAll(".js-modale-close");
  const addPhotoButton = document.querySelector(".js-modale-add");
  const returnButton = document.querySelector(".js-modale-return");

  // Fonction pour ouvir la fenêtre modale
  function openModal() {
    modale.style.display = "flex";
    modale.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Fonction pour fermer la fenêtre modale
  function closeModal() {
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Fonction pour ouvir la fenêtre modale projet
  function openModalProjet() {
    modaleProjet.style.display = "flex";
    modaleProjet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Fonction pour fermer la fenêtre modale projet
  function closeModalProjet() {
    modaleProjet.style.display = "none";
    modaleProjet.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Ajout d'écouteurs d'évènement pour ouvrir et fermer la fe fenêtre modale
  openModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      closeModal();
      closeModalProjet();
    });
  });

  // Ajout d'écouteurs d'évènement pour ouvrir la fenêtre modale projet
  addPhotoButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
    openModalProjet();
  });

  // Ajout d'écouteurs d'évènement pou retourner à la fenêtre modale depuis la fenêtre modale projet
  returnButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeModalProjet();
    openModal();
  });

  // Fermer la modale en cliquant en dehors de son contenu
  window.addEventListener("click", (event) => {
    if (event.target === modale) {
      closeModal();
    }
    if (event.target === modaleProjet) {
      closeModalProjet();
    }
  });
});
