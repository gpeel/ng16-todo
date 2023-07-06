import {TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TodosFilterPipePipe} from './todos-filter.pipe';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      declarations: [
        AppComponent,
        TodosFilterPipePipe,
        RemainingMessagePipe,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FontAwesomeModule
      ],
    }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Q: could you write the test code for the following test case ?
  // a:
  //q: it fails, could you correct it ?
  //a: not done!
  // pb was selector querySelectorAll('[data-test="todo-item-li"]');
  // initialtly it was querySelectorAll('todo-list li'); but it was not working
  // where dis codepilog get that selector from ?
  it('should show in the UI the same todos labels and completed values as those in component.todos', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    const todos = compiled.querySelectorAll('[data-test="todo-item-li"]');
    expect(todos.length).toBe(app.todos.length);
    app.todos.forEach((todo, index) => {
      const todoElement = todos[index];
      expect(todoElement.querySelector('label').textContent).toBe(todo.label);
      expect(todoElement.querySelector('input[type=checkbox]').checked).toBe(todo.completed);
    });
  });

});
