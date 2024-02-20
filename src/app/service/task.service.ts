import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  public getAll(): Observable<any> {
    let response = localStorage.getItem('TaskJson');
    return of({ status: 200, message: '', data: response ? JSON.parse(response) : [] });
  }

  public delete(id: any): Observable<any> {
    let existingData: any[] = [];
    this.getAll().subscribe((res) => {
      existingData = res.data;
      let deletedRecordIndex = existingData.findIndex((task: Task) => task.id === id);
      existingData.splice(deletedRecordIndex, 1);
    })
    localStorage.setItem('TaskJson', JSON.stringify(existingData));
    return of({ status: 200, message: 'Task deleted successfully.' });
  }

  public getById(id: any): Observable<Task> {
    let result: string = localStorage.getItem('TaskJson') || '';
    let task: Task = JSON.parse(result).find((d: Task) => d.id === id);
    return of(task);
  }

  public save(body: Task): Observable<any> {
    let existingData: any[] = [];
    let isAddMode: boolean = body.id === 0;
    this.getAll().subscribe((res) => {
      existingData = res.data;
      if (body.id === 0) {
        body.id = existingData.length + 1;
        existingData.push(body);
      } else {
        let updatedRecordIndex = existingData.findIndex((task: Task) => task.id === body.id);
        existingData[updatedRecordIndex] = body;
      }
    })
    localStorage.setItem('TaskJson', JSON.stringify(existingData));
    return of({ status: 200, message: isAddMode ? 'Task created successfully.' : 'Task updated successfully.' });
  }
  
  public updateStatus(status: string, id: number): Observable<any> {
    let existingData: any[] = [];
    this.getAll().subscribe((res) => {
      existingData = res.data;
      let updatedRecordIndex = existingData.findIndex((task: Task) => task.id === id);
      existingData[updatedRecordIndex].status = status;
    })
    localStorage.setItem('TaskJson', JSON.stringify(existingData));
    return of({ status: 200, message: 'Task status updated successfully.' });
  }
}
