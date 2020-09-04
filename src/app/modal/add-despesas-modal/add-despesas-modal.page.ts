import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-despesas-modal',
  templateUrl: './add-despesas-modal.page.html',
  styleUrls: ['./add-despesas-modal.page.scss'],
})
export class AddDespesasModalPage implements OnInit {
  customAlertOptions: any = {
    header: 'Pizza Toppings',
    subHeader: 'Select your toppings',
    message: '$1.00 per topping',
    translucent: true
  };


  constructor() { }

  ngOnInit() {
  }

}
