import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  private refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  list<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(endpoint).pipe(delay(500));
  }

  loadByID<T>(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${endpoint}/${id}`).pipe(take(1));
  }

  create<T>(endpoint: string, item: T): Observable<T> {
    return this.http.post<T>(endpoint, item).pipe(take(1));
  }

  update<T>(endpoint: string, id: string, item: T): Observable<T> {
    return this.http.put<T>(`${endpoint}/${id}`, item).pipe(take(1));
}

  save<T>(endpoint: string, id: string, item: T): Observable<T> {
    if (id) {
      return this.update(endpoint, id, item);
    } else {
      return this.create(endpoint, item);
    }
  }

  remove(endpoint: string, id: string): Observable<void> {
    return this.http.delete<void>(`${endpoint}/${id}`).pipe(take(1));
  }

  get refreshNeeded() {
  return this.refreshNeeded$.asObservable();
}

triggerRefresh() {
  this.refreshNeeded$.next();
}
}
