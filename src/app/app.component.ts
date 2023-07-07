import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {faCoffee, faEdit, faRemove} from '@fortawesome/free-solid-svg-icons';
import {Todo, TodoUtils} from './todo.model';

let counter: number = 1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faCoffee = faCoffee;
  faEdit = faEdit;
  faRemove = faRemove;
  inputFormControl = new FormControl();
  inputToggleAllFormControl = new FormControl();
  remainingTodos: number = 0;
  todos: Todo[] = [
    {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
    TodoUtils.createTodo('Sleep', true),
    TodoUtils.createTodo('Play sports'),
    TodoUtils.createTodo('Go to Mars'),
  ];

  ngOnInit(): void {
    this.checkSetRemaingAndToggleAllCheck();
  }

  onRemoveTodo(todo: Todo): void {
    console.log('onRemoveTodo', todo);
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.checkSetRemaingAndToggleAllCheck();
  }

  onAddTodo(): void {
    console.log('onAddTodo');
    if (this.inputFormControl.value?.trim()) {
      const todo = TodoUtils.createTodo(this.inputFormControl.value.trim());
      this.todos.push(todo);
      this.inputFormControl.setValue('');
      this.inputToggleAllFormControl.setValue(false); // we are sure that the new todo is not completed
      // this.checkAndSetToggleAll(); // overkill algo but more readable
    }
  }

  onToggleAll(valueChecked: boolean): void {
    console.log('onToggleAll', valueChecked);
    this.todos.forEach(todo => todo.completed = valueChecked);
    this.checkSetRemaingAndToggleAllCheck();
  }

  onToggleOne(todo: Todo) {
    console.log('onToggleOne', todo);
    todo.completed = !todo.completed;
    this.checkSetRemaingAndToggleAllCheck();
  }

  checkSetRemaingAndToggleAllCheck(): void {
    this.remainingTodos = this.todos.filter(t => !t.completed).length;
    console.log('checkAndSetToggleAll => remaining todos=', this.remainingTodos);
    this.remainingTodos === 0 ? this.inputToggleAllFormControl.setValue(true) : this.inputToggleAllFormControl.setValue(false);
  }

  computeRemainingMessage(): string {
    console.log('RemainingTasks Pipe computates:' + counter++);
    const num = this.todos.filter(t => !t.completed).length;
    switch (num) {
      case 0:
        return 'No remaining todos';
      case 1:
        return 'One remaining todo';
      default:
        return `${num} remaining todos`;
    }
  }

}
