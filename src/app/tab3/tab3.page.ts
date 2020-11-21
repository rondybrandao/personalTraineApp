import { Component, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { FinanceiroService } from '../services/financeiro.service';
import { BalancoModalPage } from '../modal/balanco-modal/balanco-modal.page';
import { Observable } from 'rxjs';

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
  periodo = []

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

  balanco

  constructor(
    public loadingCtrl: LoadingController,
    public alertController:AlertController,
    public modalController: ModalController,
    public financeiro:FinanceiroService
    
  ) {

    this.getBalanco2()

  }

  ngOnInit() {
    
  }

  addReceita(receita){
    this.financeiro.setReceitas(receita)
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
      console.log(res)
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
            
          case 'agosto':
            console.log('agosto')
            trans[i] = trans[i] + parseFloat(balancoFormatado[0][i].transporte)
            supl[i] = supl[i] + parseFloat(balancoFormatado[0][i].suplementos)
            outr[i] = outr[i] + parseFloat(balancoFormatado[0][i].outros)
            let ago = trans[i] + supl[i] + outr[i]
            const agosto = []
            agosto.push({ago})
        
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
      this.iniciarChart(res)
      this.balancoGeral = res
      this.presentLoading()
    
    })
  }

  iniciarChart(arr){
    var newArr = []
    arr.forEach(e => {
      console.log(e)
      this.receitas.push(parseFloat(e.receita))
      this.despesas.push(parseFloat(e.despesa))
      this.lucro.push(parseFloat(e.lucro))
      this.periodo.push(e.mes)
    });
  }

  editBalanco(item){
    console.log(item)
    this.financeiro.setBalanco(item).then(()=>{this.getBalanco2()})
  }

  async alertEditBalanco(item) {
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
              despesa:res.despesa,
              mes:item.mes
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
          id:'receita',
          placeholder: 'Receita(R$)',
          label:'Receita',
          cssClass: 'specialClass',
          disabled: true,
          attributes: {
            inputmode: 'decimal',
            minlength: 1,
            maxlength: 4,
            autocomplete: 'on',
            disabled: false
          }
        },
        {
          name: 'despesa',
          type: 'number',
          id:'despesa',
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
            console.log(balanco)
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
          name: 'radio4',
          id: 'radio4',
          type: 'radio',
          label: 'Abril',
          value: '04',
        },
        {
          name: 'radio5',
          id: 'radio5',
          type: 'radio',
          label: 'Maio',
          value: '05'
        },
        {
          name: 'radio6',
          id: 'radio6',
          type: 'radio',
          label: 'Junho',
          value: '06'
        },
        {
          name: 'radio7',
          id: 'radio7',
          type: 'radio',
          label: 'Julho',
          value: '07',
        },
        {
          name: 'radio8',
          id: 'radio8',
          type: 'radio',
          label: 'Agosto',
          value: '08'
        },
        {
          name: 'radio9',
          id: 'radio9',
          type: 'radio',
          label: 'Setembro',
          value: '09'
        },
        {
          name: 'radio10',
          id: 'radio10',
          type: 'radio',
          label: 'Outubro',
          value: '10',
        },
        {
          name: 'radio11',
          id: 'radio11',
          type: 'radio',
          label: 'Novembro',
          value: '11'
        },
        {
          name: 'radio12',
          id: 'radio12',
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
    this.financeiro.addBalanco(balanco).then(()=>{
      console.log('addBalanco', this.balancoGeral)
      this.getBalanco2()
    })
    
  }

  calcAcumulado(despesa){
    var total = 0
    despesa.forEach(item => {
      total = total + item
    })
    return total
  }

  formatarBalanco(balanco){
    let arrayMes = []
    arrayMes.push(balanco.junho, balanco.julho, balanco.agosto)
    return arrayMes
  }

  
  async openBalancoModal(){
    const modal = await this.modalController.create({
      component: BalancoModalPage,
      cssClass: 'my-custom-class',
      showBackdrop:false,
      componentProps: {
        'id': 'teste',
      }
    })
    modal.onDidDismiss().then(() => {
      // Run check updates when modal returns
      this.checkForUpdates();
    });
    return await modal.present();
  }

  checkForUpdates(){
    this.balancoGeral = []
    this.receitas = []
    this.despesas = []
    this.lucro = []
    this.periodo = []
    this.getBalanco2()
    // this.financeiro.getBalanco2().then((res:any[])=>{
    //   this.balancoGeral = res
    //   this.presentLoading()
    // })
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando Graficos',
      duration: 3000
    });
    await loading.present().then(() => {
      // this.totalReceita = this.calcAcumulado(this.receitas)
      // this.totalDespesa = this.calcAcumulado(this.despesas)
      // this.totalLucro = this.calcAcumulado(this.lucro)
      // this.balancoGeral.forEach(item => {
      //   this.receitas.push(item.receita)
      //   this.despesas.push(item.despesa)
      //   this.lucro.push(item.lucro)
      //   this.periodo.push(item.mes)
      // })
      this.showBarBalanco()
    })
  }

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
        labels: this.periodo,
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
