import {Component} from '@angular/core';
import {Todo, TodoUtils} from './todo.model';

let count = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // remainingTodos: number = 0;
  newTodoLabel: string = '';

  tasks: Todo[] = [
    {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
    TodoUtils.createTodo('Sleep', true),
    TodoUtils.createTodo('Play sports')
    // new Todo(' Sortir ')
  ];

  removeTodo(task: Todo): void {
    console.log('REMOVE in APP', task);
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  addTodo(event: Event): void {
    console.log('EVENT', event);
    const input = event.target as HTMLInputElement;
    console.log('addTodo IN with target.value', input.value);
    if (input.value.trim()) {
      console.log('addTodo ok because label not empty');
      const task = TodoUtils.createTodo(input.value.trim());
      this.tasks.push(task);
      input.value = '';
    }
    this.newTodoLabel = '';
  }

  toggleAll(valueChecked: boolean): void {
    this.tasks.forEach(task => task.completed = valueChecked);
  }

  computeRemainingTodos(): number {
    console.log('COMPUTE remaining', count++);

    return this.tasks.filter(task => !task.completed).length;
  }

}
