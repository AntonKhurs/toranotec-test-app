import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
