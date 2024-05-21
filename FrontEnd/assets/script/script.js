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

  works.forEach(work => {
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

// Build the filter buttons
function buildFilters(categories) {
  const filtersContainer = document.querySelector(".filters");

  // Create a button for "All Categories"
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.addEventListener("click", () => {
      showAllWorks();
  });
  filtersContainer.appendChild(allButton);

  // Create a button for each category
  categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.addEventListener("click", () => {
          filterWorksByCategory(category.id);
      });
      filtersContainer.appendChild(button);
  });
}

// Show all works
function showAllWorks() {
  getWorks().then(works => buildGallery(works));
}


function filterWorksByCategory(categoryId) {
  getWorks().then(works => {
      const filteredWorks = works.filter(work => work.categoryId === categoryId);
      if (filteredWorks.length > 0) {
          buildGallery(filteredWorks);
      } else {
          const gallery = document.querySelector(".gallery");
          gallery.innerHTML = "<p>Aucune œuvre trouvée pour cette catégorie.</p>";
      }
   })
  };
