import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentoMensalidadePageRoutingModule } from './pagamento-mensalidade-routing.module';

import { PagamentoMensalidadePage } from './pagamento-mensalidade.page';

import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagamentoMensalidadePageRoutingModule,
    BrMaskerModule
  ],
  declarations: [PagamentoMensalidadePage]
})
export class PagamentoMensalidadePageModule {}
