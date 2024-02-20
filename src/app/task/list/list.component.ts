import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Task } from '../../interface/task';
import moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  listData!: Task[];
  searchString!: string;
  sort = {
    field: 'title',
    type: 'asc'
  }

  constructor(
    private router: Router,
    private taskService: TaskService) {
  }

  ngOnInit() {
    this.getTaskData();
  }

  navigateToDetail(id: any) {
    const formType = id === 0 ? 'add' : 'edit';
    this.router.navigate([`task/detail/${formType}/${id}`]);
  }

  navigateToView(id: number) {
    this.router.navigate([`task/detail/view/${id}`]);
  }

  navigateToBoard() {
    this.router.navigate([`task/board`]);
  }

  getTaskData() {
    this.taskService.getAll().subscribe((res) => {
      this.listData = res.data.map((element: any) => {
        return { ...element, dueDate: moment(element.dueDate).format('DD/MM/YYYY') };
      });;
    });
  }

  onChangeStatus(event: any, taskId: any) {
    this.taskService.updateStatus(event.target.value, taskId).subscribe((res: any) => {
      alert(res.message);
    })
  }

  onSortData(field: string, direction: string) {
    if (this.sort.field === field) {
      this.sort.type = this.sort.type === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort = {
        field: field,
        type: direction
      }
    }
  }

  isCurrentSort(field: string, direction: string) {
    return (this.sort.field === field && this.sort.type === direction);
  }

  onDelete(id: number) {
    this.taskService.delete(id).subscribe((res) => {
      alert(res.message);
      this.getTaskData();
    })
  }
}
