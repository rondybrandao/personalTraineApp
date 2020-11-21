import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import * as moment from 'moment'
import 'moment/locale/pt-br'

@Injectable({
  providedIn: 'root'
})
export class MensalidadeService {

  constructor(private db: AngularFireDatabase) { }

  saveMensalidade(key, nome, form){
    console.log(key, nome, form)
    const dataDoPagamento = moment().format('L');
    return new Promise((resolve, reject)=>{
      this.db.database.ref('pagamentos/'+ key).push({
        data:dataDoPagamento,
        valor:form.receita,
        mesRef:form.mes
      })
      resolve(true)
      reject(false)
    })
  }

  deleteMensalidade(key, id){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('pagamentos/'+id+'/'+key).remove(()=>{
        resolve(true)
        reject(false)
      })
    })
  }

  editMensalidade(id, key, form){
    console.log(id, key, form)
    return new Promise((resolve, reject)=>{
      this.db.database.ref('pagamentos/'+id+'/'+key).update({
        valor:form.receita
      })
      resolve(true)
      reject(false)
    })
  }

  getMensalidade(key){
    var data = []
    return new Promise((resolve, reject)=>{
      this.db.list('pagamentos/'+key).snapshotChanges().subscribe(res=>{
        res.forEach(item => {
          let obj = {
            'id':item.key,
            'mensalidade':item.payload.val()
          }
          data.push(obj)
        })
        resolve(data)
      })
    })
  }

}
