import { MensalidadeModalPage } from './../modal/mensalidade-modal/mensalidade-modal.page';
import { Component } from '@angular/core';
import { AlunosService } from '../services/alunos.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listaDeAlunos
  constructor(
    public alunoService: AlunosService,
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

  async pagarMensalidade(key, nome) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensalidade',
      subHeader: nome,
      inputs:[
        {
          name: 'valor',
          type: 'number',
          placeholder: 'Valor (R$)',
          cssClass: 'specialClass',
          attributes: {
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Pagar',
          handler: (name) => {
            console.log('Confirm Ok', key);
            console.log('Confirm Ok', name);
          }
        }
      ]
    });

    await alert.present();
  }
}
