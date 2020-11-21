import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  listaDeAlunos 
  constructor(private db: AngularFireDatabase) { }

  getAlunos() {
    return new Promise((resolve, reject) => {
      this.db.list('aluno').snapshotChanges().subscribe(listAlunos => {
        this.listaDeAlunos = []
        listAlunos.forEach(item => {
          if(item){
            this.listaDeAlunos.push(item.payload.val())
          }
        })
        resolve(this.listaDeAlunos)
        
      })
    })
  }

  

  save(aluno:any) {
    console.log(aluno)
    //let alunoNome = aluno.nome
    return new Promise((resolve, reject) => {
      if(aluno) {
        //let toKey = moment().format(`DMY`)
        //let newKey = alunoNome+toKey
        //let data = this.toDaySend
        
        this.db.database.ref('alunos')
        //this.db.list('/aluno')
          .push({
            //key:newKey,
            //data: data,
            nome: aluno.nome,
            nascimento: aluno.nascimento,
            ocupacao: aluno.ocupacao,
            objetivo: aluno.objetivo,
            //img: imgPath,
          })
          .then((res) => {
            console.log(res)
            resolve()})
      }
    })
  }

  getPlanoDeTreino(){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('planoDeTreino').child('alunoTeste').once('value', snapshot => {
  
        resolve(snapshot.val())
      })
    })
  }

  sendSegunda(segunda){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('planoDeTreino/alunoTeste').update({
        segunda:segunda
      })
      resolve(true)
      reject(false)
    }).catch(err =>{
      console.log(err)
    })
  }

  sendTerca(terca){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('planoDeTreino/alunoTeste').update({
        segunda:terca
      })
      resolve(true)
      reject(false)
    }).catch(err =>{
      console.log(err)
    })
  }

  sendQuarta(quarta){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('planoDeTreino/alunoTeste').update({
        segunda:quarta
      })
      resolve(true)
      reject(false)
    }).catch(err =>{
      console.log(err)
    })
  }

  sendQuinta(quinta){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('planoDeTreino/alunoTeste').update({
        segunda:quinta
      })
      resolve(true)
      reject(false)
    }).catch(err =>{
      console.log(err)
    })
  }

  sendSexta(sexta){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('planoDeTreino/alunoTeste').update({
        segunda:sexta
      })
      resolve(true)
      reject(false)
    }).catch(err =>{
      console.log(err)
    })
  }

  sendSabado(sabado){
    return new Promise((resolve, reject)=>{
      this.db.database.ref('planoDeTreino/alunoTeste').update({
        segunda:sabado
      })
      resolve(true)
      reject(false)
    }).catch(err =>{
      console.log(err)
    })
  }

  delete(dia, item){
    this.db.database.ref('planoDeTreino/alunoTeste/' + dia).child(item).remove()
  }
}
