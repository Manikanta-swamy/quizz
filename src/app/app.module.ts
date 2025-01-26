import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { AdminComponent } from './components/admin/admin.component';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultComponent,
    AdminComponent,
    UppercasePipe,
    HighlightDirective,
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
