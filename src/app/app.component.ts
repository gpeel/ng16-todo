import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {faCoffee, faEdit, faRemove} from '@fortawesome/free-solid-svg-icons';
import {Todo, TODO_FILTER_ENUM, TodoUtils} from './todo.model';

let count = 0;

/**
 * Note-4 : also I could have used a modal instead of a simple input to edit the label.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faCoffee = faCoffee;
  faEdit = faEdit;
  faRemove = faRemove;
  // newTodoLabel: string = '';
  inputFormControl = new FormControl();
  inputToggleAllFormControl = new FormControl();
  @ViewChild('inputEdit', {static: false}) inputEditRef!: ElementRef<HTMLInputElement>;
  editingTodo: Todo | null = null; // only one Todo could be edited at a time
  editingTodoLabelPrevious: string | null = null;
  todosFilterChoice: TODO_FILTER_ENUM = TODO_FILTER_ENUM.ALL;
  TODO_FILTER_ENUM = TODO_FILTER_ENUM;
  todos: Todo[] = [
    {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
    TodoUtils.createTodo('Sleep', true),
    TodoUtils.createTodo('Play sports'),
    TodoUtils.createTodo('Go to Mars'),
  ];

  onRemoveTodo(todo: Todo): void {
    console.log('REMOVE in APP', todo);
    this.todos.splice(this.todos.indexOf(todo), 1);
    // Now also check if all todos are completed to toggle the toggleAll checbkox
    this.todos.every(t => t.completed) ? this.inputToggleAllFormControl.setValue(true) : this.inputToggleAllFormControl.setValue(false);
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

  onAddTodo(): void {
    console.log('in ADD TODO FC');
    if (this.inputFormControl.value?.trim()) {
      const todo = TodoUtils.createTodo(this.inputFormControl.value.trim());
      this.todos.push(todo);
      this.inputFormControl.setValue('');
    }
  }

  onEditTodo(todo: Todo): void {
    console.log('EDIT in APP', todo);
    if (this.editingTodo === null) {
      this.editingTodo = todo;
      this.editingTodoLabelPrevious = todo.label;
    } else {
      console.log('already editing another todo => swithcing to this one', todo);
      this.editingTodo = todo;
      this.editingTodoLabelPrevious = todo.label;
    }
    setTimeout(() => {
      console.log('REF', this.inputEditRef.nativeElement);
      this.inputEditRef.nativeElement.focus();
    });
  }

  onInputEdit(value: string, todo: Todo): void {
    console.log('onInputEdit', value);
    todo.label = value;
  }

  onValidEditExit() {
    console.log('onExitEdit');
    if (this.editingTodo !== null) {
      if (this.editingTodo.label.trim() === '') {
        // because we don't want empty labels
        this.editingTodo.label = this.editingTodoLabelPrevious as string;
      }
      this.editingTodo = null;
      this.editingTodoLabelPrevious = null;
    }
  }

  onCancelEditExit() {
    console.log('handleEscapeKeyboardEvent KEYDOWN escape',);
    if (this.editingTodo !== null) {
      this.editingTodo.label = this.editingTodoLabelPrevious as string;
      this.editingTodo = null;
      this.editingTodoLabelPrevious = null;
    }
  }

  onToggleAll(valueChecked: boolean): void {
    this.todos.forEach(todo => todo.completed = valueChecked);
  }

  onToggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    console.log('TOGGLE completed new value', todo);
    if (!todo.completed) {
      console.log('one todo is not completed');
      this.inputToggleAllFormControl.setValue(false);
    } else {
      /**
       * after a change of completed flag in the array todos, we can now have uncompleted tasks
       * => So we must check.
       * If is the case => uncheck the toggleAll checkbox
       */
      // if all todos are completed, then check the toggleAll checkbox
      this.todos.every(t => t.completed) && this.inputToggleAllFormControl.setValue(true);
    }
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
