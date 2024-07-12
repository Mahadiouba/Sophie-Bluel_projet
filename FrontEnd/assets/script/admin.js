document.addEventListener("DOMContentLoaded", () => {
  async function getWorks() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des travaux");
      const works = await response.json();
      return works;
    } catch (error) {
      console.error("Erreur:", error);
      alert(error);
    }
  }

  async function getCategories() {
    try {
      const response = await fetch("http://localhost:5678/api/categories");
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des catégories");
      const categories = await response.json();
      populateCategoryOptions(categories);
    } catch (error) {
      console.error("Erreur:", error);
      alert(error);
    }
  }

  function buildGallery(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
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

  function buildGalleryModale(works) {
    const galleryModale = document.querySelector(".js-admin-projets");
    galleryModale.innerHTML = "";
    works.forEach((work) => {
      let figureWork = document.createElement("figure");
      let imageWork = document.createElement("img");
      let deleteIcon = document.createElement("i");

      imageWork.src = work.imageUrl;
      imageWork.alt = work.title;

      deleteIcon.classList.add("fa", "fa-trash", "delete-icon");
      deleteIcon.setAttribute("data-id", work.id);

      figureWork.append(imageWork, deleteIcon);
      galleryModale.appendChild(figureWork);
    });

    // Ajouter des écouteurs d'événements pour les icônes de suppression
    const deleteIcons = document.querySelectorAll(".delete-icon");
    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", async (event) => {
        const workId = event.target.getAttribute("data-id");
        await deleteWork(workId);
      });
    });
  }

  async function deleteWork(workId) {
    try {
      const response = await fetch(
        `http://localhost:5678/api/works/${workId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la photo");
      }

      console.log("Work supprimé avec succès");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression de la photo");
    }
  }

  function populateCategoryOptions(categories) {
    const categorySelect = document.getElementById("categorie");
    categories.forEach((category) => {
      let option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      categorySelect.add(option);
    });
  }

  const modale = document.getElementById("modale");
  const modaleProjet = document.getElementById("modaleProjet");
  const openModalButtons = document.querySelectorAll(".js__modale");
  const closeModalButtons = document.querySelectorAll(".js-modale-close");
  const addPhotoButton = document.querySelector(".js-modale-add");
  const returnButton = document.querySelector(".js-modale-return");
  const photoInput = document.getElementById("photo");
  const imagePreview = document.getElementById("image-preview");
  const photoIcon = document.getElementById("photo-icon");
  const addPhotoForm = document.getElementById("add-photo-form");
  const addPhotoLabel = document.getElementById("photo-add");

  function openModal() {
    modale.style.display = "flex";
    modale.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openModalProjet() {
    modaleProjet.style.display = "flex";
    modaleProjet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModalProjet() {
    modaleProjet.style.display = "none";
    modaleProjet.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  photoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.style.backgroundImage = `url(${e.target.result})`;
      imagePreview.classList.remove("hidden");
      photoIcon.classList.add("hidden");
      addPhotoLabel.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  addPhotoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addPhotoForm);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la photo");
      }

      const newWork = await response.json();
      

      alert("Photo ajoutée avec succès!");
      addPhotoForm.reset();
      imagePreview.style.backgroundImage = "";
      imagePreview.classList.add("hidden");
      addPhotoLabel.classList.remove("hidden");

      // Ajoute la nouvelle photo directement à la galerie
      addNewWorkToGallery(newWork);

      closeModalProjet();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout de la photo");
    }
  });

  function addNewWorkToGallery(work) {
    // Met à jour la galerie principale
    const gallery = document.querySelector(".gallery");
    let figureWork = document.createElement("figure");
    let imageWork = document.createElement("img");
    let captionWork = document.createElement("figcaption");

    imageWork.src = work.imageUrl;
    imageWork.alt = work.title;
    captionWork.innerText = work.title;

    figureWork.append(imageWork, captionWork);
    gallery.appendChild(figureWork);

    // Met à jour la galerie dans la modale
    const galleryModale = document.querySelector(".js-admin-projets");
    let figureWorkModale = document.createElement("figure");
    let imageWorkModale = document.createElement("img");
    let deleteIcon = document.createElement("i");

    imageWorkModale.src = work.imageUrl;
    imageWorkModale.alt = work.title;

    deleteIcon.classList.add("fa", "fa-trash", "delete-icon");
    deleteIcon.setAttribute("data-id", work.id);

    figureWorkModale.append(imageWorkModale, deleteIcon);
    galleryModale.appendChild(figureWorkModale);

    // Ajouter un écouteur d'événements pour l'icône de suppression
    deleteIcon.addEventListener("click", async (event) => {
      const workId = event.target.getAttribute("data-id");
      await deleteWork(workId);
    });
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  addPhotoButton.addEventListener("click", () => {
    closeModal();
    openModalProjet();
  });

  returnButton.addEventListener("click", () => {
    closeModalProjet();
    openModal();
  });

  getWorks().then((works) => {
    buildGallery(works);
    buildGalleryModale(works);
  });

  getCategories();
});



