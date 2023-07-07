import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// hand coded imports
// import {userEvent} from '@testing-library/user-event/setup/index';  KOOO
// import userEvent from '@testing-library/user-event'; // OK
import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TODO_FILTER_ENUM} from './todo.model';
import {TodosFilterPipe} from './todos-filter.pipe';

describe('AppComponent filtering with the ALL ACTIVE COMPLETED', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled!: HTMLElement;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RemainingMessagePipe,
        TodosFilterPipe,
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
  it('10-1 should apply the correct active class to the filter buttons', () => {
    const filterButtonAllElement = fixture.debugElement.query(By.css('[data-test="filter-button-all"]')).nativeElement;

    expect(filterButtonAllElement.classList).toContain('myactive');

    // ACT
    component.setTasksFilterStatus(TODO_FILTER_ENUM.ACTIVE);
    fixture.detectChanges();

    expect(filterButtonAllElement.classList).not.toContain('myactive');
    expect(fixture.debugElement.query(By.css('[data-test="filter-button-active"]')).nativeElement.classList).toContain('myactive');
  });

  it('10-2 should rendre the correct tasks filtered for ACTIVE (not completed todo)  when a filter button ACTIVE is clicked',
    async () => {
      const filterButtonActiveElement = fixture.debugElement.query(By.css('[data-test="filter-button-active"]')).nativeElement;
      const filterButtonCompletedElement = fixture.debugElement.query(By.css('[data-test="filter-button-completed"]')).nativeElement;
      let checkboxElements = fixture.nativeElement.querySelectorAll('[data-test="todo-item-checkbox"]');
      expect(checkboxElements.length).toBe(4);

      filterButtonActiveElement.click();
      fixture.detectChanges();
      // await fixture.whenStable(); // if ngModel is used the input
      // fixture.detectChanges();

      expect(component.filterChoice).toBe(TODO_FILTER_ENUM.ACTIVE);
      checkboxElements = fixture.nativeElement.querySelectorAll('[data-test="todo-item-checkbox"]');
      checkboxElements.forEach((checkboxElement: HTMLInputElement) => {
        expect(checkboxElement.checked).toBeFalse();
      });
      expect(checkboxElements.length).toBe(3);

      filterButtonCompletedElement.click();
      fixture.detectChanges();
      // await fixture.whenStable();
      // fixture.detectChanges();

      expect(component.filterChoice).toBe(TODO_FILTER_ENUM.COMPLETED);
      checkboxElements = fixture.nativeElement.querySelectorAll('[data-test="todo-item-checkbox"]');
      checkboxElements.forEach((checkboxElement: HTMLInputElement) => {
        expect(checkboxElement.checked).toBeTrue();
      });
      expect(checkboxElements.length).toBe(1);
    });

});
