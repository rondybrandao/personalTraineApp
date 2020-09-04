import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoModalPageRoutingModule } from './treino-modal-routing.module';

import { TreinoModalPage } from './treino-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoModalPageRoutingModule
  ],
  declarations: [TreinoModalPage]
})
export class TreinoModalPageModule {}
