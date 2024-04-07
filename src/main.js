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
    if (todoListEl) {
        todoListEl.innerHTML = "";
        todoList.getTodos().forEach(function (todo, index) {
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
            //skriv ut data samt checka todo.isCompleted visuellt.
            todoListEl.innerHTML += "\n              <li class=\"list-item\">\n                  <span>".concat(todo.task, "</span>    \n                  <p>").concat(priorityWord, "</p> \n                  <button class=\"done-button\" data-todo-index=\"").concat(index, "\">\n                  ").concat(todo.isCompleted
                ? "Klar <i class='fa-solid fa-square-check'></i>"
                : "Inte klar <i class='fa-solid fa-hourglass'></i>", "\n                 </button>\n                <button class=\"edit-button\" data-todo-index=\"").concat(index, "\">\n                Redigera <i class=\"fa-solid fa-pen-to-square\"></i></button>\n              \n                <button class=\"remove-button\" data-todo-index=\"").concat(index, "\">\n                <i class=\"fa-solid fa-trash\"></i></button>\n              </li>\n          ");
        });
        //doneButton
        //Vid click, markTodoCompleted() efter index. 
        var doneButtons = document.querySelectorAll(".done-button");
        doneButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var index = parseInt(button.getAttribute("data-todo-index") || "");
                todoList.markTodoCompleted(index);
                printTodos(todoList);
            });
        });
        //Redigera en todo
        var editButtons = document.querySelectorAll(".edit-button");
        editButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var index = parseInt(button.getAttribute("data-todo-index") || "");
                var editedTodo = todoList.getTodos()[index];
                var newEditedTodo = prompt("Redigera Uppgiften:", editedTodo.task);
                if (newEditedTodo !== null) {
                    todoList.editTodo(index, newEditedTodo);
                    printTodos(todoList);
                }
            });
        });
        //Ta bort en todo
        var removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var index = parseInt(button.getAttribute("data-todo-index") || "");
                todoList.removeTodo(index);
                printTodos(todoList);
            });
        });
    }
}
