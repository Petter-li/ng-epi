import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChinaComponent }   from './china/china.component';


const routes: Routes = [
  { path: '', redirectTo: '/china', pathMatch: 'full' },
  { path: 'china', component: ChinaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
