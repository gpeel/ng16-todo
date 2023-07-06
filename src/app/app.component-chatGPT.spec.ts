import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TODO_FILTER_ENUM} from './todo.model';
import {TodosFilterPipePipe} from './todos-filter.pipe';

/**
 * could you generate the test code for the code below
 */
describe('AppComponent ChapGPT', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule, FontAwesomeModule],
      declarations: [AppComponent, TodosFilterPipePipe, RemainingMessagePipe],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    const todoLabel = 'New Todo';
    component.inputFormControl.setValue(todoLabel);
    component.onAddTodo();
    expect(component.todos.length).toBe(5);
    expect(component.todos[4].label).toBe(todoLabel);
    expect(component.inputFormControl.value).toBe('');
  });

  it('should remove a todo', () => {
    const todo = component.todos[0];
    component.onRemoveTodo(todo);
    expect(component.todos.length).toBe(3);
    expect(component.todos.includes(todo)).toBeFalsy();
  });

  it('should toggle the completed state of a todo', () => {
    const todo = component.todos[0];
    const completedState = todo.completed;
    component.onToggleOne(todo);
    expect(todo.completed).toBe(!completedState);
  });

  it('should toggle all todos to completed', () => {
    component.onToggleAll(true);
    expect(component.todos.every(todo => todo.completed)).toBeTruthy();
  });

  it('should set the tasks filter status', () => {
    const filter = TODO_FILTER_ENUM.ACTIVE;
    component.setTasksFilterStatus(filter);
    expect(component.todosFilterChoice).toBe(filter);
  });

  it('should check if the filter status is active', () => {
    const filter = TODO_FILTER_ENUM.ACTIVE;
    component.todosFilterChoice = filter;
    const isActive = component.isFilterStatus(filter);
    expect(isActive).toBeTruthy();
  });
});
