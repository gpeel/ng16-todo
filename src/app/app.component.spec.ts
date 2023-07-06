import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TodosFilterPipePipe} from './todos-filter.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled!: HTMLElement;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodosFilterPipePipe,
        RemainingMessagePipe,
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

  it('1) should have 0 remaining tasks', () => {
    expect(component.remainingTodos)
      .withContext('The property remainingTasks should be created')
      .toBeDefined();
    expect(component.remainingTodos)
      .withContext('The property remainingTasks should be initialized to 0')
      .toBe(0);
  });

  // it('should show in the UI the same todos labels and completed values as those in component.todos', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   const compiled = fixture.nativeElement;
  //   fixture.detectChanges();
  //   const todos = compiled.querySelectorAll('[data-test="todo-item-li"]');
  //   expect(todos.length).toBe(app.todos.length);
  //   app.todos.forEach((todo, index) => {
  //     const todoElement = todos[index];
  //     expect(todoElement.querySelector('label').textContent).toBe(todo.label);
  //     expect(todoElement.querySelector('input[type=checkbox]').checked).toBe(todo.completed);
  //   });
  // });

});
