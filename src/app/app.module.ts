import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {RemainingTodosPipe} from './remaining-todos.pipe';
import {TodosFilterPipe} from './todos-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodosFilterPipe,
    RemainingTodosPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
