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

});
