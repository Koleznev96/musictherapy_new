import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// Guideline sizes are based on standard ~5:4 screen aspect ratio
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size, width_def = width) => (width_def / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;
const scaleModerate = (size, factor = 0.5, width_def = width) => size + (scale(size, width_def) - size) * factor;

export { scale, scaleVertical, scaleModerate };