import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { TextFilterPipe } from '../../pipe/text-filter.pipe';
import { SortPipe } from '../../pipe/sort.pipe';

@NgModule({
  declarations: [
    ListComponent,
    TextFilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListRoutingModule
  ]
})
export class ListModule { }
