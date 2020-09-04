import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoModalPage } from './avaliacao-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacaoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliacaoModalPageRoutingModule {}
