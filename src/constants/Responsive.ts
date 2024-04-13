import {Dimensions, PixelRatio, StatusBar} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

const standardWidth = 375;
const standardHeight = 812;

const bottomBarHeight = PixelRatio.roundToNearestPixel(
  64 * (screenHeight / standardHeight),
);

interface ResponsiveLayout {
  width: (w: number) => number;
  height: (h: number) => number;
  font: (f: number) => number;
  screenWidth: () => number;
  screenHeight: () => number;
  bottomBarHeight: () => number;
  vc: (h: number) => number;
  statusBarHeight: () => number | undefined;
}

const Responsive: ResponsiveLayout = {
  width: w => PixelRatio.roundToNearestPixel(w * (screenWidth / standardWidth)),
  height: h =>
    PixelRatio.roundToNearestPixel(h * (screenHeight / standardHeight)),
  font: f => PixelRatio.roundToNearestPixel(f * (screenWidth / screenWidth)),
  screenWidth: () => screenWidth,
  screenHeight: () => screenHeight,
  bottomBarHeight: () => bottomBarHeight,
  vc: h => PixelRatio.roundToNearestPixel(h * (screenHeight / standardHeight)),
  statusBarHeight: () => statusBarHeight,
};

export default Responsive;
