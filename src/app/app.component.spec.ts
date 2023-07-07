// @ts-nocheck
/* @ts-ignore */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// hand coded imports
// import {userEvent} from '@testing-library/user-event/setup/index';  KOOO
// import userEvent from '@testing-library/user-event'; // OK
import {AppComponent} from './app.component';
import {Todo, TodoUtils} from './todo.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled!: HTMLElement;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FontAwesomeModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('0- should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('0- should render title in a h1 tag', () => {
    expect(compiled.querySelector('header h1')!.textContent!.trim()).toContain('Todo App');
  });

  it('1- should have 0 remaining tasks', () => {
    expect(component.remainingTodos)
      .withContext('The property remainingTasks should be created')
      .toBeDefined();
    expect(component.remainingTodos)
      .withContext('The property remainingTasks should be initialized to 0')
      .toBe(3);
  });

  it('2- should have 4 Todo(s) on the component', waitForAsync(() => {
    const component = fixture.componentInstance;
    expect(component.todos)
      .withContext('The tasks property should be created')
      .toBeDefined();
    expect(component.todos.length)
      .withContext('The task array should contain 4 tasks')
      .toBe(4);
  }));

  it('2- should show in the UI the same todos labels and completed values as those in component.todos', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const todos = compiled.querySelectorAll('[data-test="todo-item-li"]');
    expect(todos.length).toBe(component.todos.length);
    component.todos.forEach((todo, index) => {
      const todoElement = todos[index];
      expect(todoElement.querySelector('label')!.textContent).toBe(todo.label);
      // @ts-ignore
      expect(todoElement.querySelector('input[type=checkbox]')!.checked).toBe(todo.completed);
    });
  });

  it('3- should toggle the completed state of a todo from UI click event on checkbox per line', () => {
    const checkbox: HTMLInputElement = compiled.querySelector('[data-test="todo-item-checkbox"]') as HTMLInputElement;
    const initialCompletedState = component.todos[0].completed;
    checkbox.click();
    fixture.detectChanges();
    expect(component.todos[0].completed).toBe(!initialCompletedState);
    expect(checkbox.checked).toBe(!initialCompletedState);
  });

  /**
   * By default only todo[0] will work without specific modification of HTML ...
   * look at label-for attribute
   */
  it('3- should toggle the completed state of a todo from UI click event on label-for per line, test each Todo from the array component.todos', () => {
    const labels: NodeListOf<HTMLLabelElement> = compiled.querySelectorAll('[data-test="todo-item-label"]');
    component.todos.forEach((todo, index) => {
      const initialCompletedState = todo.completed;
      labels[index].click();
      fixture.detectChanges();
      expect(component.todos[index].completed).toBe(!initialCompletedState);
    });
  });

  it('4- check that Todo.complete is true will make the text <li> around the <label> to have the class "line-through"', () => {
    const todoListItems = compiled.querySelectorAll('[data-test=todo-item-li]');
    component.todos.forEach((todo, index) => {
      const todoListItem = todoListItems[index];
      if (todo.completed) {
        expect(todoListItem.classList.contains('line-through'))
          .withContext('completed Todo should have a <li>.class.linethrough').toBe(true);
      } else {
        expect(todoListItem.classList.contains('line-through'))
          .withContext('not completed Todo should not have  <li>.class.linethrough').toBe(false);
      }
    });
  });

  it('5- should remove a todo from UI event', () => {
    const todoElement: HTMLElement = compiled.querySelector('[data-test="todo-item-li"]') as HTMLElement;
    const removeButton: HTMLButtonElement = todoElement.querySelector('[data-test="remove-todo"]') as HTMLButtonElement;
    removeButton.click();
    fixture.detectChanges();
    expect(component.todos.length).toBe(3);
    expect(compiled.querySelectorAll('[data-test="todo-item-li"]')).toHaveSize(3);
  });

  it('6- should add a new todo from UI event', () => {
    const todoLabel = 'New Todo pipo';
    const inputElement: HTMLInputElement = compiled.querySelector('[data-test="input-todo"]') as HTMLInputElement;
    inputElement.value = todoLabel;
    inputElement.dispatchEvent(new Event('input'));
    const addButton: HTMLButtonElement = compiled.querySelector('[data-test="add-button"]') as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();
    expect(component.todos.length).toBe(5);
    expect(component.todos[4].label).toBe(todoLabel);
    expect(component.inputFormControl.value).toBe('');
    const todoElements = compiled.querySelectorAll('[data-test="todo-item-label"]');
    expect(todoElements.length).toBe(5);
    const lastTodoElement = todoElements[todoElements.length - 1] as Element;
    expect(lastTodoElement.textContent!.trim()).toBe(todoLabel); // now we have the button text !
  });

  it('7- should toggle all todos to completed', () => {
    component.onToggleAll(true);
    expect(component.todos.every(todo => todo.completed)).toBeTruthy();
  });

  it('7- should toggle all todos to completed from UI event checking the toggleAll checkbox', async () => {
    const toggleAllCheckbox: HTMLInputElement = compiled.querySelector('[data-test="toggle-all-checkbox"]') as HTMLInputElement;
    toggleAllCheckbox.click();
    fixture.detectChanges();
    // await fixture.whenStable(); // needed if using ngModel two-way binding testing specific
    expect(component.todos.every(todo => todo.completed)).toBeTruthy();

    const checkboxes = compiled.querySelectorAll('[data-test="todo-item-checkbox"]');

    checkboxes.forEach((checkbox) => {
      expect((checkbox as HTMLInputElement).checked).toBeTruthy();
    });

  });

  /**
   * With simulation in JS => it never works Because we don't have the same behavior as with a real user.
   * For example the toggleAll checkbox is not checked when we don't click on it !
   * SO THIS COULD BE INTERESTING TO NOTE. Only UI entry will make correct state of all data and UI.
   * If new todos array arrive, or one is is modified by other means than the UI, the UI would NOT be updated
   * correctly. This PB could be resolved with NGXS-Store (Redux store) or NGRX-Store (less used and more complex and
   * badly verbose) or with a hard-coded solution with a Subject/Observable pattern.
   * NOTE: the above pb has been resolved when adding checkSetRemainingAndToggleAll() in the component and calling it
   * in each method that could modify the todos array, And not only in the ngOnInit() method.
   */
  it('7- should uncheck the toggleAll checkbox when a new Todo is created', async () => {
    const toggleAllCheckbox: HTMLInputElement = compiled.querySelector('[data-test="toggle-all-checkbox"]') as HTMLInputElement;
    // SImulating turning all Todos to completed
    component.onToggleAll(true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(toggleAllCheckbox.checked).toBe(true);
    // Simulate creating a new Todo
    const todoLabel = 'New Todo';
    component.inputFormControl.setValue(todoLabel);
    component.onAddTodo();
    fixture.detectChanges();
    expect(toggleAllCheckbox.checked).toBe(false);
  });

  it('7-1 should uncheck the toggleAll checkbox when a new Todo is created', () => {
    // Initialize component.todos
    // so that the toggleAll checkbox is checked
    component.todos.forEach(todo => todo.completed = true);
    component.checkSetRemaingAndToggleAllCheck();
    fixture.detectChanges();
    const toggleAllCheckbox: HTMLInputElement = compiled.querySelector('[data-test="toggle-all-checkbox"]') as HTMLInputElement;
    expect(toggleAllCheckbox.checked).toBe(true);
    //
    const inputElement: HTMLInputElement = compiled.querySelector('[data-test="input-todo"]') as HTMLInputElement;
    const addButton: HTMLButtonElement = compiled.querySelector('[data-test="add-button"]') as HTMLButtonElement;

    // Set input value and trigger input event
    inputElement.value = 'New Todo';
    inputElement.dispatchEvent(new Event('input'));

    // Trigger click event on add button
    addButton.click();
    fixture.detectChanges();
    expect(toggleAllCheckbox.checked).toBe(false);
  });

  it('7-2 should uncheck the toggleAll checkbox when a Todo is turned uncompleted by toggleOne', () => {
    // Initialize component.todos
    // so that the toggleAll checkbox is checked
    component.todos.forEach(todo => todo.completed = true);
    component.checkSetRemaingAndToggleAllCheck();
    fixture.detectChanges();
    const toggleAllCheckbox: HTMLInputElement = compiled.querySelector('[data-test="toggle-all-checkbox"]') as HTMLInputElement;
    expect(toggleAllCheckbox.checked).toBe(true);
    const checkbox: HTMLInputElement = compiled.querySelector('[data-test="todo-item-checkbox"]') as HTMLInputElement;

    // Trigger click event on the checkbox of the first Todo
    checkbox.click();
    fixture.detectChanges();

    expect(toggleAllCheckbox.checked).toBe(false);
  });

  it('7-3 should check the toggleAll checkbox when the last uncompleted Todo is turned completed by toggleOne', async () => {
    const toggleAllCheckbox: HTMLInputElement = compiled.querySelector('[data-test="toggle-all-checkbox"]') as HTMLInputElement;
    // NOT HERE !
    // const checkboxes: NodeListOf<HTMLInputElement> = compiled.querySelectorAll('[data-test="todo-item-checkbox"]');
    // NOT HERE !
    // by default, the toggleAll checkbox is unchecked at init
    // because there are 3 uncompleted Todo
    // SO load a list where onely ONE Todo is uncompleted
    const TODOS_WITH_ONLY_ONE_UNCOMPLETED: Todo[] = [
      TodoUtils.createTodo('Go drink beers', false),
      TodoUtils.createTodo('Sleep', true),
      TodoUtils.createTodo('Play sports', true),
      TodoUtils.createTodo('Go to Mars', true),
    ];
    component.todos = TODOS_WITH_ONLY_ONE_UNCOMPLETED;
    component.checkSetRemaingAndToggleAllCheck();
    fixture.detectChanges();
    expect(toggleAllCheckbox.checked).toBe(false);
    // checkbox SHOULD BE SELECTED HERE
    // If you do it on the first LINE, it will not work
    // Because the NODES will be detached !
    const checkboxes: NodeListOf<HTMLInputElement> = compiled.querySelectorAll('[data-test="todo-item-checkbox"]');

    // ACT
    // Trigger click event on the checkbox of the last uncompleted Todo
    const lastUncompletedCheckbox = checkboxes[0];
    expect(lastUncompletedCheckbox.checked).toBe(false);
    // userEvent.setup();
    // await userEvent.click(lastUncompletedCheckbox);
    // fireEvent.click(lastUncompletedCheckbox);
    lastUncompletedCheckbox.click();
    // lastUncompletedCheckbox.dispatchEvent(new Event('click')); //why not working with click() ? => because of the
    // with dispatchEvent, the checkboc.checked is not updated to true
    // async component.onToggleOne(component.todos[0]); // if we call the method directly, it works
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    console.log('ALL TODOS', component.todos);
    console.log('checkboxes[0]', checkboxes[0], checkboxes[0].checked);

    expect(toggleAllCheckbox.checked).toBe(true);
  });

  it('7-4 should check the toggleAll checkbox when the last uncompleted Todo is removed', () => {

    const toggleAllCheckbox: HTMLInputElement = compiled.querySelector('[data-test="toggle-all-checkbox"]') as HTMLInputElement;
    // NOT HERE !
    // const checkboxes: NodeListOf<HTMLInputElement> = compiled.querySelectorAll('[data-test="todo-item-checkbox"]');
    // NOT HERE !
    // by default, the toggleAll checkbox is unchecked at init
    // because there are 3 uncompleted Todo
    // SO load a list where onely ONE Todo is uncompleted
    const TODOS_WITH_ONLY_ONE_UNCOMPLETED: Todo[] = [
      TodoUtils.createTodo('Go drink beers', false),
      TodoUtils.createTodo('Sleep', true),
      TodoUtils.createTodo('Play sports', true),
      TodoUtils.createTodo('Go to Mars', true),
    ];
    component.todos = TODOS_WITH_ONLY_ONE_UNCOMPLETED;
    component.checkSetRemaingAndToggleAllCheck();
    fixture.detectChanges();
    expect(toggleAllCheckbox.checked).toBe(false);

    //OK
    // const removeButtons = compiled.querySelectorAll('[data-test="remove-todo"]') as NodeListOf<HTMLButtonElement>;
    // removeButtons[0].click();

    // or finer UI seletion
    // Trigger click event on the remove button of the last uncompleted Todo
    const lastUncompletedTodoInput =
      compiled.querySelector('[data-test="todo-item-checkbox"]:not(:checked)');
    const parentLi = lastUncompletedTodoInput!.closest('[data-test="todo-item-li"]') as HTMLLIElement;
    const removeButton = parentLi.querySelector('[data-test="remove-todo"]') as HTMLButtonElement;
    console.log('lastUncompletedRemoveButton', parentLi.querySelector('[data-test="remove-todo"]'));
    removeButton.click();

    fixture.detectChanges();

    expect(toggleAllCheckbox.checked).toBe(true);
    component.todos.forEach(todo => expect(todo.completed).toBe(true));
  });

  it('8-1 should have message "No todos remaining" when todos are all completed', () => {
    // Initialize component.todos
    // so that all todos are completed
    component.todos.forEach(todo => todo.completed = true);
    component.checkSetRemaingAndToggleAllCheck(); // to sync the data : remaining and toggleAllCheck
    fixture.detectChanges(); // to update the view
    const noTodosRemaining: HTMLInputElement = compiled.querySelector('[data-test="remaining-message"]') as HTMLInputElement;
    expect(noTodosRemaining.textContent!.trim()).toBe('No remaining todos');
  });

  it('8-2 should have message "# todos remaining" when  # todos aren\'t completed', () => {
    // Initialize component.todos
    const TODOS_2_UNCOMPLETED: Todo[] = [
      TodoUtils.createTodo('Todo1', false),
      TodoUtils.createTodo('Todo2', true),
      TodoUtils.createTodo('Todo3', false),
    ];
    component.todos = TODOS_2_UNCOMPLETED;
    component.checkSetRemaingAndToggleAllCheck(); // to sync the data : remaining and toggleAllCheck
    fixture.detectChanges(); // to update the view
    const noTodosRemaining: HTMLInputElement = compiled.querySelector('[data-test="remaining-message"]') as HTMLInputElement;
    expect(noTodosRemaining.textContent!.trim()).toBe('2 remaining todos');
  });

  it('8-3 should have message "One todos remaining" when  # todos aren\'t completed', () => {
    // Initialize component.todos
    const TODOS_ONE_UNCOMPLETED: Todo[] = [
      TodoUtils.createTodo('Todo1', true),
      TodoUtils.createTodo('Todo2', true),
      TodoUtils.createTodo('Todo3', false),
    ];
    component.todos = TODOS_ONE_UNCOMPLETED;
    component.checkSetRemaingAndToggleAllCheck(); // to sync the data : remaining and toggleAllCheck
    fixture.detectChanges(); // to update the view
    const noTodosRemaining: HTMLInputElement = compiled.querySelector('[data-test="remaining-message"]') as HTMLInputElement;
    expect(noTodosRemaining.textContent!.trim()).toBe('One remaining todo');
  });

});
