import { AvaliacaoService } from './../../services/avaliacao.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import {MatAccordion} from '@angular/material/expansion';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-aluno-modal',
  templateUrl: './aluno-modal.page.html',
  styleUrls: ['./aluno-modal.page.scss'],
})
export class AlunoModalPage implements OnInit {
  @ViewChild('chartLineTorax') chartLineTorax:  ElementRef
  @ViewChild('chartLineSuperior') chartLineSuperior:  ElementRef
  @ViewChild('chartLineInferiores') chartLineInferiores:  ElementRef
  @ViewChild('chartBarPeso') chartBarPeso: ElementRef
  //@ViewChild('chartLineDobrasCutaneas') chartLineDobrasCutaneas: ElementRef
  @ViewChild('chartBarIndices') chartBarIndices: ElementRef

  @ViewChild('MatAccordion') accordion: MatAccordion;

  //chart variaveis
  doughnuBody: Chart;
  lineTorax: Chart;
  lineSuperior: Chart;
  lineInferiores: Chart;
  lineDobrasCutaneas
  radarChart: Chart;
  barChartPeso: Chart;
  chartBarIndicesGorduraMassa:Chart


  //peso chart
  pesoChart = []  
  //variaveis sem chart
  pesoData: any
  IMC: any 
  gordura: any
  gorduraVData: any
  tmbData: any
  massa_magraData: any

  //membro superiores variaveis
  bodyData = []
  ombrosData = []
  toraxData = []
  cinturaData = []
  abdominalData = []
  quadrilData = []

  //membros inferiores
  coxaSuperiorData = []
  coxaMediaData = []
  coxaInferiorData = []
  pernaData = []

  //periodo de treino
  chartRadarBody = []
  braco: number
  costa: number
  abdomen: number
  gluteo: number
  perna: number
  cardio: number

  dicas
  titulo
  
  @Input() imgAvatar: string;
  @Input() key: string;
  @Input() nomeDoAluno: string;
  @Input() ocupacao: string;

  constructor(
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public avaliacaoService: AvaliacaoService) {}

  ngOnInit() {
    console.log(this.nomeDoAluno)
    this.getDataBody()
    this.presentLoading()
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  getDataBody(){
    console.log(this.nomeDoAluno)
    this.avaliacaoService.getDataBody(this.key)
      .then((result:any[]) => {
        console.log(result)
        result.forEach(element => {
          //variaveis top
          this.pesoData = element.peso +' kg'
          this.IMC = element.imc
          this.gordura = element.gordura + '%'
          //variaveis body
          this.ombrosData.push(element.ombro)
          this.toraxData.push(element.torax)
          this.cinturaData.push(element.cintura)
          this.abdominalData.push(element.abdominal)
          this.quadrilData.push(element.quadril)
          //variaveis membros inferiores
          this.coxaSuperiorData.push(element.coxa_superior)
          this.coxaMediaData.push(element.coxa_media)
          this.coxaInferiorData.push(element.coxa_inferior)
          this.pernaData.push(element.perna)
          //peso
          this.pesoChart.push(element.peso)
        });
        console.log(this.ombrosData)
      })
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando Graficos',
      duration: 3000
    });
    await loading.present().then(() => {
      //this.showDoughnutBody();
      
      this.showLineTorax();
      this.showLineMembrosSuperiores()
      this.showLineInferiores();
      //this.showLineDobrasCutaneas()
      //this.showChartRadar();
      this.showBarChartPeso()
      this.showChartBarIndicesDeGordura()
    })
  }

  showLineTorax(){
    
    this.lineTorax = new Chart(this.chartLineTorax.nativeElement, {
 
      type: 'line',
      data: {
          labels: ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          //labels: this.datas,
          datasets: [
            {
              label: "Busto",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(102,0,153,1)",
              borderColor: "rgba(102,0,153,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(102,0,153,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(102,0,153,1)",
              pointHoverBorderColor: "rgba(102,0,153,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              //data: this.ombrosData,
              data: [92.5, 94.0, 92.0, 94.0, 93.5, 96.0],
              spanGaps: false,
          },

              {
                  label: "Abdômen",
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
                  data: this.toraxData,

                  spanGaps: false,
              },
              {
                label: "Cintura",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,0,1)",
                borderColor: "rgba(255,0,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255,0,0,1)",
                pointHoverBorderColor: "rgba(255,0,0,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [72.5, 84.0, 62.0, 54.0, 63.5, 86.0],
                //data: this.cinturaData,
                spanGaps: false,
            },
            {
              label: "Quadril",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(255,102,0,1)",
              borderColor: "rgba(255,102,0,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(255,102,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(255,102,0,1)",
              pointHoverBorderColor: "rgba(255,102,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              //data: this.arrayTristeza,
              //data: this.abdominalData,
              data: [50.5, 65.0, 78.0, 85.0, 75.5, 86.0],
              spanGaps: false,
            }
          ]
      },
      options: {
				scales: {
					xAxes: [{
	
						ticks: {
							source: 'labels'
						}
					}],
					yAxes: [{
						ticks: {
							userCallback: function(tick) {
								return tick.toString() + 'cm';
							}
						},

					}]
				}
			}

  });
}

