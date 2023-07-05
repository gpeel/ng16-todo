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
  inputToggleAllFormControl = new FormControl();
  todosFilterChoice: TODO_FILTER_ENUM = TODO_FILTER_ENUM.ALL;
  TODO_FILTER_ENUM = TODO_FILTER_ENUM;
  editingTodoId: number | null = null; // only one Todo could be edited at a time
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

  onEditTodo(todo: Todo): void {
    console.log('EDIT in APP', todo);
    if (!this.editingTodoId) {
      this.editingTodoId = todo.id;
    }
  }

  toggleAll(valueChecked: boolean): void {
    this.todos.forEach(todo => todo.completed = valueChecked);
  }

  /**
   * after a change of completed flag in the array todos, we can now have uncompleted tasks
   * => So we must check.
   * If is the case => uncheck the toggleAll checkbox
   */
  toggleCompleted(todo: Todo) {
    console.log('TOGGLE completed', todo);
    if (!todo.completed) {
      console.log('one todo is not completed');
      this.inputToggleAllFormControl.setValue(false);
    } else {
      // if all todos are completed, then check the toggleAll checkbox
      this.todos.every(t => t.completed) && this.inputToggleAllFormControl.setValue(true);
    }
    // check if this todo turns uncompleted
    // if (this.todos.some(todo => !todo.completed)) {
    //   console.log('some todos are not completed');
    // }
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
