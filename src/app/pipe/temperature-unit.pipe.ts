import { Pipe, PipeTransform } from '@angular/core';
import { Units } from "../shared/units";

@Pipe({
  name: 'temperatureUnit'
})
export class TemperatureUnitPipe implements PipeTransform {

  transform(value: string, unit: Units): string {
    if (unit === Units.Metric) {
      return `${value}°C`;
    } else if (unit === Units.Imperial) {
      return `${value}°F`;
    }

    return value;
  }

}
