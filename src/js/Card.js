export default class Card {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  init() {
    this.bindToDOM();
  }

  static template(name, price) {
    return `
    <tr class="article-box">
      <td class="article__title">${name}</td>
      <td class="article__price">${price}</td>
      <td class="button__block">
        <button class="article__edit"></button>
        <button class="article__del"></button>
      </td>
    </tr>
`;
  }

  bindToDOM() {
    const listBox = document.querySelector("tbody");

    const cardProduct = this.addProduct(this.name, this.price);

    listBox.insertAdjacentHTML("beforeend", cardProduct);
  }

  addProduct() {
    const cardName = document.querySelector(".input-article-name");
    const cardPrice = document.querySelector(".input-article-price");
    this.name = cardName.value.trim();
    this.price = cardPrice.value.trim();

    if (this.name && this.price) {
      const result = this.constructor.template(this.name, this.price);
      return result;
    }
    return false;
  }
}
