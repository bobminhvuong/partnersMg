import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VipService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  requestCreateVIP(object): Observable<any> {
    return this.http.post(environment.APIHOST + '/api/toolSales/add', object, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
