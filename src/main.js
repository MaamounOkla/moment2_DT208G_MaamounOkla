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
    isCompleteEventHandler(todoList);
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
            //skriv ut data samt checka todo.isCompleted visuellt med dynamisk stil och ikon.
            todoListEl.innerHTML += "\n              <li class=\"list-item\">\n              <span style=\"text-decoration: ".concat(todo.isCompleted ? 'line-through' : 'none', ";\">\n              ").concat(todo.task, "\n          </span>\n          \n                  <p>").concat(priorityWord, "</p> \n                  <div class=\"buttons\">\n                  <button class=\"done-button\" data-todo-index=\"").concat(index, "\" style=\"background-color: ").concat(todo.isCompleted ? "green !important" : "red !important", "\">\n                  ").concat(todo.isCompleted
                ? "Klar <i class='fa-solid fa-square-check'></i>"
                : "Inte klar <i class='fa-solid fa-hourglass'></i>", "\n              </button>\n                <button class=\"edit-button\" data-todo-index=\"").concat(index, "\">\n                Redigera <i class=\"fa-solid fa-pen-to-square\"></i></button>\n              \n                <button class=\"remove-button\" data-todo-index=\"").concat(index, "\">\n                <i class=\"fa-solid fa-trash\"></i></button></div>\n              </li>\n          ");
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
//Funktion för att hantera isComplete status genom att lägga till eventlyssnare till klar-knappen även efter re-rendering av nya.
function isCompleteEventHandler(todoList) {
    var doneButtons = document.querySelectorAll(".done-button");
    doneButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            var index = parseInt(button.getAttribute("data-todo-index") || "");
            var todo = todoList.getTodos()[index];
            // Toggle the completion status of the todo item
            if (!todo.isCompleted) {
                todoList.markTodoCompleted(index);
                printTodos(todoList);
            }
            else {
                todoList.markTodoNotCompleted(index);
                printTodos(todoList);
            }
            isCompleteEventHandler(todoList);
        });
    });
}
