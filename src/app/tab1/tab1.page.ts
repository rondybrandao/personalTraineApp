import { AlunosService } from './../services/alunos.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlunoModalPage } from '../modal/aluno-modal/aluno-modal.page';
import { RegistroAlunoModalPage } from '../modal/registro-aluno-modal/registro-aluno-modal.page';
import { AvaliacaoModalPage } from '../modal/avaliacao-modal/avaliacao-modal.page';
import { TreinoModalPage } from '../modal/treino-modal/treino-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listaDeAlunos
  constructor(
    public alunoService: AlunosService,
    public modalController: ModalController) {
    this.getAlunos()
  }

  getAlunos() {
    this.alunoService.getAlunos().then((res) => {
      this.listaDeAlunos = res
      console.log(this.listaDeAlunos[0].key)
    })
  }

  async presentModalAluno() {
    const modal = await this.modalController.create({
      component: AlunoModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'key': this.listaDeAlunos[0].key,
        'nomeDoAluno':this.listaDeAlunos[0].nome,
        'ocupacao': this.listaDeAlunos[0].ocupacao,
        'imgAvatar': 'N'
      }
    });
    return await modal.present();
  }

  async presentModalRegistroAluno(){
    const modal = await this.modalController.create({
      component: RegistroAlunoModalPage,
    });
    return await modal.present();
  }

  async presentModalAvaliacao(key) {
    const modal = await this.modalController.create({
      component: AvaliacaoModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'key': this.listaDeAlunos[0].key,
      }
    });
    return await modal.present();
  }

  async presentModalTreino(key) {
    const modal = await this.modalController.create({
      component: TreinoModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'key': this.listaDeAlunos[0].key,
      }
    });
    return await modal.present();
  }

}
