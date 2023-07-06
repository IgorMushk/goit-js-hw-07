/*
=== Задание 1 - галерея изображений

Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. Посмотри демо видео работы галереи.

Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
2. Реализация делегирования на ul.gallery и получение url большого изображения.
3. Подключение скрипта и стилей библиотеки модального окна basicLightbox (https://basiclightbox.electerious.com/). Используй CDN сервис jsdelivr (https://www.jsdelivr.com/package/npm/basiclightbox?path=dist) и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией (https://github.com/electerious/basicLightbox#readme) и примерами (https://basiclightbox.electerious.com/).
5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox (https://basiclightbox.electerious.com/).

 --- Разметка элемента галереи

Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li>

Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

 --- Закрытие с клавиатуры

ВНИМАНИЕ!
Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox (https://basiclightbox.electerious.com/) есть метод для программного закрытия модального окна.
*/

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
