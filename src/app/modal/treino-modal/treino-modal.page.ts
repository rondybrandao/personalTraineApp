import { AlunosService } from './../../services/alunos.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { exercicios } from './../../../environments/exercicios';

@Component({
  selector: 'app-treino-modal',
  templateUrl: './treino-modal.page.html',
  styleUrls: ['./treino-modal.page.scss'],
})
export class TreinoModalPage implements OnInit {
  isItemAvailable = false;
  items = [];
  dias:any
  arrayDeExercicioDia = []
  serie:any
  repeticao:any
  newExercicio
  musculos = []
  exercicio = '';
  
  filterData = exercicios.filterData

  newArrayExercicioSegunda = []
  newArrayExercicioTerca = []
  newArrayExercicioQuarta = []
  newArrayExercicioQuinta = []
  newArrayExercicioSexta = []
  newArrayExercicioSabado = []
  
  grupoMuscularSegunda = []
  grupoMuscularTerca = []
  grupoMuscularQuarta = []
  grupoMuscularQuinta = []
  grupoMuscularSexta = []
  grupoMuscularSabado = []
  
  
  
  newMusculo = []
  newMusculoTerca = []
  newMusculoQuarta = []
  newMusculoQuinta = []
  newMusculoSexta = []
  newMusculoSabado = []


  constructor(
    public modalController: ModalController,
    public alunoService: AlunosService,
    public toastController: ToastController
    ) { 
      this.loadPlanoDeTreino()
      this.dias = 'seg'
    }

  ngOnInit() {
    this.initializeItems();
    console.log(this.items)
  }

  initializeItems(){
    this.items = exercicios.filterData
}

