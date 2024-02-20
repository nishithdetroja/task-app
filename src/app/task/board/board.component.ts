import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  openData!: Task[];
  inProgressData!: Task[];
  completedData!: Task[];
  status: any = {
    'open': 'Open',
    'inProgress': 'In Progress',
    'completed': 'Completed'
  }

  constructor(
    private router: Router,
    private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTaskData();
  }

  getTaskData() {
    this.taskService.getAll().subscribe((res) => {
      this.openData = res.data.filter((d: Task) => d.status === 'Open');
      this.inProgressData = res.data.filter((d: Task) => d.status === 'In Progress');
      this.completedData = res.data.filter((d: Task) => d.status === 'Completed');
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const elementId = event.container.data[event.currentIndex].id;
      const status = this.status[event.container.id];
      this.updateTaskStatus(status, elementId);
    }
  }

  updateTaskStatus(status: any, taskId: any) {
    this.taskService.updateStatus(status, taskId).subscribe();
  }

  navigateToTaskList() {
    this.router.navigate(['task/list']);
  }
}
