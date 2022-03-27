import Card from "./Card";
import Storage from "./Storage";
import Modal from "./Modal";

export default class Listontroller {
  constructor(listEditor) {
    this.listEditor = listEditor;
    this.state = [];
  }

  init() {
    this.listEditor.bindToDOM();
    this.container = document.querySelector("#container");

    this.addSubscribe(this.container);

    this.storage = new Storage();
    this.state = this.storage.getPinCards();
    this.loadState(this.state);
  }

  addSubscribe(element) {
    element.addEventListener("click", this.onClickOpenForm.bind(this));
    element.addEventListener("click", this.onClickAddCard.bind(this));
    element.addEventListener("click", this.onClickDeleteCard.bind(this));
    element.addEventListener("click", this.onClickRemoveCard.bind(this));
    element.addEventListener("click", this.onClickCancel.bind(this));
    element.addEventListener("click", this.onClickSaveCard.bind(this));
    element.addEventListener("keyup", this.keyUp.bind(this));
    element.addEventListener("click", this.completionField.bind(this));
    element.addEventListener("input", this.completionField.bind(this));
  }

  loadState(arr) {
    if (arr) {
      arr.forEach((elem) => {
        const card = new Card();
        const result = card.constructor.template(elem.name, elem.price);

        document.querySelector("tbody").insertAdjacentHTML("beforeend", result);
      });
      const table = document.querySelector(".table-product");
      const tableItems = document.querySelectorAll(".article-box");
      const greeting = document.querySelector(".greeting__title");

      tableItems.length > 0
        ? table.classList.remove("hidden")
        : table.classList.add("hidden");
      tableItems.length > 0
        ? greeting.classList.add("hidden")
        : greeting.classList.remove("hidden");
    }
  }

  saveCard(value) {
    this.state.push(value);
    this.storage.save(this.state);
  }

  removeItem(arr, value) {
    const item = arr.findIndex((elem) => elem.name === value);

    this.state.splice(item, 1);
    this.storage.save(this.state);
  }

  completionField(e) {
    // заполнеие полей и удаление подсказок пр этом
    if (!e.target.classList.contains("input-tooltip")) {
      return;
    }

    if (e.target.parentElement.querySelector(".tooltip-active")) {
      e.target.nextElementSibling.remove();
    }
    // const isNumber = /[1-9][0-9]*$/.test(parseInt(e.target, 10));

    this.newName = document.querySelector(".input-article-name");
    this.newPrice = document.querySelector(".input-article-price");
  }

  validityFields(field) {
    // проверка соответствия шаблону, добавление подсказки
    const templateTooltip = document.createElement("span");
    templateTooltip.textContent = "*Вы пропустили обязательное поле";
    templateTooltip.classList.add("tooltip-active");

    if (
      field.parentElement.lastElementChild.classList.contains("tooltip-active")
    ) {
      return;
    }

    if (field.value === "") {
      field.insertAdjacentElement("afterend", templateTooltip);
      templateTooltip.tooltipText = "Заполните поле";
      return false;
    }

    if (field.value !== "" && field.classList.contains("input-article-price")) {
      const isNumber = /^[1-9][0-9]*$/.test(parseInt(field.value, 10));

      if (!isNumber) {
        field.insertAdjacentElement("afterend", templateTooltip);
        templateTooltip.textContent = "Стоимость должна быть больше 0";
        return false;
      }
    }

    if (field.classList.contains("input-article-price")) {
      const isLetter = /[\D]+$/i.test(field.value);

      if (isLetter) {
        field.insertAdjacentElement("afterend", templateTooltip);
        templateTooltip.textContent = "Поле должно содержать только цифры";
        return false;
      }
    }
    return true;
  }

