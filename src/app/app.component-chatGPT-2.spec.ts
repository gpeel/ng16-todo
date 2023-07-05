import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TODO_FILTER_ENUM} from './todo.model';
import {TodosFilterPipePipe} from './todos-filter.pipe';

/**
 * Q1 : could you generate the test code for the code below
 * Q2: could you generate test starting from UI event and also controlling HTML impact ?
 */

describe('AppComponent ChatGPT-2', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule],
      declarations: [AppComponent, TodosFilterPipePipe, RemainingMessagePipe],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('1- should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('2- should add a new todo from UI event', () => {
    const todoLabel = 'New Todo';
    const inputElement: HTMLInputElement = compiled.querySelector('[data-test="input-todo"]') as HTMLInputElement;
    inputElement.value = todoLabel;
    inputElement.dispatchEvent(new Event('input'));
    const addButton: HTMLButtonElement = compiled.querySelector('[data-test="add-button"]') as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();
    expect(component.todos.length).toBe(5);
    expect(component.todos[4].label).toBe(todoLabel);
    expect(component.inputFormControl.value).toBe('');
    const todoElements = compiled.querySelectorAll('[data-test="todo-item-li"]');
    expect(todoElements.length).toBe(5);
    const lastTodoElement = todoElements[todoElements.length - 1] as Element;
    expect(lastTodoElement.textContent!.trim()).toBe(todoLabel);
  });

  it('3- should remove a todo from UI event', () => {
    const todoElement: HTMLElement = compiled.querySelector('[data-test="todo-item-li"]') as HTMLElement;
    const removeButton: HTMLButtonElement = todoElement.querySelector('[data-test="remove-todo"]') as HTMLButtonElement;
    removeButton.click();
    fixture.detectChanges();
    expect(component.todos.length).toBe(3);
    expect(compiled.querySelectorAll('[data-test="todo-item-li"]')).toHaveSize(3);
  });

  it('4- should toggle the completed state of a todo from UI click event on checkbox per line', () => {
    const todoElement: HTMLElement = compiled.querySelector('[data-test="todo-item-li"]') as HTMLElement;
    const checkbox: HTMLInputElement = todoElement.querySelector('[data-test="todo-item-checkbox"]') as HTMLInputElement;
    const initialCompletedState = component.todos[0].completed;
    checkbox.click();
    fixture.detectChanges();
    expect(component.todos[0].completed).toBe(!initialCompletedState);
    expect(checkbox.checked).toBe(!initialCompletedState);
  });

  it('5- should toggle all todos to completed from UI event', async () => {
    const toggleAllCheckbox: HTMLInputElement = compiled.querySelector('[data-test="toggle-all-checkbox"]') as HTMLInputElement;
    toggleAllCheckbox.click();
    fixture.detectChanges();
    await fixture.whenStable(); // needed because of the ngModel two-way binding testing specific
    expect(component.todos.every(todo => todo.completed)).toBeTruthy();
    const todoElements = compiled.querySelectorAll('[data-test="todo-item-li"]');
    const checkboxes = Array.from(todoElements).map(todoElement =>
      todoElement.querySelector('[data-test="todo-item-checkbox"]')
    );
    // @ts-ignore
    expect(checkboxes.every(checkbox => (checkbox as Element)['checked'])).toBeTruthy();
  });

  it('6- should set the tasks filter status from UI event', () => {
    const filterButton: HTMLButtonElement = compiled.querySelector('[data-test="filter-button-active"]') as HTMLButtonElement;
    filterButton.click();
    fixture.detectChanges();
    expect(component.todosFilterChoice).toBe(TODO_FILTER_ENUM.ACTIVE);
    const activeFilterButton: HTMLButtonElement = compiled.querySelector('.myactive') as HTMLButtonElement;
    expect(activeFilterButton).toBe(filterButton);
  });
});
