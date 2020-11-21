import { FinanceiroService } from './../services/financeiro.service';
import { MensalidadeModalPage } from './../modal/mensalidade-modal/mensalidade-modal.page';
import { Component } from '@angular/core';
import { AlunosService } from '../services/alunos.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PagamentoMensalidadePage } from '../modal/pagamento-mensalidade/pagamento-mensalidade.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listaDeAlunos
  constructor(
    public alunoService: AlunosService,
    public financeiroService: FinanceiroService,
    public alertController: AlertController,
    public modalController: ModalController) {this.getAlunos()}
  
  getAlunos() {
    this.alunoService.getAlunos().then((res) => {
      this.listaDeAlunos = res
      
    })
  }

  async openHistoricoDePagamentos(key) {
    const modal = await this.modalController.create({
      component: MensalidadeModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'key': key,
      }
    });
    return await modal.present();
  }

  async openPagamentoModal(key, nome) {
    const modal = await this.modalController.create({
      component: PagamentoMensalidadePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'key': key,
        'nome':nome
      }
    });
    return await modal.present();
  }

  pagamentoService(mes, key, name){
    this.financeiroService.setMensalidade(mes, key, name)
  }

}
