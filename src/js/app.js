import ListEditor from "./ListEditor";
import ListController from "./ListController";

const container = document.getElementById("container");
const listEditor = new ListEditor(container);

const controller = new ListController(listEditor);
controller.init();
