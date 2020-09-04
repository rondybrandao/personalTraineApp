import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDespesasModalPage } from './add-despesas-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddDespesasModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDespesasModalPageRoutingModule {}
