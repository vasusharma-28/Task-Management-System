import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../model/task.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { v4 as uuidv4 } from 'uuid';
import { KeyValuePipe } from '@angular/common';
import { TmsService } from '../../services/tms.service';

@Component({
  selector: 'tms-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatListModule,
    KeyValuePipe,
  ],
})
export class HomePageComponent {
  @ViewChild('newTask')
  newTaskRef = ElementRef<any>;
  taskListMap = new Map<string, Task>();
  private readonly _dialog = inject(MatDialog);
  private readonly _tmsService = inject(TmsService);
  private _dialogRef: MatDialogRef<any> | null = null;
  readonly priorities = ['Low', 'Medium', 'High'];

  // taskList: Task[] = [
  //   {
  //     id: uuidv4(),
  //     title: 'Yoga session',
  //     priority: 'High',
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'All hands meeting',
  //     priority: 'Medium',
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'Dentist appointment',
  //     priority: 'High',
  //   },
  // ];


  ngOnInit() {
    this._tmsService.getAllTasks().subscribe({
      next: (res: Task[]) => {
        console.log(res);
        res?.map((task: any) => this.taskListMap.set(task.id as string, task));
      },
    });
  }

  openTaskModel() {
    this._dialogRef = this._dialog.open(this.newTaskRef);
  }

  addNewTask(taskForm: any) {
    console.log(taskForm.value);
    const taskPayload = {
      ...taskForm.value,
      id: uuidv4(),
    };
    
    this._tmsService.addTask(taskPayload).subscribe({
      next: (res: Task[]) => {
        if (res?.length) {
          this.taskListMap.set(uuidv4(), taskForm.value);
          this._dialogRef?.close();
        }
      },
    });
  }

  deleteTask(taskId: string | number) {
    this._tmsService.deleteTask(taskId as string).subscribe({
      next: (_) => {
        this.taskListMap.delete(taskId as string);
      },
    });
  }

  closeModel() {
    this._dialogRef?.close();
  }
}
