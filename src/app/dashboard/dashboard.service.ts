import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

 
  constructor(private router: Router,private http: HttpClient) {
  }
 
  getCards():Observable<any> {
    return this.http.get("https://xebiascart.herokuapp.com/products");
  }
search(searchText):Observable<any>{
  return this.http.get("https://xebiascart.herokuapp.com/products?title=" + searchText)
}
 
}

