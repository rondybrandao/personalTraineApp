import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FinanceiroService } from 'src/app/services/financeiro.service';

@Component({
  selector: 'app-balanco-modal',
  templateUrl: './balanco-modal.page.html',
  styleUrls: ['./balanco-modal.page.scss'],
})
export class BalancoModalPage implements OnInit {
  @Input() firstName: string;
  @Input() callback
  
  constructor(
    public modalCtrl: ModalController,
    public financeiro:FinanceiroService,
  ) 
    {}

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  register(form){
    console.log(form.value)
    this.financeiro.addBalanco(form.value).then(()=>{
      this.dismiss()
    })
  }

}
