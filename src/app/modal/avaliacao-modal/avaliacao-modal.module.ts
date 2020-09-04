import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliacaoModalPageRoutingModule } from './avaliacao-modal-routing.module';

import { AvaliacaoModalPage } from './avaliacao-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliacaoModalPageRoutingModule
  ],
  declarations: [AvaliacaoModalPage]
})
export class AvaliacaoModalPageModule {}
