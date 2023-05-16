import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessage$$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  errorMessage$(): Observable<any> {
    return this.errorMessage$$.asObservable();
  }

  setErrorMessage(message: string): void {
    this.errorMessage$$.next(message);
  }
}
