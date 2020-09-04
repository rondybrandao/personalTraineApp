import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoModalPage } from './treino-modal.page';

//search
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: TreinoModalPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    //Ng2SearchPipeModule
    
  ],
  declarations: [Ng2SearchPipeModule],
  exports: [RouterModule, Ng2SearchPipeModule],
})
export class TreinoModalPageRoutingModule {}
