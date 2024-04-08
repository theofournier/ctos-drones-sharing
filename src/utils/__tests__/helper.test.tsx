import {
  convertMillisecondsToMinSec,
  getFlightTime,
  getRandomInt,
  getRentCharge,
  getRentEndDate,
} from "../helpers";

describe("getRandomInt", () => {
  it("should be between 0 and max", () => {
    const max = 5;

    const randomInt = getRandomInt(max);

    expect(randomInt).toBeGreaterThanOrEqual(0);
    expect(randomInt).toBeLessThanOrEqual(max);
  });
});

describe("convertMillisecondsToMinSec", () => {
  it("should return mm : ss", () => {
    const milliseconds = 60000; // 1min

    const minSec = convertMillisecondsToMinSec(milliseconds);

    expect(minSec).toBe("01 : 00");
  });
});

describe("getFlightTime", () => {
  it("should return the flight time", () => {
    const maxFlightTimeMin = 20;
    const startCharge = 50;

    const flightTime = getFlightTime(maxFlightTimeMin, startCharge); //10min

    expect(flightTime).toBe(600000);
  });
});

describe("getRentEndDate", () => {
  it("should return the end date", () => {
    const flightTime = 600000;
    const startDate = new Date(2021, 8, 29, 15, 0, 0);

    const endDate = getRentEndDate(flightTime, startDate);

    expect(endDate).toStrictEqual(new Date(2021, 8, 29, 15, 10, 0));
  });
});

describe("getRentCharge", () => {
  it("should return the rent charge 25%", () => {
    const startCharge = 50;
    const startDate = new Date(2021, 8, 19, 15, 0, 0);
    const currentDate = new Date(2021, 8, 19, 15, 5, 0);
    const maxFlightTimeMin = 20;

    jest
      .spyOn(global.Date, "now")
      .mockImplementationOnce(() => currentDate.valueOf());

    const rentCharge = getRentCharge(startCharge, startDate, maxFlightTimeMin);

    expect(rentCharge).toBe(25);
  });
});
