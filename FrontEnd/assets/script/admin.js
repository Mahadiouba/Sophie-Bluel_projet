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

document.addEventListener("DOMContentLoaded", () => {
  getWorks().then((works) => {
    buildGallery(works);
    buildGalleryModale(works);
  });

  getCategories().then((categories) => {
    buildFilters(categories);
  });

  const modale = document.getElementById("modale");
  const openModalButtons = document.querySelectorAll(".js__modale");
  const closeModalButton = document.querySelector(".js-modale-close");

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
});

/*************MODALEPROJET************ */
