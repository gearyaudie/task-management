import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  backlogTask: any;
  lowTask: any;
  mediumTask: any;
  highTask: any;

  username: string;

  subscription: Subscription;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.backlogTask = this.tasks.filter(
        (task: Task) => task.priority.toLowerCase() === 'backlog'
      );
      this.lowTask = this.tasks.filter(
        (task: Task) => task.priority.toLowerCase() === 'low'
      );
      this.mediumTask = this.tasks.filter(
        (task: Task) => task.priority.toLowerCase() === 'medium'
      );
      this.highTask = this.tasks.filter(
        (task: Task) => task.priority.toLowerCase() === 'high'
      );
    });
    this.authService.user.subscribe((user) => {
      this.username = user.name;
    });
  }

  onCardClick(id: string) {
    this.router.navigate(['task', id]);
  }

  postTask(newTask: Task) {
    this.subscription = this.taskService
      .postTask(newTask)
      .subscribe((newTask) => {
        switch (newTask.priority) {
          case 'Backlog':
            this.backlogTask.unshift(newTask);
            break;
          case 'Low':
            this.lowTask.unshift(newTask);
            break;
          case 'Medium':
            this.mediumTask.unshift(newTask);
            break;
          case 'High':
            this.highTask.unshift(newTask);
            break;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
