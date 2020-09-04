import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAlunoModalPageRoutingModule } from './registro-aluno-modal-routing.module';

import { RegistroAlunoModalPage } from './registro-aluno-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAlunoModalPageRoutingModule
  ],
  declarations: [RegistroAlunoModalPage]
})
export class RegistroAlunoModalPageModule {}
