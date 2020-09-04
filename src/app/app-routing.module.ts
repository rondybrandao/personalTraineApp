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
    path: 'add-despesas-modal',
    loadChildren: () => import('./modal/add-despesas-modal/add-despesas-modal.module').then( m => m.AddDespesasModalPageModule)
  },
  {
    path: 'treino-modal',
    loadChildren: () => import('./modal/treino-modal/treino-modal.module').then( m => m.TreinoModalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
