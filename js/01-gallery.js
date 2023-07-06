import { galleryItems } from "./gallery-items.js";
// Change code below this line

//console.log(galleryItems);
//console.log("For GitHub");

const imagesListArr = galleryItems.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
});

const galleryList = document.querySelector(".gallery");
galleryList.insertAdjacentHTML("beforeend", imagesListArr.join(""));

galleryList.addEventListener("click", handleImgClick);

function handleImgClick(event) {
  if (!event.target.classList.contains("gallery__image")) return;
  event.preventDefault();
  const urlImgLarge = event.target.dataset.source;
  showImageModal(urlImgLarge);
}

function showImageModal(urlImg) {
  const instance = basicLightbox.create(`
    <img src="${urlImg}" width="800" height="600">
`);
  instance.show();

  document.addEventListener("keydown", checkClose);

  function checkClose(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", checkClose);
    }
  }
}
