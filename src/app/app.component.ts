import {Component} from '@angular/core';
import {faCoffee, faEdit, faRemove} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faCoffee = faCoffee;
  faEdit = faEdit;
  faRemove = faRemove;

  //
  // Answer tp step 1
  //
  // remainingTodos: number = 0;
  //
  // Answer tp step 2
  //
  // todos: Todo[] = [
  //   {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
  //   TodoUtils.createTodo('Sleep', true),
  //   TodoUtils.createTodo('Play sports'),
  //   TodoUtils.createTodo('Go to Mars'),
  // ];

  // methods that COULD be used for the other steps
  // I used the prefix onXxxxx when the method is used in the template

  // onRemoveTodo(todo: Todo): void {
  //   console.log('onRemoveTodo', todo);
  // }

  // onAddTodo(): void {
  //   console.log('onAddTodo');
  // }

  // onToggleAll(valueChecked: boolean): void {
  //   console.log( 'onToggleAll', valueChecked);
  // }

  // onToggleOne(todo: Todo) {
  //   console.log('onToggleOne', todo);
  // }

}
