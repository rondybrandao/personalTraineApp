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

  getHistoricoDePagamentosAluno(key){
    console.log(key)
    return new Promise((resolve, reject)=>{
      this.db.database.ref('pagamentos').child('Rondy').once('value', snapshot=>{
        console.log(snapshot.val())
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
}
