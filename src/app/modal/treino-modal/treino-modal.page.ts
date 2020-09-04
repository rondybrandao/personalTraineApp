import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treino-modal',
  templateUrl: './treino-modal.page.html',
  styleUrls: ['./treino-modal.page.scss'],
})
export class TreinoModalPage implements OnInit {
  isItemAvailable = false;
  items = [];

  term = '';
  filterData = [
    {
        membro:'Peito',
        exercicio:'Supino reto'
      },
      {
        membro:'Peito',
        exercicio:'Rosca'
      },
      {
        membro:'Costa',
        exercicio:'Remada vertical'
      }
  ]

  constructor() { }

  ngOnInit() {
  }

  initializeItems(){
    this.items = [
      {
        membro:'Peito',
        exercicio:'Supino reto'
      },
      {
        membro:'Peito',
        exercicio:'Rosca'
      },
      {
        membro:'Costa',
        exercicio:'Remada vertical'
      }
    ];
}

getItems(ev: any) {
    // Reset items back to all of the items
this.initializeItems();

    // set val to the value of the searchbar
const val = ev.target.value;

    // if the value is an empty string don't filter the items
if (val && val.trim() !== '') {
    this.isItemAvailable = true;
    this.items = this.items.filter((item) => {
      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
  } else {
      this.isItemAvailable = false;
  }
}

}
