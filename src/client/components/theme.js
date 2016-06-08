import * as ColorManipulator from 'material-ui/utils/colorManipulator'
import * as Colors from 'material-ui/styles/colors'
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.green500,
    primary2Color: Colors.amber700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500
  }
}

export const inverted = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.grey100,
    primary2Color: Colors.amber700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.green200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.green500,
    alternateTextColor: Colors.green500,
    canvasColor: Colors.grey100,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500
  }
}
