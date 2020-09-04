import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDespesasModalPageRoutingModule } from './add-despesas-modal-routing.module';

import { AddDespesasModalPage } from './add-despesas-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDespesasModalPageRoutingModule
  ],
  declarations: [AddDespesasModalPage]
})
export class AddDespesasModalPageModule {}
