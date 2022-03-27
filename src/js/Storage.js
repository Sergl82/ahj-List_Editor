export default class Storage {
  getPinCards() {
    return JSON.parse(localStorage.getItem("itemCards")) || [];
  }

  save(data) {
    localStorage.setItem("itemCards", JSON.stringify(data));
  }
}
