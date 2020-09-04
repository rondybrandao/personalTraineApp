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
    const mesFormat = balanco.mesRef.slice(0, 3)
    const lucro = balanco.receita - balanco.despesa
    this.db.database.ref('balanco2/teste/' + balanco.mes)
      .set({
        receita:balanco.receita,
        despesa:balanco.despesa,
        lucro:lucro,
        mes:mesFormat
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
          //console.log(item.key)
        })
        resolve(data)
      })
    })
  }

  setBalanco(item){
    const lucro = item.receita - item.despesa
    this.db.database.ref('balanco2/teste/'+item.mes).set({
      receita:item.receita,
      despesa:item.despesa,
      lucro:lucro
    })
  }
  
}
