import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getApi():Observable<any>{
    return this.http.get("https://my-json-server.typicode.com/G4brielBarbosa/angular-buzz-feed/buzz").pipe(
      tap(res => res)
    )
  }
}
