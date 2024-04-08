export type Drone = {
  manufacturer: string;
  model: string;
  maxFlightTime: number;
  charge: number;
};

export const transformDrone = (value: {
  manufacturer: string;
  model: string;
  maxFlightTime: string;
  charge: string;
}): Drone => ({
  manufacturer: value.manufacturer,
  model: value.model,
  maxFlightTime: +value.maxFlightTime.replace("min", ""),
  charge: +value.charge.replace("%", ""),
});
