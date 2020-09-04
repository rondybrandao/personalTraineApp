import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensalidadeModalPageRoutingModule } from './mensalidade-modal-routing.module';

import { MensalidadeModalPage } from './mensalidade-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensalidadeModalPageRoutingModule
  ],
  declarations: [MensalidadeModalPage]
})
export class MensalidadeModalPageModule {}
