import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { RegistryComponent } from './components/registry/registry.component';

const routes: Routes = [
  { path: '', component:RegistryComponent }, // Default route
  { path: 'quiz', component: QuizComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
