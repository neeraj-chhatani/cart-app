import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  public userInfo=new Subject<any>();
  public total=new BehaviorSubject<number>(0);
  constructor() { }
}
