import Modal from "../Modal";

const parentEl = document.createElement("div");

const modal = new Modal(parentEl);
modal.redrawModalForm();

test("redrawModalForm() подключает разметку в DOM", () => {
  expect(modal.parentEl.innerHTML).toEqual(Modal.markup);
});

test("клик на крестик и удаление modal-active", () => {
  modal.closeModalForm();
  expect(parentEl.querySelector(".modal")).toBeFalsy();
});
