import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
})
export class AddTaskDialogComponent implements OnInit {
  priority: any | undefined;
  title: any | undefined;
  description: any | undefined;
  status: any | undefined;
  assignee: any | undefined;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<any>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const newTask: any = {
      assignee: this.assignee,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
    };
    this.dialogRef.close(newTask);
    this.snackBar.open('Task was created', null, {
      duration: 2000,
      panelClass: ['created-snackbar'],
    });
  }
}
