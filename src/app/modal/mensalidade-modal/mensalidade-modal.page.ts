import { AlunosService } from './../../services/alunos.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mensalidade-modal',
  templateUrl: './mensalidade-modal.page.html',
  styleUrls: ['./mensalidade-modal.page.scss'],
})
export class MensalidadeModalPage implements OnInit {
  @Input() key: string;
  @Input() nomeDoAluno: string;
  listaDePagamentos
  
  constructor(public alunoService: AlunosService,
              public modalController: ModalController) { }

  ngOnInit() {
    this.alunoService.getHistoricoDePagamentosAluno(this.key).then(res=>{
      this.listaDePagamentos = res
      console.log(this.listaDePagamentos)
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
