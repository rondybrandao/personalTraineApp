import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAlunoModalPage } from './registro-aluno-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAlunoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAlunoModalPageRoutingModule {}
