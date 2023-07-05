import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Todo, TODO_FILTER_ENUM, TodoUtils} from './todo.model';

let count = 0;

/**
 * Using [(ngModel)] in a list is quite convenient here but it is not recommended in general.
 * Why convenient ?
 * Because if we used FormControl we would have to adjust the number of FormControl used by the list.
 * => each time we add a new Todo we would have to add a new FormControl to the list.
 * => and each time we remove a Todo we would have to remove a FormControl from the list.
 * => and at the right index!
 * Of course we would use a FormArray to do it, but it would be more complicated than with [(ngModel)].
 * Note-2 : in an immutable world, we would be forced to create a new FormControl for each Todo,
 * in order NEVER to modify directly the original Todo.
 * Note-3 : or just a capture of (change) event on the input checkbox (in the list) and remove the [(ngModel)].
 * For the edit mode, also both ngModel should be removed (it would simplify the tests refresh
 * => no more fixture.whenStable() needed).
 * Note-4 : also to simplify editing exit we should used a modal instead of a simple input with *ngIf.
 * That way the output scenario is much more controlled (because the user cannot click outside the modal).
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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

  onExitEdit() {
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

  @HostListener('document:keydown', ['$event'])
  handleEscapeKeyboardEvent(event: KeyboardEvent) {
    console.log('handleEscapeKeyboardEvent KEYDOWN', event);
    if (event.key === 'Escape') {
      if (this.editingTodo !== null) {
        this.editingTodo.label = this.editingTodoLabelPrevious as string;
        this.editingTodo = null;
        this.editingTodoLabelPrevious = null;
      }
    }
  }

  debugKey(l: string, e: any) {
    console.log('debugKey', l, e);
  }

  onToggleAll(valueChecked: boolean): void {
    this.todos.forEach(todo => todo.completed = valueChecked);
  }

  /**
   * after a change of completed flag in the array todos, we can now have uncompleted tasks
   * => So we must check.
   * If is the case => uncheck the toggleAll checkbox
   */
  onToggleCompletedChange(todo: Todo) {
    console.log('TOGGLE completed', todo);
    todo.completed = !todo.completed;
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
