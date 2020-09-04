import { AddDespesasModalPage } from './../modal/add-despesas-modal/add-despesas-modal.page';
import { Component, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { FinanceiroService } from '../services/financeiro.service';

//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('chartLineLucro') chartLineLucro: ElementRef
  @ViewChild('chartDoughnutLucroMes') chartDoughnutLucroMes: ElementRef
  @ViewChild('chartPieDespesasDoMes') chartPieDespesasDoMes: ElementRef
  @ViewChild('lineDespesas') lineDespesas: ElementRef
  @ViewChild('barBalanco') barBalanco: ElementRef

  lineChartLucro: Chart;
  doughnuLucroMes: Chart;
  pieChartDespesasDoMes: Chart
  lineChartDespesas: Chart
  barChartBalanco: Chart

  receitas = []
  despesas = []
  lucro = []

  totalReceita
  totalDespesa
  totalLucro

  transporte = []
  suplementos = []
  outros = []
  chartLabel = []
  balancoChartLabel = []
  balancoChart = []
  balancoGeral = []

  balanco = [
    { tipo: 'despesa', valor: 201, mes:'junho' },
    { tipo: 'receita', valor: 2001, mes:'junho' },
    { tipo: 'despesa', valor: 301, mes:'julho' },
    { tipo: 'receita', valor: 2001, mes:'julho' },
    { tipo: 'despesa', valor: 261, mes:'agosto' },
    { tipo: 'receita', valor: 2261, mes:'agosto' },
  ];

  constructor(
    public loadingCtrl: LoadingController,
    public alertController:AlertController,
    public modalController: ModalController,
    public financeiro:FinanceiroService
    //public dialog: MatDialog
  ) {
    //this.getDataFinanceiro()
    //this.getReceitas()
    //this.getBalancao()
    this.getBalanco2()
    
  }

  ngOnInit() {
    //this.presentLoading()
  }

  async presentAlertAddDespesas() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: [
        
        {
          name: 'radio1',
          id: 'radio1',
          type: 'radio',
          label: 'Transporte',
          value: 'transporte',
        },
        {
          name: 'radio2',
          id: 'radio2',
          type: 'radio',
          label: 'Suplementos',
          value: 'suplemento'
        },
        {
          name: 'radio3',
          id: 'radio3',
          type: 'radio',
          label: 'Outros',
          value: 'outros'
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (categoria) => {
            console.log('Confirm adicionar', categoria);
            this.presentAlertPromptAddDespesas(categoria)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptAddDespesas(categoria) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Despesa',
      subHeader: categoria,
      inputs: [
        {
          name: 'valor',
          type: 'number',
          id:'tipo3',
          placeholder: 'Valor(R$)',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (res) => {
            console.log('Confirm Ok', res, categoria);
            let despesa = {
              categoria:categoria,
              valor:res.valor
            }
            this.addDespesas(despesa)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertAddPromptReceita(categoria) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Receita',
      inputs: [
        {
          name:'descricao',
          type:'text',
          placeholder:'Descrição'
        },
        {
          name: 'valor',
          type: 'number',
          id:'tipo3',
          placeholder: 'Valor(R$)',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (rec) => {
            console.log('Confirm Ok', rec);
            this.addReceita(rec)
          }
        }
      ]
    });

    await alert.present();
  }

  addReceita(receita){
    this.financeiro.setReceitas(receita)
  }

  addDespesas(despesa){
    //this.financeiro.setDespesas2(despesa)
  }

  getFinanceiro(){
    this.financeiro.getFinanceiro().then(res=>{
      console.log(res)
      let array = []
      array.push(res)
      array.forEach(e => {
        console.log(e)
        e.forEach(el => {
          console.log(el)
          this.transporte.push(el[0].transporte)
          this.suplementos.push(el[0].suplementos)
          this.outros.push(el[0].outros)
        });
      });
      
    })
  }

  getDataFinanceiro(){
    const label = []
    this.financeiro.getDataFinanceiro().then((res:any[]) =>{
      label.push(Object.keys(res[0]))
      var convertida = res.map(function(obj) {
        return Object.keys(obj).map(function(chave) {
          return obj[chave];
        });
      })
      console.log(convertida)
      this.chartLabel = label
      this.plotarDespesas(convertida[0])
      this.plotarReceitas(convertida[1])
      this.presentLoading()
      
    })
  }

  plotarDespesas(despesas){
    console.log(despesas)
    despesas.forEach(e => {
      this.transporte.push(e.transporte)
      this.suplementos.push(e.suplementos)
      this.outros.push(e.outros)
    })
  }

  plotarReceitas(receita){
    const receitaArray = receita.map(function(obj) {
      return Object.keys(obj).map(function(chave) {
        return obj[chave]
      })
    })
    console.log(receitaArray[0])
    for (let i=0; i < receitaArray[0].length; i++){
      this.receitas.push(receitaArray[0][i].valor) 
    }
    console.log(this.receitas)
  }

  getReceitas(){
    this.financeiro.getReceita().then(res => {
      console.log(res)
      
    })
  }

  getBalancao(){
    let trans:any[] = []
    let outr:any[] = []
    let supl:any[] = []
    var julho = []
    this.financeiro.getBalanco().then((res:any[]) => {
      var balancoFormatado = res.map(function(obj) {
        return Object.keys(obj).map(function(chave) {
          return obj[chave];
        });
      })
      console.log(balancoFormatado)
      for(let i = 0; i <= balancoFormatado.length; i++){
        switch (balancoFormatado[0][i].mes) {
          case 'julho':
            trans[i] = 0
            supl[i] = 0
            outr[i] = 0
            trans[i] = parseFloat(trans[i]) + parseFloat(balancoFormatado[0][i].transporte)
            supl[i] = parseFloat(supl[i]) + parseFloat(balancoFormatado[0][i].suplementos)
            outr[i] = parseFloat(outr[i]) + parseFloat(balancoFormatado[0][i].outros)
            let jul = trans[i] + supl[i] + outr[i]
            
            julho.push({jul})
            console.log(jul)
            

          case 'agosto':
            console.log('agosto')
            trans[i] = trans[i] + parseFloat(balancoFormatado[0][i].transporte)
            supl[i] = supl[i] + parseFloat(balancoFormatado[0][i].suplementos)
            outr[i] = outr[i] + parseFloat(balancoFormatado[0][i].outros)
            let ago = trans[i] + supl[i] + outr[i]
            const agosto = []
            agosto.push({ago})
            console.log(agosto)
              
        
          default:
            break;
        }
      }

      this.balancoChart.push(julho)
    
      
    })
    
  }

  getBalanco2(){
    
    this.financeiro.getBalanco2().then((res:any[])=>{
      console.log(res)
      this.balancoGeral = res
      this.balancoGeral.forEach(item => {
        this.receitas.push(item.receita)
        this.despesas.push(item.despesa)
        this.lucro.push(item.lucro)
      })
      this.totalReceita = this.calcAcumulado(this.receitas)
      this.totalDespesa = this.calcAcumulado(this.despesas)
      this.totalLucro = this.calcAcumulado(this.lucro)
      this.presentLoading()
    })
  }

  editBalanco(item){
    console.log(item)
    this.financeiro.setBalanco(item)
  }

  async alertBalanco(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Despesa',
      subHeader: item.mes,
      inputs: [
        {
          name: 'receita',
          type: 'number',
          id:'tipo3',
          placeholder: 'Valor(R$)',
          value:item.receita,
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        },
        {
          name: 'despesa',
          type: 'number',
          id:'tipo3',
          placeholder: 'Valor(R$)',
          value:item.despesa,
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (res) => {
            console.log('Confirm Ok', res);
            let balanco = {
              receita:res.receita,
              despesa:res.despesa
            }
            this.editBalanco(balanco)
          }
        }
      ]
    });

    await alert.present();
  }


  async alertAddBalanco2(mes) {
    const mesRef = this.mesFomatado(mes)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: mesRef,
      
      inputs: [
        {
          name: 'receita',
          type: 'number',
          id:'tipo3',
          placeholder: 'Receita(R$)',
          label:'Receita',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        },
        {
          name: 'despesa',
          type: 'number',
          id:'tipo3',
          placeholder: 'Despesa(R$)',
          label:'Despesa',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (res) => {
            console.log('Confirm Ok', res);
            let balanco = {
              receita:res.receita,
              despesa:res.despesa,
              mes:mes,
              mesRef:mesRef
            }
            this.addBalanco(balanco)
          }
        }
      ]
    });

    await alert.present();
  }

  async alertAddBalanco(mes) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Despesa',
      //subHeader: categoria,
      inputs: [
        {
          name: 'valor',
          type: 'number',
          id:'tipo3',
          placeholder: 'Valor(R$)',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (res) => {
            console.log('Confirm Ok', res);
            let balanco = {
              mes:mes,
              valor:res.valor
            }
            this.addBalanco(balanco)
          }
        }
      ]
    });

    await alert.present();
  }

  async alertMes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mes de referência',
      inputs: [
        
        {
          name: 'radio1',
          id: 'radio1',
          type: 'radio',
          label: 'Janeiro',
          value: '01',
        },
        {
          name: 'radio2',
          id: 'radio2',
          type: 'radio',
          label: 'Fevereiro',
          value: '02'
        },
        {
          name: 'radio3',
          id: 'radio3',
          type: 'radio',
          label: 'Março',
          value: '03'
        },
        {
          name: 'radio1',
          id: 'radio1',
          type: 'radio',
          label: 'Abril',
          value: '04',
        },
        {
          name: 'radio2',
          id: 'radio2',
          type: 'radio',
          label: 'Maio',
          value: '05'
        },
        {
          name: 'radio3',
          id: 'radio3',
          type: 'radio',
          label: 'Junho',
          value: '06'
        },
        {
          name: 'radio1',
          id: 'radio1',
          type: 'radio',
          label: 'Julho',
          value: '07',
        },
        {
          name: 'radio2',
          id: 'radio2',
          type: 'radio',
          label: 'Agosto',
          value: '07'
        },
        {
          name: 'radio3',
          id: 'radio3',
          type: 'radio',
          label: 'Setembro',
          value: '09'
        },
        {
          name: 'radio1',
          id: 'radio1',
          type: 'radio',
          label: 'Outubro',
          value: '10',
        },
        {
          name: 'radio2',
          id: 'radio2',
          type: 'radio',
          label: 'Novembro',
          value: '11'
        },
        {
          name: 'Dezembro',
          id: 'radio3',
          type: 'radio',
          label: 'Dezembro',
          value: '12'
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (mes) => {
            console.log('Confirm adicionar', mes, name);
            this.alertAddBalanco2(mes)
          }
        }
      ]
    });

    await alert.present();
  }

  mesFomatado(mes){
    switch (mes) {
      case '01':
        return 'Janeiro'
        break;
      case '02':
        return 'Fevereiro'
        break;
      case '03':
        return 'Março'
        break;
      case '04':
        return 'Abril'
        break;
      case '05':
        return 'Maio'
        break;
      case '06':
        return 'Junho'
        break;
      case '07':
        return 'Julho'
        break;
      case '08':
        return 'Agosto'
        break;
      case '09':
        return 'Setembro'
        break;
      case '10':
        return 'Outubro'
        break;
      case '11':
        return 'Novembro'
        break;
      case '12':
        return 'Dezembro'
        break;
    }
  }

  addBalanco(balanco){
    this.financeiro.addBalanco(balanco)
  }

  calcAcumulado(despesa){
    var total = 0
    despesa.forEach(item => {
      total = total + item
    })
    return total
  }

  getBalanco3(){
    console.log(this.balanco)
    function agruparPor(objetoArray, propriedade) {
      return objetoArray.reduce(function (acc, obj) {
        let key = obj[propriedade];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    const grupodePessoas = agruparPor(this.balanco, 'mes');
    console.log(grupodePessoas)
    const arrayBancoFormatado = this.formatarBalanco(grupodePessoas)
    console.log(arrayBancoFormatado)
    //this.calcularBalanco(arrayBancoFormatado)
  }

  formatarBalanco(balanco){
    let arrayMes = []
    arrayMes.push(balanco.junho, balanco.julho, balanco.agosto)
    return arrayMes
  }
  
  editarBalanco(mes){

  }


  async addDespesasModal(){
    const modal = await this.modalController.create({
      component: AddDespesasModalPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando Graficos',
      duration: 3000
    });
    await loading.present().then(() => {
      //this.showDoughnutLucroMes()
      this.showBarBalanco()
      //this.showPieDespesasDoMes()
      //this.showLineLucro()
      //this.showLineDespesas()
    })
  }
//   showLineLucro(){
//     this.lineChartLucro = new Chart(this.chartLineLucro.nativeElement, {
//       type: 'line',
//       data: {
//           labels: ['jul', 'ago'],
//           //labels: this.datas,
//           datasets: [
//                 {
//                   label: "Receita",
//                   fill: false,
//                   lineTension: 0.1,
//                   backgroundColor: "rgba(75,192,192,0.4)",
//                   borderColor: "rgba(182, 46, 235, 1.0)",
//                   borderCapStyle: 'butt',
//                   borderDash: [],
//                   borderDashOffset: 0.0,
//                   borderJoinStyle: 'miter',
//                   pointBorderColor: "rgba(75,192,192,1)",
//                   pointBackgroundColor: "#fff",
//                   pointBorderWidth: 1,
//                   pointHoverRadius: 5,
//                   pointHoverBackgroundColor: "rgba(35,132,122,2)",
//                   pointHoverBorderColor: "rgba(220,220,220,1)",
//                   pointHoverBorderWidth: 2,
//                   pointRadius: 1,
//                   pointHitRadius: 10,
//                   //data: this.arrayTristeza,
//                   data: this.receitas,
//                   spanGaps: false,
//               },
//               {
//                 label: "Despesas",
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: "rgba(231, 83, 50, 1.0)",
//                 //borderColor: "rgba(75,192,192,1)",
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 //pointBorderColor: "rgba(75,192,192,1)",
//                 //pointBackgroundColor: "#fff",
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 //pointHoverBackgroundColor: "rgba(35,132,122,2)",
//                 //pointHoverBorderColor: "rgba(220,220,220,1)",
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 //data: this.arrayTristeza,
//                 data: this.despesas,
//                 spanGaps: false,
//             },
//             {
//               label: "Lucro",
//               fill: false,
//               lineTension: 0.1,
//               backgroundColor: "rgba(0, 0, 0, 1.0)",
//               borderColor: "rgba(75,192,192,1)",
//               borderCapStyle: 'butt',
//               borderDash: [],
//               borderDashOffset: 0.0,
//               borderJoinStyle: 'miter',
//               pointBorderColor: "rgba(75,192,192,1)",
//               pointBackgroundColor: "#fff",
//               pointBorderWidth: 1,
//               pointHoverRadius: 5,
//               pointHoverBackgroundColor: "rgba(35,132,122,2)",
//               pointHoverBorderColor: "rgba(220,220,220,1)",
//               pointHoverBorderWidth: 2,
//               pointRadius: 1,
//               pointHitRadius: 10,
//               //data: this.arrayTristeza,
//               data: this.lucro,
//               spanGaps: false,
//           },
//           ]
//       },
//       options: {
// 				scales: {
// 					xAxes: [{
	
// 						ticks: {
// 							source: 'labels'
// 						}
// 					}],
// 					yAxes: [{
// 						ticks: {
// 							userCallback: function(tick) {
// 								return 'R$' + tick.toString() + ',00';
// 							}
// 						},

// 					}]
// 				}
// 			}

//   });
// }
  showDoughnutLucroMes(){
  this.doughnuLucroMes = new Chart(this.chartDoughnutLucroMes.nativeElement, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [this.totalReceita, this.totalDespesa, this.totalLucro
        ],
        backgroundColor: [
          'rgba(182, 46, 235, 1.0)',
          'rgba(231, 83, 50, 1.0)',
          'rgba(0, 0, 0, 1.0)'
        ],
        label: 'Despesas acumuladas'
      }],
      labels: [
        'Receitas',
        'Despesas',
        'Lucro'
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '2020',
        position: 'bottom'
      },
      animation: {
        //animateScale: true,
        animateRotate: true
      }
    }
  });
}
//   showPieDespesasDoMes(){
//   this.pieChartDespesasDoMes = new Chart(this.chartPieDespesasDoMes.nativeElement, {
//     type: 'pie',
//     data: {
//       datasets: [{
//         data: [8,4,6,8,4,5,3
//         ],
//         backgroundColor: [
//           'rgba(156, 195, 20, 1.0)',
//           'rgba(176, 71, 33, 1.0)',
//           'rgba(182, 46, 235, 1.0)',
//           'rgba(47, 198, 67, 1.0)',
//           'rgba(81, 46, 34, 1.0)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 25, 0, 0.1)'
//       ],
//         label: 'Dataset 1'
//       }],
//       labels: [
//         'energia',
//         'esgoto',
//         'aluguel',
//         'agua',
//         'outros',
//         'limpeza',
//         'RH'
//       ]
//     },
//     options: {
//       responsive: true
//     }
//   });
// }

  showLineDespesas(){
  this.lineChartDespesas = new Chart(this.lineDespesas.nativeElement, {

    type: 'line',
    data: {
        labels: this.chartLabel,
        //labels: this.datas,
        datasets: [
            {
                label: "Transporte",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                //data:this.arrayRaiva,
                data: this.transporte,
                spanGaps: false,
            },
            {
              label: "Suplementos",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(35,132,122,2)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                //data: this.arrayTristeza,
                data: this.suplementos,
                spanGaps: false,
            },
            {
              label: "Outros",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(156, 195, 20, 1.0)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(35,132,122,2)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.outros,
                spanGaps: false,
            },
           
        ]
      }

  });

}

showBarBalanco(){
  this.barChartBalanco = new Chart(this.barBalanco.nativeElement, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev'],
        datasets: [
            {
              label: "Despesas",
              backgroundColor: "rgb(255,0,0)",
              data: this.despesas,
          },
          {
            label: "Lucro",
            backgroundColor: "rgb(0,128,0)",
            data: this.lucro,
        },
        ]
    },
    options: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            source: 'labels'
          }
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            userCallback: function(tick) {
              return 'R$' + tick.toString();
            }
          },

        }]
      }
    }

});
}

}
