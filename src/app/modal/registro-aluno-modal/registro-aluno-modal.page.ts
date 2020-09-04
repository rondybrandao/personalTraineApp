import { ModalController } from '@ionic/angular';
import { AlunosService } from './../../services/alunos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro-aluno-modal',
  templateUrl: './registro-aluno-modal.page.html',
  styleUrls: ['./registro-aluno-modal.page.scss'],
})
export class RegistroAlunoModalPage implements OnInit {
  form: FormGroup
  constructor(
    public alunoService: AlunosService,
    public modalController: ModalController) { }

  ngOnInit() {
  }

  addAluno(form) {
    console.log(form.value)
    this.alunoService.save(form.value).then(() => {
      this.dismiss()
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
