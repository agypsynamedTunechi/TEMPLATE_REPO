import editIcon from "../img/file-edit.svg";
import deleteIcon from "../img/trash-can.svg";
import { DateFormat, DateReminder } from "./dateFormat.js";
import { AddTodoUi, todoContainer } from "./dom.js";
import {
  state,
  deleteTodo,
  editTodoDialog,
  editData,
  renderTodoEditName,
  checkTodo,
} from "./app.js";
import { storeProject } from "./storage.js";

export function createTodo(
  todoTitle,
  todoDesc,
  todoDate,
  todoPriority,
  todoId,
  todoComplete,
) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo";
  todoItem.dataset.id = todoId;
  const todoContent = document.createElement("div");
  todoContent.className = "todo-content";
  const todoText = document.createElement("div");
  todoText.className = "todo-text";
  const todoCheck = document.createElement("input");
  todoCheck.type = "checkbox";
  todoCheck.name = "todo";
  todoCheck.id = "todo";
  todoCheck.checked = todoComplete;
  const todoLabel = document.createElement("label");
  todoLabel.htmlFor = "todo";
  todoLabel.textContent = todoTitle;
  const todoDescription = document.createElement("p");
  todoDescription.textContent = todoDesc;

  const todoInfo = document.createElement("div");
  todoInfo.className = "todo-info";
  const datePara = document.createElement("p");
  datePara.textContent = DateFormat(todoDate);
  const dateRemain = document.createElement("p");
  dateRemain.textContent = DateReminder(todoDate);
  const priorityPara = document.createElement("p");
  priorityPara.textContent = todoPriority;

  const edit = document.createElement("div");
  edit.className = "edit";
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  const editImg = document.createElement("img");
  const editSpan = document.createElement("span");
  editSpan.textContent = "edit";
  editImg.src = editIcon;
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  const deleteImg = document.createElement("img");
  const deleteSpan = document.createElement("span");
  deleteSpan.textContent = "delete";
  deleteImg.src = deleteIcon;

  editButton.appendChild(editImg);
  editButton.appendChild(editSpan);
  deleteButton.appendChild(deleteImg);
  deleteButton.appendChild(deleteSpan);
  edit.appendChild(editButton);
  edit.appendChild(deleteButton);

  todoText.appendChild(todoCheck);
  todoText.appendChild(todoLabel);
  todoText.appendChild(todoDescription);
  todoContent.appendChild(todoText);
  todoInfo.appendChild(datePara);
  todoInfo.appendChild(dateRemain);
  todoInfo.appendChild(priorityPara);
  todoContent.appendChild(todoInfo);
  todoItem.appendChild(todoContent);
  todoItem.appendChild(edit);

  todoItem.addEventListener("click", () => {
    const child = event.target.closest(".todo");
    const index = child.dataset.id;
    if (!child) {
      return;
    } else {
      checkTodo(index);
    }

    if (event.target.closest(".delete-button")) {
      console.log("delete");
      editData.index = index;

      deleteTodo(index);
    } else if (event.target.closest(".edit-button")) {
      console.log("edit");
      editTodoDialog.showModal();

      editData.index = index;
      console.log(index);
      renderTodoEditName(index);
    }
  });

  state.currentProject.todos.forEach((todo) => {
    if (todo.isChecked && todo.uuid === todoItem.dataset.id) {
      todoItem.classList.add("completed");
    }
  });

  return todoItem;
}

export function renderTodo() {
  if (!state.currentProject) {
    return;
  }

  todoContainer.textContent = "";
  AddTodoUi(state.currentProject.title);

  const todoList = document.querySelector(".todos");

  state.currentProject.todos.forEach((todo) => {
    const todoElement = createTodo(
      todo.title,
      todo.description,
      todo.dueDate,
      todo.priority,
      todo.uuid,
      todo.isChecked,
    );
    todoList.appendChild(todoElement);
  });
}