showLineMembrosSuperiores(){
    
  this.lineSuperior = new Chart(this.chartLineSuperior.nativeElement, {

    type: 'line',
    data: {
        labels: ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        //labels: this.datas,
        datasets: [
          {
            label: "Braço direito",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(102,0,153,1)",
            borderColor: "rgba(102,0,153,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(102,0,153,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(102,0,153,1)",
            pointHoverBorderColor: "rgba(102,0,153,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            //data: this.ombrosData,
            data: [50.5, 65.0, 78.0, 85.0, 75.5, 86.0],
            spanGaps: false,
        },

            {
                label: "Braço esquedo",
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
                data: [60.5, 75.0, 88.0, 85.0, 55.5, 66.0],
                //data: this.toraxData,
                spanGaps: false,
            },
            {
              label: "Antebraço direito",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(255,0,0,1)",
              borderColor: "rgba(255,0,0,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(255,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(255,0,0,1)",
              pointHoverBorderColor: "rgba(255,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [70.5, 85.0, 98.0, 85.0, 75.5, 86.0],
              //data: this.cinturaData,
              spanGaps: false,
          },
          {
            label: "Antebraço esquerdo",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255,102,0,1)",
            borderColor: "rgba(255,102,0,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(255,102,0,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,102,0,1)",
            pointHoverBorderColor: "rgba(255,102,0,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [50.5, 95.0, 88.0, 65.0, 85.5, 76.0],
            //data: this.abdominalData,
            spanGaps: false,
          }
        ]
    },
    options: {
      scales: {
        xAxes: [{

          ticks: {
            source: 'labels'
          }
        }],
        yAxes: [{
          ticks: {
            userCallback: function(tick) {
              return tick.toString() + 'cm';
            }
          },

        }]
      }
    }

});
}

showLineInferiores(){
  this.lineInferiores = new Chart(this.chartLineInferiores.nativeElement, {

    type: 'line',
    data: {
        labels: ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        //labels: this.datas,
        datasets: [
          {
            label: "Coxa direita",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(102,0,153,1)",
            borderColor: "rgba(102,0,153,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(102,0,153,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(102,0,153,1)",
            pointHoverBorderColor: "rgba(102,0,153,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [50.5, 95.0, 88.0, 65.0, 85.5, 76.0],
            //data: this.coxaSuperiorData,
            spanGaps: false,
          },

            {
                label: "Coxa esquerda",
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
                data: this.coxaMediaData,
                spanGaps: false,
            },
            {
              label: "Panturrilha direita",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(255,0,0,1)",
              borderColor: "rgba(255,0,0,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(255,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(255,0,0,1)",
              pointHoverBorderColor: "rgba(255,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [70.5, 85.0, 98.0, 85.0, 75.5, 76.0],
              //data: this.coxaInferiorData,
              spanGaps: false,
          },
          {
            label: "Panturrilha esquerda",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255,102,0,1)",
            borderColor: "rgba(255,102,0,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(255,102,0,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,102,0,1)",
            pointHoverBorderColor: "rgba(255,102,0,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [80.5, 75.0, 75.9, 85.0, 73.5, 79.0],
            //data: this.pernaData,
            spanGaps: false,
          },
        ]
    },
    options: {
      scales: {
        xAxes: [{

          ticks: {
            source: 'labels'
          }
        }],
        yAxes: [{
          ticks: {
            userCallback: function(tick) {
              return tick.toString() + 'cm';
            }
          },
        }]
      }
    }
    });
  }

//   showLineDobrasCutaneas(){
    
//     this.lineDobrasCutaneas = new Chart(this.chartLineDobrasCutaneas.nativeElement, {
 
