import { Drone } from "./drone.model";

export type Station = {
  id: string;
  name: string;
  description: string;
  images: string[];
  slotNumbers: number;
  drones: Drone[];
};

export const transformStation = (value: {
  id: string;
  name: string;
  description: string;
  images: string[];
  slotNumbers: number;
}): Station => ({
  id: value.id,
  name: value.name,
  description: value.description,
  images: value.images,
  slotNumbers: value.slotNumbers,
  drones: [],
});
