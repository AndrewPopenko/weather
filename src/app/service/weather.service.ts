import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiMap } from "../shared/api-map";
import { Geo } from "../shared/geo";
import { ErrorService } from "./error.service";
import { catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient,
              private errorService: ErrorService) { }

  getCurrentWeather(geoData: Geo, unit: string) {
    const params = new HttpParams()
      .set('lat', geoData?.lat)
      .set('lon', geoData?.lon)
      .set('appid', ApiMap.apiKey)
      .set('units', unit);

    return this.httpClient.get(ApiMap.weather, { params })
      .pipe(catchError(err => of(this.errorService.setErrorMessage(err?.error?.message))));
  }
}
