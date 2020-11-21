import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MensalidadeService } from 'src/app/services/mensalidade.service';

@Component({
  selector: 'app-edit-mensalidade',
  templateUrl: './edit-mensalidade.page.html',
  styleUrls: ['./edit-mensalidade.page.scss'],
})
export class EditMensalidadePage implements OnInit {
  @Input() valor: string;
  @Input() mes: string;
  @Input() key: string;
  @Input() nome: string;
  @Input() id: string;

  constructor(
    public modalCtrl: ModalController,
    public mensalidadeService: MensalidadeService,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  edit(form){
    console.log(this.key)
    this.mensalidadeService.editMensalidade( this.id, this.key, form.value).then((res)=>{
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
