// Глобальные переменные и функции
const cardsList = document.querySelector(".photo-cards-grid__list");

const editOpenBtn = document.querySelector(".profile__edit-btn");
const popupEdit = document.querySelector(".popup_type_edit");
const editCloseBtn = popupEdit.querySelector(".popup__btn-close");

const formEdit = popupEdit.querySelector(".form");
const inputName = formEdit.querySelector("#user-name");
const inputAbout = formEdit.querySelector("#about");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const addOpenBtn = document.querySelector(".profile__add-btn");
const popupAdd = document.querySelector(".popup_type_add");
const addCloseBtn = popupAdd.querySelector(".popup__btn-close");

const formAdd = popupAdd.querySelector(".form");

const popupImage = document.querySelector(".popup_type_image");
const imageCloseBtn = popupImage.querySelector(".popup__btn-close");
const pic = popupImage.querySelector(".popup__img");
const caption = popupImage.querySelector(".popup__caption");

function openPopup(currentPopup) {
  return currentPopup.classList.add("popup_opened");
}

function closePopup(currentPopup) {
  return currentPopup.classList.remove("popup_opened");
}

function toggleLike(currLikeBtn) {
  return currLikeBtn.classList.toggle("card__like-btn_liked");
}

function deleteCard(el) {
  return el.closest(".photo-cards-grid__photo-card").remove();
}

function createCard(data) {
  const cardTemplateContent = document.querySelector("#template-card").content;
  const card = cardTemplateContent
    .querySelector(".photo-cards-grid__photo-card")
    .cloneNode(true);
  card.querySelector(".card__img").src = data.link;
  card.querySelector(".card__img").alt = data.name;
  card.querySelector(".card__title").textContent = data.name;

  const likeBtn = card.querySelector(".card__like-btn");
  likeBtn.addEventListener("click", () => toggleLike(likeBtn));

  const deleteBtn = card.querySelector(".photo-cards-grid__delete-btn");
  deleteBtn.addEventListener("click", () => deleteCard(deleteBtn));

  const cardImg = card.querySelector(".card__img");
  cardImg.addEventListener("click", () => {
    // Замыкание
    pic.src = data.link;
    pic.alt = data.name;
    caption.textContent = data.name;
    return openPopup(popupImage);
  });

  return card;
}

// Вставка карточек в разметку
initialCards.forEach((data) => {
  const card = createCard(data);
  return cardsList.append(card);
});

// Обработка попапа картинки
imageCloseBtn.addEventListener("click", () => {
  return closePopup(popupImage);
});

// Обработка попапа реактирования профиля
editOpenBtn.addEventListener("click", function () {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  return openPopup(popupEdit);
});

editCloseBtn.addEventListener("click", function () {
  return closePopup(popupEdit);
});

function handleFormEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  return closePopup(popupEdit);
}
formEdit.addEventListener("submit", handleFormEditSubmit);

// Обработка попапа добавления фото
addOpenBtn.addEventListener("click", () => openPopup(popupAdd));
addCloseBtn.addEventListener("click", () => closePopup(popupAdd));

function handleFormAddSubmit(e) {
  e.preventDefault();

  const inputPlace = formAdd.querySelector("#place-name");
  const inputLink = formAdd.querySelector("#place-link");
  const data = { name: inputPlace.value, link: inputLink.value };
  const newCard = createCard(data);

  cardsList.prepend(newCard);
  inputLink.value = "";
  inputPlace.value = "";
  return closePopup(popupAdd);
}
formAdd.addEventListener("submit", handleFormAddSubmit);
