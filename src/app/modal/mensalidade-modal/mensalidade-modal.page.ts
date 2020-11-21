import { MensalidadeService } from './../../services/mensalidade.service';
import { FinanceiroService } from './../../services/financeiro.service';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EditMensalidadePage } from '../edit-mensalidade/edit-mensalidade.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensalidade-modal',
  templateUrl: './mensalidade-modal.page.html',
  styleUrls: ['./mensalidade-modal.page.scss'],
})
export class MensalidadeModalPage implements OnInit {
  @Input() key: string;
  @Input() nomeDoAluno: string;
  listaDePagamentos
  
  constructor(public financeiroService: FinanceiroService,
              public modalController: ModalController,
              public alertController: AlertController,
              public mensalidadeService:MensalidadeService,
              public router:Router) { }

  ngOnInit() {
    this.mensalidadeService.getMensalidade(this.key).then(res=>{
      this.listaDePagamentos = res
      console.log(this.listaDePagamentos)
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async editMensalidade(obj){
    console.log(obj)
    const modal = await this.modalController.create({
      component: EditMensalidadePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': this.key,
        'key':obj.id,
        'nome':this.nomeDoAluno,
        'valor':obj.mensalidade.valor,
        'mes':obj.mensalidade.mesRef
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      console.log('dismiss')
      return this.dismiss()
    })
  
    }

}
