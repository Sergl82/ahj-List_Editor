import ListEditor from "../ListEditor";

test("createList enables markup DOM", () => {
  const container = document.createElement("div");
  const listEditor = new ListEditor(container);
  listEditor.bindToDOM();
  expect(container.innerHTML).toEqual(ListEditor.markup);
});
