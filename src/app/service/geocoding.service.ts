import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiMap } from "../shared/api-map";
import { catchError, Observable, of } from "rxjs";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private httpClient: HttpClient,
              private errorService: ErrorService) {
  }

  getCitiesList(city: string): Observable<any> {
    const limitOfCitiesPerResponse = '5';
    const params = new HttpParams()
      .set('q', city)
      .set('appid', ApiMap.apiKey)
      .set('limit', limitOfCitiesPerResponse);
    return this.httpClient.get(ApiMap.geoCoding, { params })
      .pipe(catchError(err => of(this.errorService.setErrorMessage(err?.error?.message))));
  }
}
