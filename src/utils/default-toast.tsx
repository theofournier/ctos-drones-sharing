import Toast from "react-native-root-toast";

export const showDefaultToast = (text: string) =>
  Toast.show(text, {
    duration: Toast.durations.LONG,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    opacity: 0.9,
    shadow: false,
  });
