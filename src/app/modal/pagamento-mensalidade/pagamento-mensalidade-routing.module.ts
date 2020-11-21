import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagamentoMensalidadePage } from './pagamento-mensalidade.page';

const routes: Routes = [
  {
    path: '',
    component: PagamentoMensalidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagamentoMensalidadePageRoutingModule {}
