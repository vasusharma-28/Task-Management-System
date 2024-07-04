import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmsService {
  private readonly _httpClient = inject(HttpClient);

//   private readonly _url = 'http://localhost:4280/data-api/rest/Tasks';
  private readonly _url = '/data-api/rest/Tasks';

  getAllTasks(): Observable<Task[]> {
    return this._httpClient
      .get(this._url)
      .pipe(map((res: any) => res?.value ?? []));
  }

  deleteTask(taskId: string) {
    return this._httpClient.delete(`${this._url}/id/${taskId}`);
  }

  addTask(task: Task): Observable<Task[]> {
    return this._httpClient
      .post(this._url, task)
      .pipe(map((res: any) => res?.value ?? []));
  }
}
