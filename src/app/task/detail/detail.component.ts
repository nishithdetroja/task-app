import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../interface/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  formGroup!: FormGroup;
  formPayload!: Task;
  taskId: string;
  formType: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id') || '0';
    this.formType = this.getFormType(this.activatedRoute.snapshot.paramMap.get('type') || '');
  }

  ngOnInit(): void {
    this.initPayload()
    this.initForm();
    if (this.formType !== 'Add') { 
      this.getDataById(); 
      if(this.formType === 'View'){
        this.formGroup.disable();
      }
    }
  }

  initPayload() {
    this.formPayload = {
      id: 0,
      title: '',
      description: '',
      priorityLevel: '',
      status: '',
      dueDate: new Date()
    }
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.max(1000)]],
      priorityLevel: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required]
    })
  }

  getDataById() {
    this.taskService.getById(parseInt(this.taskId)).subscribe((res) => {
      this.formGroup.patchValue(res);
    });
  }

  submitForm() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    } else {
      const formValue = this.formGroup.getRawValue();
      this.formPayload = { ...formValue, id: parseInt(this.taskId) };
      this.taskService.save(this.formPayload).subscribe((response) => {
        alert(response.message);
        if (this.formType === 'Add') {
          this.resetForm();
          this.initPayload();
        } else {
          this.cancelForm();
        }
      })
    }
  }

  cancelForm() {
    this.router.navigate(['task/list']);
  }

  resetForm() {
    this.formGroup.reset();
  }

  validateControl(controlName: string, validationType: string) {
    if (validationType === 'required') {
      return this.formGroup.get(controlName)?.hasError(validationType) && this.formGroup.get(controlName)?.touched;
    }
    return false;
  }

  getFormType(type: string) {
    if (type === 'view') {
      return 'View';
    } else if (type === 'edit') {
      return 'Edit'
    } else {
      return 'Add'
    }
  }
}
