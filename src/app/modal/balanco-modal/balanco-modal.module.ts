import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancoModalPageRoutingModule } from './balanco-modal-routing.module';

import { BalancoModalPage } from './balanco-modal.page';

import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BalancoModalPageRoutingModule,
    BrMaskerModule
    
  ],
  declarations: [BalancoModalPage]
  
})
export class BalancoModalPageModule {}
