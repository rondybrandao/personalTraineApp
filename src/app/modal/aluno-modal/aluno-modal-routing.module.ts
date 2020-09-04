import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoModalPage } from './aluno-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AlunoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunoModalPageRoutingModule {}
