var moment = require("moment");
require("moment-duration-format");

export const getRandomInt = (max: number): number =>
  Math.floor(Math.random() * max);

export const convertMillisecondsToMinSec = (milliseconds: number): string => {
  const duration = moment.duration(milliseconds);
  return moment.duration(duration, "ms").format("mm : ss", {
    trim: false,
  });
};

// Calculate the flight time from the maximum flight time and the current charge
export const getFlightTime = (
  maxFlightTimeMin: number,
  startCharge: number
): number => (maxFlightTimeMin * 60000 * startCharge) / 100;

export const getFlightTimeMin = (
  maxFlightTimeMin: number,
  startCharge: number
): number => Math.round(getFlightTime(maxFlightTimeMin, startCharge) / 60000);

// Return the end date by adding the flight time to the start date
export const getRentEndDate = (flightTime: number, startDate: Date): Date =>
  moment(startDate).add(flightTime, "ms").toDate();

export const getTimeRemaining = (rentEndDate: Date): number =>
  moment(rentEndDate).diff(moment());

// Calculate the current charge by substracting the charge remaining to the starting charge
export const getRentCharge = (
  startCharge: number,
  startDate: Date,
  maxFlightTimeMin: number
): number => {
  const maxFlightTime = maxFlightTimeMin * 60000;
  const rentTime = moment
    .duration(moment().diff(moment(startDate)))
    .asMilliseconds();
  const consumedCharge = (rentTime / maxFlightTime) * 100;
  return startCharge - consumedCharge;
};
