import { Pipe, PipeTransform } from '@angular/core';
import { Units } from "../shared/units";

@Pipe({
  name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {

  transform(value: string, unit: string): string {
    if (unit === Units.Metric) {
      return `${ value } meter/sec`;
    } else if (unit === Units.Imperial) {
      return `${ value } miles/hour`;
    }
    return value;
  }
}