  onClickOpenForm(e) {
    // открытие формы
    e.preventDefault();
    if (
      // если форма для добавления или редактирования
      e.target.classList.contains("add__button") ||
      e.target.classList.contains("article__edit")
    ) {
      this.modal = new Modal(this.container);
      if (document.querySelector(".modal")) {
        return;
      }
      this.modal.redrawModalForm();
      this.modal.redrawInput();
    }

    if (e.target.classList.contains("article__edit")) {
      this.onEditValueButton("Сохранить", "article__save-button");

      this.parent = e.target.parentElement.closest(".article-box");
      this.articleName =
        this.parent.querySelector(".article__title").textContent;
      this.articlePrice =
        this.parent.querySelector(".article__price").textContent;

      this.modal.showInputValue(this.articleName, this.articlePrice);
    }
  }

  onEditValueButton(value, type) {
    // изменение названий кнопок на форме
    const buttonSave = document.querySelector(".article__add-button");
    buttonSave.classList.remove("article__add-button");
    buttonSave.classList.add(type);
    buttonSave.textContent = value;
  }

  savingChanges(name, price) {
    // сохранение изменений

    const isValidName = this.validityFields(name);
    const isValidPrice = this.validityFields(price);

    if (!isValidName || !isValidPrice) {
      return;
    }

    if (this.articleName !== name.value || this.articlePrice !== price.value) {
      this.parent.remove();

      this.removeItem(this.state, this.articleName);
      const newCard = this.renderingCard(name, price);

      this.saveCard(newCard);
    }
    this.modal.closeModalForm();
  }

  renderingCard(name, price) {
    // добавление разметки карточки
    const card = new Card();
    card.init();
    name.value = "";
    price.value = "";

    if (card)
      document.querySelector(".greeting__title").classList.add("hidden");

    return card;
  }

  onClickAddCard(e) {
    // добавление нового товара
    if (!e.target.classList.contains("article__add-button")) {
      return;
    }

    e.preventDefault();

    this.articleName = document.querySelector(".input-article-name");
    this.articlePrice = document.querySelector(".input-article-price");

    const isValidName = this.validityFields(this.articleName);
    const isValidPrice = this.validityFields(this.articlePrice);

    if (!isValidName || !isValidPrice) {
      return;
    }

    const saveItem = this.renderingCard(this.articleName, this.articlePrice);
    document.querySelector(".table-product").classList.remove("hidden");
    this.modal.closeModalForm();
    this.saveCard(saveItem);
  }

  onClickDeleteCard(e) {
    // Удалить карточку из списка
    e.preventDefault();

    if (!e.target.classList.contains("article__del")) {
      return;
    }

    this.modal = new Modal(this.container);
    if (!document.querySelector(".modal")) {
      this.modal.redrawModalForm();
      this.onEditValueButton("Удалить", "article__remove-button");
      this.modal.showDescription("Удалить товар из списка?");
    }
    this.parentCard = e.target.closest(".article-box");

    this.name = e.target.parentElement.parentElement.firstElementChild;
    this.price = e.target.parentElement.previousElementSibling;
  }

  onClickRemoveCard(e) {
    if (!e.target.classList.contains("article__remove-button")) {
      return;
    }
    this.parentCard.remove();
    this.removeItem(this.state, this.name.textContent);
    this.modal.closeModalForm();
    if (!document.querySelector(".article-box")) {
      document.querySelector(".table-product").classList.add("hidden");
      document.querySelector(".greeting__title").classList.remove("hidden");
    }
  }

  onClickSaveCard(e) {
    // сохранить изменение в карточке
    if (!e.target.classList.contains("article__save-button")) {
      return;
    }
    if (this.newName === undefined && this.newPrice === undefined) {
      this.modal.closeModalForm();
      return;
    }

    this.savingChanges(this.newName, this.newPrice);
  }

  onClickCancel(e) {
    if (!e.target.classList.contains("modal-close__btn")) {
      return;
    }
    const table = document.querySelector(".table-product");
    const article = document.querySelector(".article-box");
    article ? table.classList.remove("hidden") : table.classList.add("hidden");
  }

  keyUp(e) {
    // удаление подсказки  по Enter.... карточка и так добавляется...

    if (e.target.classList.contains("input-tooltip")) {
      this.validityFields(e.target);
    }
  }
}
