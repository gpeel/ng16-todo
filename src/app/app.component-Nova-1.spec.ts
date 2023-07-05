import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TODO_FILTER_ENUM} from './todo.model';
import {TodosFilterPipePipe} from './todos-filter.pipe';

describe('AppComponent NOVA-1', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule],
      declarations: [AppComponent, TodosFilterPipePipe, RemainingMessagePipe],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('1- should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('2- should add a new todo when the form is submitted', () => {
    const inputElement = fixture.debugElement.query(By.css('[data-test="input-todo"]')).nativeElement;

    inputElement.value = 'New Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    spyOn(component, 'onAddTodo').and.callThrough();// NOVA forgot to callThrough() here !
    fixture.debugElement.query(By.css('[data-test="add-button"]')).triggerEventHandler('click', null); // KO
    // this confirms that triggerEventHandler() does not trigger the click event on the button  !!!!
    // (fixture.debugElement.query(By.css('[data-test="add-button"]')).nativeElement as HTMLElement).click(); // OK
    const addButton: HTMLButtonElement = fixture.nativeElement.querySelector('[data-test="add-button"]') as
      HTMLButtonElement;
    addButton.click();

    expect(component.onAddTodo).toHaveBeenCalled();
    expect(component.todos.length).toBe(5); // Modify the expected length based on your current todos list
    expect(component.todos[4].label).toBe('New Todo');
  });

  it('3- should remove a todo when the remove button is clicked', () => {
    spyOn(component, 'onRemoveTodo').and.callThrough();

    const removeButtonElement = fixture.debugElement.query(By.css('[data-test="remove-todo"]')).nativeElement;
    removeButtonElement.click();

    expect(component.onRemoveTodo).toHaveBeenCalled();
    expect(component.todos.length).toBe(3); // Modify the expected length based on your current todos list
  });

  it('4- should toggle the completed status of a todo when the checkbox is clicked', () => {
    const checkboxElement = fixture.debugElement.query(By.css('[data-test="todo-item-checkbox"]')).nativeElement;

    checkboxElement.click();
    fixture.detectChanges();

    expect(component.todos[0].completed).toBe(true);

    checkboxElement.click();
    fixture.detectChanges();

    expect(component.todos[0].completed).toBe(false);
  });

  it('5- should toggle all todos to completed when the toggle-all checkbox is clicked', () => {
    const toggleAllCheckboxElement = fixture.debugElement.query(By.css('[data-test="toggle-all-checkbox"]')).nativeElement;

    toggleAllCheckboxElement.click();
    fixture.detectChanges();

    expect(component.todos.every((todo) => todo.completed)).toBe(true);

    toggleAllCheckboxElement.click();
    fixture.detectChanges();

    expect(component.todos.every((todo) => !todo.completed)).toBe(true);
  });

  it('6- should not add a new todo if the input is empty', () => {
    const inputElement = fixture.debugElement.query(By.css('[data-test="input-todo"]')).nativeElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    spyOn(component, 'onAddTodo').and.callThrough();
    fixture.debugElement.query(By.css('[data-test="add-button"]')).triggerEventHandler('click', null);

    expect(component.onAddTodo).not.toHaveBeenCalled();
    expect(component.todos.length).toBe(4); // Not Modifying the expected length based on your current todos list
  });

  it('7- should display the correct number of remaining todos', () => {
    const messageElement = fixture.debugElement.query(By.css('.custom-padding')).nativeElement;

    expect(messageElement.textContent).toContain('3 remaining todos'); // Modify the expected message based on your
    // current
    // todos list

    component.todos.push({id: 4, label: 'New Todo', completed: false});
    fixture.detectChanges();

    expect(messageElement.textContent).toContain('4 remaining todos'); // Modify the expected message based on your
                                                                       // updated
    // todos list

    component.todos[0].completed = true;
    fixture.detectChanges();

    expect(messageElement.textContent).toContain('3 remaining todos'); // Modify the expected message based on your
                                                                       // updated
    // todos list
  });

  it('8- should switch to edit mode when a todo is double-clicked and focus on the input field', async () => {
    const todoElement = fixture.debugElement.query(By.css('[data-test="todo-item-li"]')).nativeElement;

    spyOn(component, 'onEditTodo').and.callThrough();
    todoElement.dispatchEvent(new Event('dblclick'));
    fixture.detectChanges();
    await fixture.whenStable(); // NOVA forgot to add await here ! it's an async call because
    // I used a setTimeout in the onEditTodo() method to focus in a later CD refresh cycle

    const inputEditElement = fixture.debugElement.query(By.css('input[data-test="input-edit"]')).nativeElement;

    expect(component.onEditTodo).toHaveBeenCalled();
    expect(component.editingTodo).toBeDefined();
    expect(inputEditElement).toBe(document.activeElement);
  });

  it('9- should exit edit mode and SAVE the modified label when focus is lost or Enter key is pressed', async () => {
    const todoElement = fixture.debugElement.query(By.css('[data-test="todo-item-li"]')).nativeElement;

    spyOn(component, 'onEditTodo').and.callThrough();
    todoElement.dispatchEvent(new Event('dblclick'));
    fixture.detectChanges();
    await fixture.whenStable();

    let inputEditElement = fixture.debugElement.query(By.css('input[data-test="input-edit"]')).nativeElement;

    expect(component.onEditTodo).toHaveBeenCalledOnceWith(component.todos[0]);
    fixture.detectChanges();

    inputEditElement.value = 'Edited Todo';
    inputEditElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputEditElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.editingTodo).toBeNull();
    expect(component.todos[0].label).toBe('Edited Todo'); // reverted to original label

    todoElement.dispatchEvent(new Event('dblclick'));
    fixture.detectChanges();
    await fixture.whenStable();
    inputEditElement = fixture.debugElement.query(By.css('input[data-test="input-edit"]')).nativeElement;

    inputEditElement.value = 'Edited Todo';
    inputEditElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputEditElement.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
    fixture.detectChanges();

    expect(component.editingTodo).toBeNull();
    expect(component.todos[0].label).toBe('Edited Todo');
  });

  it('10- should cancel edit mode and restore the original label when Escape key is pressed', async () => {
    const todoElement = fixture.debugElement.query(By.css('[data-test="todo-item-li"]')).nativeElement;

    spyOn(component, 'onEditTodo').and.callThrough();
    todoElement.dispatchEvent(new Event('dblclick'));
    fixture.detectChanges();
    await fixture.whenStable();

    const inputEditElement = fixture.debugElement.query(By.css('input[data-test="input-edit"]')).nativeElement;
    inputEditElement.value = 'Edited Todo';
    inputEditElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    spyOn(component, 'handleEscapeKeyboardEvent').and.callThrough();
    // inputEditElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'})); // bug in test only
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'})); // OK
    // fixture.nativeElement.querySelector('[data-test="todo-item-li"]').dispatchEvent(new KeyboardEvent('keydown',
    // {key: 'Escape'})); // KO
    // fixture.nativeElement.querySelector('.bg-image').dispatchEvent(new KeyboardEvent('keydown', {key:
    // 'Escape'}));//KO

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.handleEscapeKeyboardEvent).toHaveBeenCalledTimes(1);
    expect(component.editingTodo).toBeNull();
    expect(component.todos[0].label).toBe('Go drink beers'); // Modify the expected label based on your current todos
                                                             // list
  });

  it('11- should rendre the correct tasks filtered for ACTIVE (not completed todo)  when a filter button ACTIVE is clicked',
    async () => {
      const filterButtonActiveElement = fixture.debugElement.query(By.css('[data-test="filter-button-active"]')).nativeElement;
      const filterButtonCompletedElement = fixture.debugElement.query(By.css('[data-test="filter-button-completed"]')).nativeElement;

      filterButtonActiveElement.click();
      fixture.detectChanges();
      await fixture.whenStable(); // because of ngModel in the input
      fixture.detectChanges();
      expect(component.todosFilterChoice).toBe(TODO_FILTER_ENUM.ACTIVE);
      let checkboxElements = fixture.nativeElement.querySelectorAll('[data-test="todo-item-checkbox"]');
      checkboxElements.forEach((checkboxElement: HTMLInputElement) => {
        expect(checkboxElement.checked).toBeFalse();
      });

      filterButtonCompletedElement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.todosFilterChoice).toBe(TODO_FILTER_ENUM.COMPLETED);
      checkboxElements = fixture.nativeElement.querySelectorAll('[data-test="todo-item-checkbox"]');
      checkboxElements.forEach((checkboxElement: HTMLInputElement) => {
        expect(checkboxElement.checked).toBeTrue();
      });
    });

  it('12- should apply the correct active class to the filter buttons', () => {
    const filterButtonAllElement = fixture.debugElement.query(By.css('[data-test="filter-button-all"]')).nativeElement;

    expect(filterButtonAllElement.classList).toContain('myactive');

    component.setTasksFilterStatus(TODO_FILTER_ENUM.ACTIVE);
    fixture.detectChanges();
    expect(filterButtonAllElement.classList).not.toContain('myactive');
    expect(fixture.debugElement.query(By.css('[data-test="filter-button-active"]')).nativeElement.classList).toContain('myactive');
  });

});
