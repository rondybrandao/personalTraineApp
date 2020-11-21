import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import * as moment from 'moment'
import 'moment/locale/pt-br'

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  constructor(private db: AngularFireDatabase) { }

  setReceitas(receita){
    this.db.database.ref('balanco/teste/receitas')
    .push(receita)
  }

  setDespesas1(despesas){
    this.db.database.ref('balanco/teste/despesas')
      .push({
        transporte:'200',
        suplementos:'200',
        outros:'300',
        mes:'agosto'
      })
  }

  setDespesas(despesas){
    
    this.db.database.ref('balanco2/teste/despesas')
      .push({
        descricao:'gazolina',
        valor:'300',
        refMes:'agosto',
      })
  }

  addBalanco(balanco){
    console.log(balanco)
    var receita = parseFloat(balanco.receita)
    var despesa = parseFloat(balanco.despesa)
    var lucro
    if(receita < 10){
      receita = parseFloat(balanco.receita) * 1000
    }
    if(despesa < 10){
      despesa = parseFloat(balanco.despesa) * 1000
    }
    const mesFormat = balanco.mes.slice(3,6)
    const mesIndice = balanco.mes.slice(0,2)
    lucro = receita  - despesa
    lucro = lucro.toLocaleString('pt-br',{ minimumFractionDigits: 2 })
    //lucro = lucro.toLocaleString('pt-br',{style:'currency', currency:'BRL'})
    console.log(lucro.toLocaleString('pt-br',{ minimumFractionDigits: 2 }))
    console.log(receita +"-"+ despesa)
    return new Promise((resolve)=>{
      this.db.database.ref('balanco2/teste/' + mesIndice)
      .set({
        receita:balanco.receita,
        despesa:balanco.despesa,
        lucro:lucro,
        mes:mesFormat
      })
      resolve('ok')
    })
    
  }

  getFinanceiro(){
    var res 
    var jul = [] 
    var ago = []
    return new Promise((resolve, reject)=>{
      this.db.list('financeiro/teste').snapshotChanges().subscribe(data => {
        data.forEach(item => {
          console.log(item.payload.child('agosto').val(), item.payload.val())
          res = item.payload.val()
          if(item.payload.child('julho').val()){
            let j = item.payload.child('julho').val()
            jul.push(j)
          } 
          if(item.payload.child('agosto').val()){
            let a = item.payload.child('agosto').val()
            console.log(a)
            ago.push(a)
          }
        })
        res = [jul, ago]
        resolve(res)
      })
    })
  }

  getDataFinanceiro(){
    var data = []
    return new Promise(resolve=>{
      this.db.list('financeiro/teste').snapshotChanges().subscribe(res=>{
        res.forEach(item =>{
          data.push(item.payload.val())
          //console.log(item.key)
        })
        resolve(data)
      })
    })
  }

  getReceita(){
    var array = []
    return new Promise(resolve=>{
      this.db.list('financeiro/teste/receitas').snapshotChanges().subscribe(res=>{
        
        resolve(res)
      })
    })
  }


  getBalanco(){
    var data = []
    return new Promise(resolve=>{
      this.db.list('balanco/teste').snapshotChanges().subscribe(res=>{
        res.forEach(item =>{
          data.push(item.payload.val())
          //console.log(item.key)
        })
        resolve(data)
      })
    })
  }

  getBalanco2(){
    var data = []
    return new Promise(resolve=>{
      this.db.list('balanco2/teste').snapshotChanges().subscribe(res=>{
        res.forEach(item =>{
          data.push(item.payload.val())
        })
        console.log(data)
        resolve(data)
      })
      
    })
  }

  getBalanco3(){
    var data = []
    this.db.list('balanco2/teste').snapshotChanges().subscribe(res=>{
      res.forEach(item =>{
        data.push(item.payload.val())
      })
      console.log(data)
      return data
    })
  }

  setBalanco(item){
    const lucro = item.receita - item.despesa
    return new Promise((resolve, reject)=>{
      this.db.database.ref('balanco2/teste/'+item.mes).set({
        receita:item.receita,
        despesa:item.despesa,
        lucro:lucro
      })
      resolve(true)
    })
    
  }

  setMensalidade(mes, key, name){
    console.log(key, name)
    const dataDoPagamento = moment().format('L');
    console.log(dataDoPagamento)
    this.db.database.ref('pagamentos/'+ key + '/' + mes).set({
      data:dataDoPagamento,
      valor:name.valor,
      mesRef:mes
    })
  }
  
}
