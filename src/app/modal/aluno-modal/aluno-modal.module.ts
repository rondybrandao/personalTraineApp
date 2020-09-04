import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlunoModalPageRoutingModule } from './aluno-modal-routing.module';

import { AlunoModalPage } from './aluno-modal.page';

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlunoModalPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [AlunoModalPage]
})
export class AlunoModalPageModule {}
