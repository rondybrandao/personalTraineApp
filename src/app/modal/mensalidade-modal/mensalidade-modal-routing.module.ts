import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensalidadeModalPage } from './mensalidade-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MensalidadeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensalidadeModalPageRoutingModule {}
