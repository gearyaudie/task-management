import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detailed-task',
  templateUrl: './detailed-task.component.html',
  styleUrls: ['./detailed-task.component.css'],
})
export class DetailedTaskComponent implements OnInit {
  task: any = [];
  id: any = this.route.snapshot.params['id'];
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskService.getDetailedTask(this.id).subscribe((task) => {
      this.task = task;
    });
  }

  onBackBtnClick() {
    this.router.navigate(['/']);
  }

  onDelete(task: any) {
    console.log(task.id);
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.router.navigate(['/']);
      this.snackBar.open('Task was deleted successfuly', null, {
        duration: 2000,
        panelClass: ['deleted-snackbar'],
      });
    });
  }

  onSubmitEditTask() {
    this.taskService.updateTask(this.task).subscribe(() => {
      this.router.navigate(['/']);
      this.snackBar.open('Task was updated successfuly', null, {
        duration: 2000,
        panelClass: ['edited-snackbar'],
      });
    });
  }
}
