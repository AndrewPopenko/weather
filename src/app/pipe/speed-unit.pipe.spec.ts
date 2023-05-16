import { SpeedUnitPipe } from './speed-unit.pipe';
import { Units } from "../shared/units";

describe('SpeedUnitPipe', () => {
  it('create an instance', () => {
    const pipe = new SpeedUnitPipe();
    expect(pipe).toBeTruthy();
  });

  it('should show meter/sec', function () {
    const expected = '1 meter/sec';
    const actual = new SpeedUnitPipe().transform('1', Units.Metric);
    expect(actual).toEqual(expected);
  });

  it('should show miles/hour', function () {
    const expected = '1 miles/hour';
    const actual = new SpeedUnitPipe().transform('1', Units.Imperial);
    expect(actual).toEqual(expected);
  });
});
