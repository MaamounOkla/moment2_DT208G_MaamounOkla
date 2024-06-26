/* Moment 2 DT208G OOP i TypeScript 
 Maamoun Okla, maok1900@student.miun.se 
 2024-04-06 */
"use strict";
//Skapa interface
export interface ITodo {
  task: string;
  isCompleted: boolean;
  priority: number;
}

//Implementera Todo-klassen
export class TodoList implements ITodo {
  task: string;
  isCompleted: boolean;
  priority: number;
  private todos: ITodo[];

  /*konstuerare som initierar todos-arrayen och laddar todos från LocalStorage vid skapandet av ett nytt TodoList-objekt.*/
  constructor() {
    this.todos = this.loadFromLocalStorage();
  }

  addTodo(task: string, priority: number): boolean {
    // Rensa befintliga felmeddlande.
    this.removError();
    if (priority != 0 && task != "") {
      //skapa att göra element some är inte "completed" från början
      const newTodo: ITodo = { task, isCompleted: false, priority };

      //Sätta in elementet i objektet
      this.todos.push(newTodo);
      //Spara objektet i localStorage
      this.saveToLocalStorage();

      return true;
    } else {
      this.displayError(
        "Du måste fylla i både uppgiften och prioriteten för denna uppgift!"
      );
      return false;
    }
  }
  //Markera todo klar
  markTodoCompleted(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].isCompleted = true;
      this.saveToLocalStorage();
    }
  }
  //Markera todo oklar
  markTodoNotCompleted(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].isCompleted = false;
      this.saveToLocalStorage();
    }
  }

  //Generera fel meddelande
  displayError(errorMessage: string): void {
    const errorEl = document.getElementById("error");
    if (errorEl) {
      errorEl.textContent = errorMessage;
    }
  }
  //Radera fel meddelande
  removError(): void {
    const errorEl = document.getElementById("error");
    if (errorEl) {
      errorEl.textContent = "";
    }
  }
  getTodos(): ITodo[] {
    return this.todos;
  }

  //Redigera en todo
  editTodo(todoIndex: number, newEditedTodo: string): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].task = newEditedTodo;
      this.saveToLocalStorage();
    }
  }
  //Radera en todo
  removeTodo(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos.splice(todoIndex, 1);
      this.saveToLocalStorage();
    }
  }
  saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  loadFromLocalStorage(): ITodo[] {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  }
}
