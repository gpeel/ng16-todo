import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {faCoffee, faEdit, faRemove} from '@fortawesome/free-solid-svg-icons';
import {Todo, TodoUtils} from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  onRemoveTodo(todo: Todo): void {
    console.log('REMOVE in APP', todo);
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  onAddTodo(): void {
    console.log('in ADD TODO');
    if (this.inputFormControl.value?.trim()) {
      const todo = TodoUtils.createTodo(this.inputFormControl.value.trim());
      this.todos.push(todo);
      this.inputFormControl.setValue('');
    }
  }

  onToggleAll(valueChecked: boolean): void {
    this.todos.forEach(todo => todo.completed = valueChecked);
  }

  onToggleOne(todo: Todo) {
    todo.completed = !todo.completed;
  }

}
