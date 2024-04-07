/* Moment 2 DT208G OOP i TypeScript
 Maamoun Okla, maok1900@student.miun.se
 2024-04-06 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//imports:
var todo = require("./todo");
// variabler
var errorEl = document.getElementById("error");
//interfaces:
//Functions:
// Funktion för att skriva ut befintliga todos till DOM
window.addEventListener("load", function () {
    var todoList = new todo.TodoList();
    printTodos(todoList);
    createTodos(todoList);
});
function createTodos(todoList) {
    var todoForm = document.getElementById("todoForm");
    if (todoForm) {
        todoForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var taskInputEl = document.getElementById("task");
            var priorityInputEl = document.getElementById("priority");
            var task = taskInputEl.value;
            //Göra om sträng input value till integer
            var priority = parseInt(priorityInputEl.value);
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
function printTodos(todoList) {
    var todoListEl = document.getElementById("todoList");
    console.log(todoList);
    if (todoListEl) {
        //Rensa befingtiliga items från DOM
        todoListEl.innerHTML = "";
        todoList.getTodos().forEach(function (todo, index) {
            //Returnera prioritetn i ord istället för 1,2,3
            var priorityWord = "";
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
            console.log(todo.task, todo.priority);
            todoListEl.innerHTML += "\n            <li class=\"list-item\">\n           <span> ".concat(todo.task, "  </span>    \n           <p> ").concat(priorityWord, "</p> \n            </li>\n            ");
            var doneBtnEl = document.createElement("button");
            var notDoneBtnElText = "Inte klar <i class=\"fa-solid fa-square-check\"></i>";
            var doneBtnElText = "Klar <i class=\"fa-solid fa-square-check\"></i>";
            if (doneBtnEl) {
                doneBtnEl.innerHTML = notDoneBtnElText;
                doneBtnEl.classList.add("done-button");
                doneBtnEl.setAttribute("data-todo-index", index.toString()); // Set a custom data attribute
                doneBtnEl.addEventListener("click", function (e) {
                    var targetBtn = e.target;
                    var btnIndex = parseInt(targetBtn.getAttribute("data-todo-index") || "");
                    if (targetBtn.innerHTML === notDoneBtnElText) {
                        targetBtn.innerHTML = doneBtnElText;
                    }
                    else {
                        targetBtn.innerHTML = notDoneBtnElText;
                    }
                    todoList.markTodoCompleted(btnIndex);
                    console.log(todoList.isCompleted);
                    printTodos(todoList);
                });
                todoListEl.appendChild(doneBtnEl);
            }
        });
    }
}
