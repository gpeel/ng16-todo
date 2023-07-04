import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Todo, TODO_FILTER_ENUM, TodoUtils} from './todo.model';

let count = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // newTodoLabel: string = '';
  inputFormControl = new FormControl();
  todosFilterChoice: TODO_FILTER_ENUM = TODO_FILTER_ENUM.ALL;
  TODO_FILTER_ENUM = TODO_FILTER_ENUM;
  todos: Todo[] = [
    {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
    TodoUtils.createTodo('Sleep', true),
    TodoUtils.createTodo('Play sports'),
    TodoUtils.createTodo('Go to Mars'),
  ];

  removeTodo(todo: Todo): void {
    console.log('REMOVE in APP', todo);
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  // addTodo(value: string, input: HTMLInputElement): void {
  //   // console.log('EVENT', event);
  //   // const input = event.target as HTMLInputElement;
  //   // console.log('addTodo IN with target.value', input.value);
  //   if (value.trim()) {
  //     console.log('addTodo ok because label not empty');
  //     const todo = TodoUtils.createTodo(value.trim());
  //     this.todos.push(todo);
  //     input.value = '';
  //   }
  //   this.newTodoLabel = '';
  // }

  addTodoFC(): void {
    console.log('in ADD TODO FC');
    if (this.inputFormControl.value?.trim()) {
      const todo = TodoUtils.createTodo(this.inputFormControl.value.trim());
      this.todos.push(todo);
      this.inputFormControl.setValue('');
    }
  }

  toggleAll(valueChecked: boolean): void {
    this.todos.forEach(todo => todo.completed = valueChecked);
  }

  // computeRemainingTodos(): number {
  //   console.log('COMPUTE remaining', count++);
  //   return this.todos.filter(todo => !todo.completed).length;
  // }

  setTasksFilterStatus(filter: TODO_FILTER_ENUM) {
    this.todosFilterChoice = filter;
  }

  isFilterStatus(filter: TODO_FILTER_ENUM) {
    return this.todosFilterChoice === filter;
  }
}
