enum ImageName {
  CM_D = "CamdenMarket_Drone.png",
  CM = "CamdenMarket.png",
  KCS_Drone = "KingCrossStation_Drone.png",
  KCS = "KingCrossStation.png",
  POW_Drone = "PalaceOfWestminster_Drone.png",
  POW = "PalaceOfWestminster.png",
}

export const getImageSource = (imageName: string) => {
  switch (imageName) {
    case ImageName.CM_D:
      return require("../assets/stations-images/CamdenMarket_Drone.png");
    case ImageName.CM:
      return require("../assets/stations-images/CamdenMarket.png");
    case ImageName.KCS_Drone:
      return require("../assets/stations-images/KingCrossStation_Drone.png");
    case ImageName.KCS:
      return require("../assets/stations-images/KingCrossStation.png");
    case ImageName.POW_Drone:
      return require("../assets/stations-images/PalaceOfWestminster_Drone.png");
    case ImageName.POW:
      return require("../assets/stations-images/PalaceOfWestminster.png");
  }
  return null;
};
