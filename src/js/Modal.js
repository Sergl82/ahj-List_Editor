export default class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
        <div class="modal modal-active">
        
            <form class="modal-form-box">
			<div class="modal-content">
			<h3 class="description__title"></h3>

				<div class="button__block form__button">
                	<button class="article__add-button">Добавить</button>
					<button class="modal-close__btn">Отменить</button>
				</div>
				</div>
            </form>
        </div>
`;
  }

  static get markInput() {
    return `
		<div class="input-wrapper">
			<label for="lfname">Название:</label> 
			<input class="input-tooltip input-article-name" type="text" placeholder="Введите название"/>
			
		</div>
	 	<div class="input-wrapper">
			<label for="lfprice">Стоимость:</label> 
			<input class="input-tooltip input-article-price" type="text" placeholder="Введите стоимость"/>
			
		</div>`;
  }

  redrawInput() {
    document
      .querySelector(".description__title")
      .insertAdjacentHTML("afterend", this.constructor.markInput);
  }

  redrawModalForm() {
    this.parentEl.insertAdjacentHTML("afterbegin", this.constructor.markup);
    this.modalWrapperEl.classList.add("modal-active");
    this.modalButtonEl.addEventListener("click", () => this.closeModalForm());
  }

  showInputValue(name, price) {
    this.modalNameEl.value = name;
    this.modalPriceEl.value = price;
  }

  showDescription(text) {
    document.querySelector(".description__title").textContent = text;
  }

  get modalWrapperEl() {
    return this.parentEl.querySelector(".modal");
  }

  get modalDescription() {
    return this.parentEl.querySelector(".description__title");
  }

  set modalDescription(text) {
    this.parentEl.querySelector(".description__title").textContent = text;
  }

  get modalNameEl() {
    return this.parentEl.querySelector(".input-article-name");
  }

  set modalNameEl(text) {
    this.parentEl.querySelector(".input-article-name").textContent = text;
  }

  get modalPriceEl() {
    return this.parentEl.querySelector(".input-article-price");
  }

  set modalPriceEl(text) {
    this.parentEl.querySelector(".input-article-price").textContent = text;
  }

  get modalButtonEl() {
    return this.parentEl.querySelector(".modal-close__btn");
  }

  closeModalForm() {
    this.modalWrapperEl.classList.remove("modal-active");
    this.parentEl.querySelector(".modal").remove();
  }
}
