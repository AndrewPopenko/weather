import { TemperatureUnitPipe } from './temperature-unit.pipe';
import { SpeedUnitPipe } from "./speed-unit.pipe";
import { Units } from "../shared/units";

describe('TemperatureUnitPipe', () => {
  it('create an instance', () => {
    const pipe = new TemperatureUnitPipe();
    expect(pipe).toBeTruthy();
  });

  it('should show meter/sec', function () {
    const expected = '1 °C';
    const actual = new TemperatureUnitPipe().transform('1', Units.Metric);
    expect(actual).toEqual(expected);
  });

  it('should show miles/hour', function () {
    const expected = '1 °F';
    const actual = new TemperatureUnitPipe().transform('1', Units.Imperial);
    expect(actual).toEqual(expected);
  });
});
