export default class ListEditor {
  constructor(container) {
    this.container = container;
  }

  static get markup() {
    return `
      <div class="principal__button">
          <button class="add__button">+</button>
      </div>
      <div class="list-wrapper">
          <h2 class="list__title">Товары</h2>
          <span class="greeting__title">Ваш список пока Пруст</span>
          <table class="table-product hidden">
              <caption></caption>
              <thead>
                  <tr>
                  <th class="theader">Название</th>
                  <th class="theader">Стоимость</th>
                  <th class="theader">Действия</th>
                  </tr>
              </thead>
              <tbody></tbody>
           </table>
      </div>
`;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML("afterbegin", this.constructor.markup);
  }
}
