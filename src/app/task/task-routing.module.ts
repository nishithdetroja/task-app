import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '', component: TaskComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
      { path: 'detail/:type/:id', loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule) },
      { path: 'board', loadChildren: () => import('./board/board.module').then(m => m.BoardModule) },
      { path: '**', pathMatch: 'full', redirectTo: 'list' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
