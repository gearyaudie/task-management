import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  @Input() taskPriority: any;
  @Input() name: string = '';

  singlePriority: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    // console.log(this.name, this.taskPriority);
  }

  onCardClick(id: any) {
    this.router.navigate(['task', id]);
  }
}
