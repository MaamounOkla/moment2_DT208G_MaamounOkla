/* Moment 2 DT208G OOP i TypeScript
 Maamoun Okla, maok1900@student.miun.se
 2024-04-06 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
//Implementera Todo-klassen
var TodoList = /** @class */ (function () {
    /*konstuerare som initierar todos-arrayen och laddar todos från LocalStorage vid skapandet av ett nytt TodoList-objekt.*/
    function TodoList() {
        this.todos = this.loadFromLocalStorage();
    }
    TodoList.prototype.addTodo = function (task, priority) {
        // Rensa befintliga felmeddlande.
        this.removError();
        if (priority != 0 && task != "") {
            //skapa att göra element some är inte "completed" från början
            var newTodo = { task: task, isCompleted: false, priority: priority };
            //Sätta in elementet i objektet
            this.todos.push(newTodo);
            //Spara objektet i localStorage
            this.saveToLocalStorage();
            return true;
        }
        else {
            this.displayError("Du måste fylla i både uppgiften och prioriteten för denna uppgift!");
            return false;
        }
    };
    //Markera todo klar
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].isCompleted = true;
            this.saveToLocalStorage();
        }
    };
    //Markera todo oklar
    TodoList.prototype.markTodoNotCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].isCompleted = false;
            this.saveToLocalStorage();
        }
    };
    //Generera fel meddelande
    TodoList.prototype.displayError = function (errorMessage) {
        var errorEl = document.getElementById("error");
        if (errorEl) {
            errorEl.textContent = errorMessage;
        }
    };
    //Radera fel meddelande
    TodoList.prototype.removError = function () {
        var errorEl = document.getElementById("error");
        if (errorEl) {
            errorEl.textContent = "";
        }
    };
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    //Redigera en todo
    TodoList.prototype.editTodo = function (todoIndex, newEditedTodo) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].task = newEditedTodo;
            this.saveToLocalStorage();
        }
    };
    //Radera en todo
    TodoList.prototype.removeTodo = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos.splice(todoIndex, 1);
            this.saveToLocalStorage();
        }
    };
    TodoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };
    TodoList.prototype.loadFromLocalStorage = function () {
        var savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    };
    return TodoList;
}());
exports.TodoList = TodoList;
