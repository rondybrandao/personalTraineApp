import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMensalidadePage } from './edit-mensalidade.page';

const routes: Routes = [
  {
    path: '',
    component: EditMensalidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMensalidadePageRoutingModule {}
