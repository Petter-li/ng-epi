import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { Response } from './Response';

@Injectable({
    providedIn: 'root',
})
export class EpiService {

    

    //private time: number = new Date().getTime();

    private epiUrl = `https://www.tianqiapi.com/api?version=epidemic&appid=23035354&appsecret=8YvlPNrz`;  // URL to web api
    constructor(
        private http: HttpClient
    ){}
    
    searchEpi(): Observable<Response> {
        return this.http.get<Response>(this.epiUrl).pipe(
            catchError(this.handleError<Response>('searchEpi'))
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}