import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'aluno-modal',
    loadChildren: () => import('./modal/aluno-modal/aluno-modal.module').then( m => m.AlunoModalPageModule)
  },
  {
    path: 'mensalidade-modal',
    loadChildren: () => import('./modal/mensalidade-modal/mensalidade-modal.module').then( m => m.MensalidadeModalPageModule)
  },
  {
    path: 'registro-aluno-modal',
    loadChildren: () => import('./modal/registro-aluno-modal/registro-aluno-modal.module').then( m => m.RegistroAlunoModalPageModule)
  },
  {
    path: 'avaliacao-modal',
    loadChildren: () => import('./modal/avaliacao-modal/avaliacao-modal.module').then( m => m.AvaliacaoModalPageModule)
  },

  {
    path: 'treino-modal',
    loadChildren: () => import('./modal/treino-modal/treino-modal.module').then( m => m.TreinoModalPageModule)
  },
 
  {
    path: 'balanco-modal',
    loadChildren: () => import('./modal/balanco-modal/balanco-modal.module').then( m => m.BalancoModalPageModule)
  },
  {
    path: 'pagamento-mensalidade',
    loadChildren: () => import('./modal/pagamento-mensalidade/pagamento-mensalidade.module').then( m => m.PagamentoMensalidadePageModule)
  },
  {
    path: 'edit-mensalidade',
    loadChildren: () => import('./modal/edit-mensalidade/edit-mensalidade.module').then( m => m.EditMensalidadePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
