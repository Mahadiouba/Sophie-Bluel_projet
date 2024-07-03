document.addEventListener("DOMContentLoaded", () => {
  async function getWorks() {
    try {
      const worksDB = await fetch("http://localhost:5678/api/works");
      const works = await worksDB.json();
      return works;
    } catch (error) {
      alert(error);
    }
  }

  async function getCategories() {
    try {
      const categoriesDB = await fetch("http://localhost:5678/api/categories");
      const categories = await categoriesDB.json();
      populateCategoryOptions(categories);
    } catch (error) {
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
      imageWork.src = work.imageUrl;
      imageWork.alt = work.title;
      figureWork.append(imageWork);
      galleryModale.appendChild(figureWork);
    });
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
  const addPhotoForm = document.getElementById("add-photo-form");
  const addPhotoLabel = document.querySelector(".add-photo-label");
  const icon = document.querySelector(".form-group-photo i");

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
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.style.backgroundImage = `url(${e.target.result})`;
        imagePreview.classList.remove("hidden");
        addPhotoLabel.classList.add("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.style.backgroundImage = "";
      imagePreview.classList.add("hidden");
      addPhotoLabel.classList.remove("hidden");
    }
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

      const works = await getWorks();
      buildGallery(works);
      buildGalleryModale(works);
      closeModalProjet();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout de la photo");
    }
  });

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

  addPhotoButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
    openModalProjet();
  });

  returnButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeModalProjet();
    openModal();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modale) {
      closeModal();
    }
    if (event.target === modaleProjet) {
      closeModalProjet();
    }
  });

  getWorks().then((works) => {
    buildGallery(works);
    buildGalleryModale(works);
  });

  getCategories();
});
