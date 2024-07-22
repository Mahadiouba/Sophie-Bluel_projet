document.addEventListener("DOMContentLoaded", () => {
  async function getWorks() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) throw new Error("Erreur lors de la récupération des travaux");
      const works = await response.json();
      return works;
    } catch (error) {
      console.error("Erreur:", error);
      alert(error.message);
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
      imageWork.setAttribute("data-id", work.id);
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
      imageWork.setAttribute("data-id", work.id);

      deleteIcon.classList.add("fa", "fa-trash", "delete-icon", "js-delete-work");
      deleteIcon.setAttribute("data-id", work.id);

      figureWork.append(imageWork, deleteIcon);
      galleryModale.appendChild(figureWork);
    });

    attachDeleteListeners();
  }

  async function deleteWorkById(workId) {
    
  }

  function attachDeleteListeners() {
    let btnDelete = document.querySelectorAll(".js-delete-work");
    btnDelete.forEach(button => button.addEventListener("click", function () {
      const workId = this.getAttribute("data-id");
      deleteWorkById(workId);
    }));
  }

  function updateGalleries(workId) {
    removeWorkFromGallery(".gallery", workId);
    removeWorkFromGallery(".js-admin-projets", workId);
  }

  function removeWorkFromGallery(gallerySelector, workId) {
    const gallery = document.querySelector(gallerySelector);
    const figures = gallery.querySelectorAll("figure");
    figures.forEach((figure) => {
      const img = figure.querySelector("img");
      if (img && img.getAttribute("data-id") === workId) {
        figure.remove();
      }
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
        const errorData = await response.json();
        throw new Error(`Erreur lors de l'ajout de la photo: ${errorData.message}`);
      }

      const newWork = await response.json();

      alert("Photo ajoutée avec succès!");
      addPhotoForm.reset();
      imagePreview.style.backgroundImage = "";
      imagePreview.classList.add("hidden");
      photoIcon.classList.remove("hidden");
      addPhotoLabel.classList.remove("hidden");

      addNewWorkToGallery(newWork);

      closeModalProjet();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout de la photo");

      addPhotoForm.reset();
      imagePreview.style.backgroundImage = "";
      imagePreview.classList.add("hidden");
      photoIcon.classList.remove("hidden");
      addPhotoLabel.classList.remove("hidden");
    }
  });

  function addNewWorkToGallery(newWork) {
    const gallery = document.querySelector(".gallery");
    let figureWork = document.createElement("figure");
    let imageWork = document.createElement("img");
    let captionWork = document.createElement("figcaption");

    imageWork.src = newWork.imageUrl;
    imageWork.alt = newWork.title;
    imageWork.setAttribute("data-id", newWork.id);

    captionWork.innerText = newWork.title;

    figureWork.append(imageWork, captionWork);
    gallery.appendChild(figureWork);

    const galleryModale = document.querySelector(".js-admin-projets");
    let figureWorkModale = document.createElement("figure");
    let imageWorkModale = document.createElement("img");
    let deleteIcon = document.createElement("i");

    imageWorkModale.src = newWork.imageUrl;
    imageWorkModale.alt = newWork.title;
    imageWorkModale.setAttribute("data-id", newWork.id);

    deleteIcon.classList.add("fa", "fa-trash", "delete-icon", "js-delete-work");
    deleteIcon.setAttribute("data-id", newWork.id);

    figureWorkModale.append(imageWorkModale, deleteIcon);
    galleryModale.appendChild(figureWorkModale);

    deleteIcon.addEventListener("click", deleteProjets);
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const isModaleProjet = event.target.closest(".modale-projet") !== null;
      if (isModaleProjet) {
        closeModalProjet();
      } else {
        closeModal();
      }
    });
  });

  addPhotoButton.addEventListener("click", openModalProjet);

  returnButton.addEventListener("click", () => {
    closeModalProjet();
    openModal();
  });

  getWorks().then((works) => {
    buildGallery(works);
    buildGalleryModale(works);
  });
});
