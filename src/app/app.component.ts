import {Component} from '@angular/core';
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

  remainingTodos: number = 0;

  todos: Todo[] = [
    {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
    TodoUtils.createTodo('Sleep', true),
    TodoUtils.createTodo('Play sports'),
    TodoUtils.createTodo('Go to Mars'),
  ];

  // onRemoveTodo(todo: Todo): void {}

  // onAddTodo(): void { }

  // onToggleAll(valueChecked: boolean): void {}
  onToggleOne(todo: Todo) {
    todo.completed = !todo.completed;
  }

}
