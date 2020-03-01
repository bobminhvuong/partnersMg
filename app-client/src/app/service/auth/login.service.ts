import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  login(data): Observable<any> {
    return this.http.post(environment.APIHOST + '/api/auth/login', data, this.mainSV.getHttpOptionsNotToken())
      .pipe(
        catchError(this.mainSV.handleError)
      );
  }

  register(data): Observable<any> {
    return this.http.post(environment.APIHOST + '/api/user/add', data, this.mainSV.getHttpOptionsNotToken())
      .pipe(
        catchError(this.mainSV.handleError)
      );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(environment.APIHOST + '/api/auth/getCurrentUser', this.mainSV.getHttpOptions())
      .pipe(
        catchError(this.mainSV.handleError)
      );
  }
}
