/* Moment 2 DT208G OOP i TypeScript 
 Maamoun Okla, maok1900@student.miun.se 
 2024-04-06 */

"use strict";

//imports:
import * as todo from "./todo";
// variabler
let errorEl: HTMLElement | null = document.getElementById("error");
//interfaces:

//Functions:
// Funktion för att skriva ut befintliga todos till DOM
window.addEventListener("load", () => {
  const todoList = new todo.TodoList();
  printTodos(todoList);
  createTodos(todoList);
});

function createTodos(todoList: todo.TodoList) {
  const todoForm = document.getElementById(
    "todoForm"
  ) as HTMLFormElement | null;
  if (todoForm) {
    todoForm.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const taskInputEl = document.getElementById("task") as HTMLInputElement;
      const priorityInputEl = document.getElementById(
        "priority"
      ) as HTMLSelectElement;

      const task = taskInputEl.value;
      //Göra om sträng input value till integer
      const priority = parseInt(priorityInputEl.value);

      if (todoList.addTodo(task, priority)) {
        //Skicka nytt todoList values till DOM
        printTodos(todoList);
        //Rensa inputfältet efter att lägga till task
        taskInputEl.value = "";
      }
    });
  }
}

// Funktion för att skriva ut todo-listan till DOM.
function printTodos(todoList: todo.TodoList): void {
  const todoListEl: HTMLElement | null = document.getElementById("todoList");
  if (todoListEl) {
    todoListEl.innerHTML = "";
    todoList.getTodos().forEach((todo: todo.ITodo, index: number) => {
      let priorityWord = "";
      switch (todo.priority) {
        case 1:
          priorityWord = "Viktig!";
          break;
        case 2:
          priorityWord = "Medium";
          break;
        case 3:
          priorityWord = "Oviktig";
          break;
      }

      todoListEl.innerHTML += `
              <li class="list-item">
                  <span>${todo.task}</span>    
                  <p>${priorityWord}</p> 
                  <button class="done-button" data-todo-index="${index}">
                  ${todo.isCompleted ? "Klar <i class='fa-solid fa-square-check'></i>" : "Inte klar <i class='fa-solid fa-hourglass'></i>"}
              </button>
              </li>
          `;
    });

    const doneButtons: NodeListOf<HTMLElement> =
      document.querySelectorAll(".done-button");
    doneButtons.forEach((button: HTMLElement) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-todo-index") || "");
        todoList.markTodoCompleted(index);
        printTodos(todoList);
      });
    });
  }
}
