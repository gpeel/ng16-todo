import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {faCoffee, faEdit, faRemove} from '@fortawesome/free-solid-svg-icons';
import {Todo, TODO_FILTER_ENUM, TodoUtils} from './todo.model';

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
  filterChoice: TODO_FILTER_ENUM = TODO_FILTER_ENUM.ALL;
  TODO_FILTER_ENUM = TODO_FILTER_ENUM;
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

  setTasksFilterStatus(filter: TODO_FILTER_ENUM) {
    this.filterChoice = filter;
  }

  isFilterStatus(filter: TODO_FILTER_ENUM) {
    return this.filterChoice === filter;
  }

}
