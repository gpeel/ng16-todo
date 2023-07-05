import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {RemainingMessagePipe} from './remaining-message.pipe';
import {TodosFilterPipePipe} from './todos-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodosFilterPipePipe,
    RemainingMessagePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
