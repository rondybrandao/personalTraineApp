import { MensalidadeService } from './../../services/mensalidade.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FinanceiroService } from 'src/app/services/financeiro.service';

@Component({
  selector: 'app-pagamento-mensalidade',
  templateUrl: './pagamento-mensalidade.page.html',
  styleUrls: ['./pagamento-mensalidade.page.scss'],
})
export class PagamentoMensalidadePage implements OnInit {
  @Input() nome: string;
  @Input() key: string;
  @Input() valor: string = '0,00';
  @Input() mes: string;

  constructor(
    public modalCtrl: ModalController,
    public financeiro:FinanceiroService,
    public financeiroService: FinanceiroService,
    public toastController: ToastController,
    public mensalidadeService: MensalidadeService
  ) {console.log(this.nome) }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  register(form){
    console.log(form.value)
    this.mensalidadeService.saveMensalidade( this.key, this.nome, form.value).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
      this.dismiss()
    })
  }

  delete(id, key){
    this.mensalidadeService.deleteMensalidade( this.key, this.nome).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
      this.dismiss()
    })
  }

  edit(form){
    this.mensalidadeService.editMensalidade( this.key, this.nome, form.value).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
      this.dismiss()
    })
  }

  async toastOK() {
    const toast = await this.toastController.create({
      message: 'Pagamento enviado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  async toastErro() {
    const toast = await this.toastController.create({
      message: 'Pagamento NÂO enviado!',
      duration: 2000
    });
    toast.present();
  }

}