//       type: 'line',
//       data: {
//           labels: ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
//           //labels: this.datas,
//           datasets: [
//             {
//               label: "Busto",
//               fill: false,
//               lineTension: 0.1,
//               backgroundColor: "rgba(102,0,153,1)",
//               borderColor: "rgba(102,0,153,1)",
//               borderCapStyle: 'butt',
//               borderDash: [],
//               borderDashOffset: 0.0,
//               borderJoinStyle: 'miter',
//               pointBorderColor: "rgba(102,0,153,1)",
//               pointBackgroundColor: "#fff",
//               pointBorderWidth: 1,
//               pointHoverRadius: 5,
//               pointHoverBackgroundColor: "rgba(102,0,153,1)",
//               pointHoverBorderColor: "rgba(102,0,153,1)",
//               pointHoverBorderWidth: 2,
//               pointRadius: 1,
//               pointHitRadius: 10,
//               //data: this.ombrosData,
//               data: [92.5, 94.0, 92.0, 94.0, 93.5, 96.0],
//               spanGaps: false,
//           },

//               {
//                   label: "Abdômen",
//                   fill: false,
//                   lineTension: 0.1,
//                   backgroundColor: "rgba(75,192,192,0.4)",
//                   borderColor: "rgba(75,192,192,1)",
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
//                   data: this.toraxData,

//                   spanGaps: false,
//               },
//               {
//                 label: "Cintura",
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: "rgba(255,0,0,1)",
//                 borderColor: "rgba(255,0,0,1)",
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: "rgba(255,0,0,1)",
//                 pointBackgroundColor: "#fff",
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: "rgba(255,0,0,1)",
//                 pointHoverBorderColor: "rgba(255,0,0,1)",
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 data: [72.5, 84.0, 62.0, 54.0, 63.5, 86.0],
//                 //data: this.cinturaData,
//                 spanGaps: false,
//             },
//             {
//               label: "Quadril",
//               fill: false,
//               lineTension: 0.1,
//               backgroundColor: "rgba(255,102,0,1)",
//               borderColor: "rgba(255,102,0,1)",
//               borderCapStyle: 'butt',
//               borderDash: [],
//               borderDashOffset: 0.0,
//               borderJoinStyle: 'miter',
//               pointBorderColor: "rgba(255,102,0,1)",
//               pointBackgroundColor: "#fff",
//               pointBorderWidth: 1,
//               pointHoverRadius: 5,
//               pointHoverBackgroundColor: "rgba(255,102,0,1)",
//               pointHoverBorderColor: "rgba(255,102,0,1)",
//               pointHoverBorderWidth: 2,
//               pointRadius: 1,
//               pointHitRadius: 10,
//               //data: this.arrayTristeza,
//               //data: this.abdominalData,
//               data: [50.5, 65.0, 78.0, 85.0, 75.5, 86.0],
//               spanGaps: false,
//             }
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
// 								return tick.toString() + 'cm';
// 							}
// 						},

// 					}]
// 				}
// 			}

//   });
// }

  showBarChartPeso(){
    //var MONTHS = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
		var horizontalBarChartData = {
			labels: ['Agosto', 'setembro'],
			datasets: [{
				label: 'Peso (kg)',
				backgroundColor: 'rgba(182, 46, 235, 1.0)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
				data: this.pesoChart
      }
    ]
		};
		this.barChartPeso = new Chart(this.chartBarPeso.nativeElement, {
				type: 'bar',
				data: horizontalBarChartData,
				options: {
					elements: {
						rectangle: {
							borderWidth: 2,
						}
					},
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: false,
						//text: 'Predias x Materiais '
          },
          scales: {
            
            yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 40,
                        //steps: 10,
                        //stepValue: 5,
                        //max: 100
                    }
                }]
          },
				}
			});
    }

    showChartBarIndicesDeGordura(){
      var horizontalBarChartData = {
        labels: ['Junho', 'Julho', 'Agosto', 'setembro', 'outubro', 'setembro'],
        datasets: [{
          label: 'MCM',
          backgroundColor: 'rgba(182, 46, 235, 1.0)',
          data: [50.5, 65.0, 78.0, 85.0, 75.5, 86.0]
        },
        {
          label: 'Gordura',
          backgroundColor:'rgba(70, 132, 35, 1)',
          data: [52.5, 65.0, 78.0, 85.0, 75.5, 86.0]
        },
        {
          label: 'IMC',
          backgroundColor: 'rgba(182, 46, 235, 1.0)',
          data: [21.5, 20.0, 24.0, 26.0, 25.0, 23.0]
        }]
      };
      this.chartBarIndicesGorduraMassa = new Chart(this.chartBarIndices.nativeElement, {
          type: 'bar',
          data: horizontalBarChartData,
          options: {
            title: {
              display: true,
              text: 'Indices de Gordura'
            },
            tooltips: {
              mode: 'index',
              intersect: false
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            }
          }
        });
      }

}
