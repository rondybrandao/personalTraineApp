import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMensalidadePageRoutingModule } from './edit-mensalidade-routing.module';

import { EditMensalidadePage } from './edit-mensalidade.page';

import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMensalidadePageRoutingModule,
    BrMaskerModule
  ],
  declarations: [EditMensalidadePage]
})
export class EditMensalidadePageModule {}
