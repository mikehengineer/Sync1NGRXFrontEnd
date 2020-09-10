import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadComponent } from '../applicant/read/read.component';
import { AddComponent } from '../applicant/add/add.component';
import { EditComponent } from '../applicant/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ReadComponent,
  },
  {
    path: 'edit/:applicantId',
    component: EditComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}