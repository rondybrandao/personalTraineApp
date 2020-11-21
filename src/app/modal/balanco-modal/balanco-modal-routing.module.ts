import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalancoModalPage } from './balanco-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BalancoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalancoModalPageRoutingModule {}
