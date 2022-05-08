import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // get all tasks
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl + '/task');
  }

  // get one tasks
  getDetailedTask(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/task/${id}`);
  }

  // create new task
  postTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl + '/task', task, httpOptions);
  }
  deleteTask(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + `/task/${id}`);
  }

  // Edit task
  updateTask(task: any): Observable<any> {
    return this.http.put(this.apiUrl + `/task/${task.id}`, task, httpOptions);
  }
}
