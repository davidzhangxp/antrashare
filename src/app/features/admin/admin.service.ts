import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, throwError } from 'rxjs';
import { User } from 'src/app/core/interface/interface';
import { baseURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  path = 'api/users/getAllUsers';
  username: string = '';
  token?: string | null;
  userSubject$: Subject<any> = new Subject();
  user$: Observable<User> = this.userSubject$.asObservable();
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  constructor(private http: HttpClient) {}

  setuserName(data: string) {
    this.username = data;
  }
  getuserName() {
    return this.username;
  }

  getAllUsers(): Observable<any> {
    // if (localStorage.getItem('token')) {
    //   this.token = localStorage.getItem('token');
    // }
    const headers = {
      'content-type': 'application/json',
      // Authorization: `Bearer ${this.token}`,
    };
    return this.http
      .get(baseURL + this.path, { headers: headers })
      .pipe(catchError(this.handleError));
  }
}
