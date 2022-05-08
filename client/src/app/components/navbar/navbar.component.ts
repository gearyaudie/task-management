import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  newTask: any;
  isAuthenticated = false;

  @Output() onAddTask: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.newTask = result;
      if (this.newTask) {
        this.onAddTask.emit(this.newTask);
      }
    });
  }

  handleLogout() {
    this.authService.logout().subscribe(() => {
      // this.router.navigate(['/login']);
      console.log('Logging out ------------------');
      this.isAuthenticated = false;
    });
  }
}
