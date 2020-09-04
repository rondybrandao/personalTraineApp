import { ModalController } from '@ionic/angular';
import { AvaliacaoService } from './../../services/avaliacao.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-avaliacao-modal',
  templateUrl: './avaliacao-modal.page.html',
  styleUrls: ['./avaliacao-modal.page.scss'],
})
export class AvaliacaoModalPage implements OnInit {
  
  @Input() key: string
  form: FormGroup
  category: any
  aluno

  constructor(
    public avaliacaoService: AvaliacaoService,
    public modalController: ModalController) { this.category = 'treino' }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    
    const valorSegment = ev.detail.value
    this.category = valorSegment
    console.log('Segment changed', this.category);
  }

  registrarAvaliacao(form) {
    let peso = parseFloat(form.value.peso), tr = parseFloat(form.value.triceps), si=parseFloat(form.value.suprailiaco), ab=parseFloat(form.value.abdominal) 
    const percentualDeGordura = this.calcularPercentGorduraHomen(tr, si, ab, peso)
    console.log(percentualDeGordura)
    const GA = peso * (percentualDeGordura/100)
    const MCM = peso - GA
    const PCI = MCM / 0.85
    console.log(GA, MCM, PCI)
    let dc = {
      'GA':GA,
      'MCM':MCM,
      'PCI':PCI
    }
    console.log(dc)
    //this.avaliacaoService.save(form.value, this.key, dc).then(() => {
      //this.router.navigateByUrl('tabs/tab2')
    //})
  }

  registrar_V2(form){
    let peso = parseFloat(form.value.peso), 
        tr = parseFloat(form.value.triceps), 
        si=parseFloat(form.value.suprailiaco), 
        ab=parseFloat(form.value.abdominal)

  }

  registrarAvaliacaoTreino(form) {
    console.log(form.value)
    this.avaliacaoService.saveTreino(form.value, this.key).then(() => {
      //this.router.navigateByUrl('tabs/tab2')
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  calcularPercentGorduraHomen(tr, si, ab, peso){
  
    let dens = 1.17136 - 0.0706 * Math.log(tr +si +ab)
    let pg = ((4.95/dens) - 4.50) * 100
    let ga = peso * (pg/100)
    let mcm = peso - ga
    console.log(pg.toPrecision(4), ga.toPrecision(4), mcm)
    return pg
  }
}