  getItems(ev: any) {
      // Reset items back to all of the items
      //this.initializeItems();

      // set val to the value of the searchbar
      const val = ev.target.value;
      
      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
          this.isItemAvailable = true;
          this.items = this.items.filter((item) => {
            return (item.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        } else {
            this.isItemAvailable = false;
        }
  }

  segmentChanged(ev: any) {
    
    const valorSegment = ev.detail.value
    this.dias = valorSegment
    this.musculos = []
    console.log('Segment changed', this.dias);
  }

  addExercicio(membro, exe){
    console.log(exe)
    let obj = {
      exercicio: exe,
      membro: membro,
    }
    this.arrayDeExercicioDia.push(obj)
    this.musculos.push(membro)
    this.exercicio = exe
    this.isItemAvailable = false
    
  }
  
  salvarExercicio(serie, rep){
    switch (this.dias) {
      case 'seg':
        if(this.newArrayExercicioSegunda == undefined){
          this.newArrayExercicioSegunda = []
        }
        let obj = {
          exercicio:this.arrayDeExercicioDia[0].exercicio,
          serie:serie,
          repeticao:rep,
          membro:this.arrayDeExercicioDia[0].membro,
        }
        this.newArrayExercicioSegunda.push(obj)
        break;
      case 'ter':
        if(this.newArrayExercicioTerca == undefined){
          this.newArrayExercicioTerca = []
        }
        let objT = {
          exercicio:this.arrayDeExercicioDia[0].exercicio,
          serie:serie,
          repeticao:rep,
          membro:this.arrayDeExercicioDia[0].membro,
        }
        this.newArrayExercicioTerca.push(objT)
        break;
      case 'qua':
        if(this.newArrayExercicioQuarta == undefined){
          this.newArrayExercicioQuarta = []
        }
        let objQua = {
          exercicio:this.arrayDeExercicioDia[0].exercicio,
          serie:serie,
          repeticao:rep,
          membro:this.arrayDeExercicioDia[0].membro,
        }
        this.newArrayExercicioQuarta.push(objQua)
        break;
      case 'qui':
        if(this.newArrayExercicioQuinta == undefined){
          this.newArrayExercicioQuinta = []
        }
        let objQui = {
          exercicio:this.arrayDeExercicioDia[0].exercicio,
          serie:serie,
          repeticao:rep,
          membro:this.arrayDeExercicioDia[0].membro,
        }
        this.newArrayExercicioQuinta.push(objQui)
        break;
      case 'sex':
        if(this.newArrayExercicioSexta == undefined){
          this.newArrayExercicioSexta = []
        }
        let objSx = {
          exercicio:this.arrayDeExercicioDia[0].exercicio,
          serie:serie,
          repeticao:rep,
          membro:this.arrayDeExercicioDia[0].membro,
        }
        this.newArrayExercicioSexta.push(objSx)
        break;
      case 'sab':
        if(this.newArrayExercicioSabado == undefined){
          this.newArrayExercicioSabado = []
        }
        let objSb = {
          exercicio:this.arrayDeExercicioDia[0].exercicio,
          serie:serie,
          repeticao:rep,
          membro:this.arrayDeExercicioDia[0].membro,
        }
        this.newArrayExercicioSabado.push(objSb)
        break;
    
      default:
        break;
    }
    
    this.exercicio = ''
    this.serie = ''
    this.repeticao = ''
    this.arrayDeExercicioDia = []
    
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  sendSegunda(){
    this.alunoService.sendSegunda(this.newArrayExercicioSegunda).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
    })
  }

  sendTerca(){
    this.alunoService.sendTerca(this.newArrayExercicioTerca).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
    })
  }
  sendQuarta(){
    this.alunoService.sendQuarta(this.newArrayExercicioQuarta).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
    })
  }

  sendQuinta(){
    this.alunoService.sendQuinta(this.newArrayExercicioQuinta).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
    })
  }

  sendSexta(){
    this.alunoService.sendSexta(this.newArrayExercicioSexta).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
    })
  }

  sendSabado(){
    this.alunoService.sendSabado(this.newArrayExercicioSabado).then((res)=>{
      if(res){
        this.toastOK()
      } else {
        this.toastErro()
      }
    })
  }

  loadPlanoDeTreino(){
    this.alunoService.getPlanoDeTreino().then(res=>{

      console.log(res)
      this.newArrayExercicioSegunda = res['segunda']
      this.grupoMuscularSegunda = this.putMusculos2(this.newArrayExercicioSegunda)

      this.newArrayExercicioTerca = res['terca']
      this.grupoMuscularTerca = this.putMusculos2(this.newArrayExercicioTerca)

      this.newArrayExercicioQuarta = res['quarta']
      this.grupoMuscularQuarta = this.putMusculos2(this.newArrayExercicioQuarta)
      
      this.newArrayExercicioQuinta = res['quinta']
      this.grupoMuscularQuinta = this.putMusculos2(this.newArrayExercicioQuinta)

      this.newArrayExercicioSexta = res['sexta']
      this.grupoMuscularSexta = this.putMusculos2(this.newArrayExercicioSexta)

      this.newArrayExercicioSabado = res['sabado']
      this.grupoMuscularSabado = this.putMusculos2(this.newArrayExercicioSabado)

    })
  }

  putMusculos2(arr) {
    if(arr != undefined){
      let temp = []
      arr.forEach(el => {
        temp.push(el.membro)
      });
      const newMusculo = temp.filter(function(este, i) {
        return temp.indexOf(este) === i;
      });
      return newMusculo
    }
  }

  deleteSegunda(arr, item){
    console.log(item, arr.length)
    if(arr.length != 1){
      const newArr = arr.splice(item, 1)
      console.log(newArr)
      this.alunoService.sendSegunda(newArr)
    } else {
      const newArr = arr.splice(item, -1)
      console.log(newArr)
      this.newArrayExercicioSegunda = []
      this.alunoService.sendSegunda(newArr)
    }
    
  }
  deleteTerca(arr, item){
    console.log(item, arr.length)
    const newArr = arr.splice(item, 1)
    console.log(newArr)
    this.alunoService.sendTerca(newArr)
  }

  edit(item){
    console.log(item)
  }

  async toastOK() {
    const toast = await this.toastController.create({
      message: 'Exercicio enviado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  async toastErro() {
    const toast = await this.toastController.create({
      message: 'Exercicio NÂO enviado!',
      duration: 2000
    });
    toast.present();
  }

}
