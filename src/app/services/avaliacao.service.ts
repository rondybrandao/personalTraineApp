import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/pt-br'
@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  avaliacaoBody = []
  toMonthSend
  constructor(private db: AngularFireDatabase) {
    moment.locale('pt-BR');
    //this.toDaySend = moment().format('D/MM/YYYY');
    this.toMonthSend = moment().format('YYYY/MMMM');
   }

  getDataBody(key){
    console.log(key)
    key = 'teste'
    return new Promise((resolve, reject) => {
      this.db.list('avaliacao/' + key + '/2019').snapshotChanges().subscribe(avaliacaoBody => {
        console.log(avaliacaoBody)
        avaliacaoBody.forEach(item => {
          if(item){
            this.avaliacaoBody.push(item.payload.val())
            console.log(item.payload.val())
          }
        })
        resolve(this.avaliacaoBody)
      })
    })
  }

  save(avaliacao:any, key) {
    console.log(key)
    return new Promise((resolve, reject) => {
      if(avaliacao) {
        this.db.database.ref('avaliacao').child(key + '/' +this.toMonthSend)
          .set({
            //data: this.toDaySend,
            nome: avaliacao.nome,
            peso: avaliacao.peso,
            ombro: avaliacao.ombro,
            torax: avaliacao.torax,
            cintura: avaliacao.cintura,
            abdominal: avaliacao.abdominal,
            quadril: avaliacao.quadril,
            coxa_superior: avaliacao.coxa_superior,
            coxa_media: avaliacao.coxa_media,
            coxa_inferior: avaliacao.coxa_inferior,
            perna: avaliacao.perna,
            imc: avaliacao.imc,
            gordura: avaliacao.gordura,
            massa_magra: avaliacao.massa_magra,
            tmb: avaliacao.tmb,
            gorduraV: avaliacao.gorduraV
          })
          .then(() => resolve())
      }
    })
  }

  saveTreino(avaliacao, key) {
    console.log(key)
    return new Promise((resolve, reject) => {
      if(avaliacao) {
        this.db.database.ref('avaliacao').child('teste/2019/Agosto/treino/02')
          .set({
            //data: this.toDaySend,
            braco: avaliacao.braco,
            costa: avaliacao.costa,
            abdomen: avaliacao.abdomen,
            gluteo: avaliacao.gluteo,
            perna: avaliacao.perna,
            cardio: avaliacao.cardio
          }).then(() => resolve())
      }
    })
  }
}
