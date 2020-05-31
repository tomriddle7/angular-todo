import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [{
    id: 1,
    title: '요가 수행하기',
    completed: false
  }, {
    id: 2,
    title: '어머니 용돈 드리기',
    completed: true
  }];
  checkoutForm;
  statusFilter: string;
  angularTodos = this.todos;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      newTodo: ''
    });
  }

  addTodo = function(todoTitle) {
    todoTitle = todoTitle.newTodo.trim();
    if (!todoTitle) return;

    const newId: number = !this.todos.length ?
        1 : this.todos[this.todos.length - 1].id + 1;

    const newTodo: Todo = {
      id: newId,
      title: todoTitle,
      completed: false
    };

    this.todos = this.todos.concat(newTodo);
    this.angularTodos = this.todos;
  };

  removeTodo = function(id) {
    if (!id) return;

    // 배열에서 제거
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.angularTodos = this.todos;
  };

  filterTodo = function(filter: string) {
    this.statusFilter = filter;
    if(this.statusFilter === 'completed') {
      this.angularTodos = this.todos.filter(todo => todo.completed === true);
    } else if(this.statusFilter === 'active') {
      this.angularTodos = this.todos.filter(todo => todo.completed === false);
    } else {
      this.angularTodos = this.todos;
    }
  };

  clearCompleted = function() {
    const incompleteTodos = this.todos.filter(todo => todo.completed === false);
    this.todos = incompleteTodos;
    this.angularTodos = this.todos;
  };
}
