import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'companies',
    pathMatch: 'full'
  },
  {
    path: 'companies',
    loadChildren: './pages/companies/companies.module#CompaniesPageModule'//() => import('./pages/companies/companies.module').then( m => m.CompaniesPageModule)
  },
  {
    path: 'tasks',
    loadChildren: './pages/tasks/tasks.module#TasksPageModule'//() => import('./pages/tasks/tasks.module').then( m => m.TasksPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
