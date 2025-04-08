import { Dimensions, StyleSheet } from 'react-native';
import { isIOS } from '@shared/utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../constant/colors';
import { FONT, FONT_SIZE } from '../constant/fonts';

const ACTIVE_OPACITY = 0.9;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const LIGHT_MODE = COLORS.lightMode;
const DARK_MODE = COLORS.darkMode;

enum FLASH_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
}

const TEXT_STYLE = StyleSheet.create({
  titleExtraBold: {
    fontFamily: FONT.extraBold,
    fontSize: FONT_SIZE.titleExtraBold,
  },
  titleBold: {
    fontFamily: FONT.bold,
    fontSize: FONT_SIZE.titleBold,
  },
  smallTitleBold: {
    fontFamily: FONT.bold,
    fontSize: FONT_SIZE.smallTitleBold,
  },
  smallTitleSemiBold: {
    fontFamily: FONT.semiBold,
    fontSize: FONT_SIZE.smallTitleSemiBold,
  },
  smallTitleMedium: {
    fontFamily: FONT.medium,
    fontSize: FONT_SIZE.smallTitleMedium,
  },
  bigText: {
    fontFamily: FONT.regular,
    fontSize: FONT_SIZE.bigText,
  },
  bigTextSemiBold: {
    fontFamily: FONT.semiBold,
    fontSize: FONT_SIZE.bigTextSemiBold,
  },
  bigTextMedium: {
    fontFamily: FONT.medium,
    fontSize: FONT_SIZE.bigTextMedium,
  },
  bigTextBold: {
    fontFamily: FONT.bold,
    fontSize: FONT_SIZE.bigTextBold,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: FONT_SIZE.text,
  },
  textSemiBold: {
    fontFamily: FONT.semiBold,
    fontSize: FONT_SIZE.textSemiBold,
  },
  textMedium: {
    fontFamily: FONT.medium,
    fontSize: FONT_SIZE.textMedium,
  },
  textBold: {
    fontFamily: FONT.bold,
    fontSize: FONT_SIZE.textBold,
  },
  smallText: {
    fontFamily: FONT.regular,
    fontSize: FONT_SIZE.smallText,
  },
  smallTextSemiBold: {
    fontFamily: FONT.semiBold,
    fontSize: FONT_SIZE.smallTextSemiBold,
  },
  smallTextMedium: {
    fontFamily: FONT.medium,
    fontSize: FONT_SIZE.smallTextMedium,
  },
  smallTextBold: {
    fontFamily: FONT.bold,
    fontSize: FONT_SIZE.smallTextBold,
  },
});

const commonStyles = StyleSheet.create({
  horizontalView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  horizontalView_m05: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(0.5),
  },
  horizontalView_m1: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(1),
  },
  justifyView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  justifyView_m05: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(0.5),
  },
  justifyView_m1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  justifyView_m2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow_5: {
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shadow_3: {
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  shadow_10: {
    elevation: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  shadow_20: {
    elevation: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  noPadding: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
  },
  noMargin: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginStart: 0,
    marginEnd: 0,
  },
  bottomView: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: hp(1.4),
    borderTopLeftRadius: hp(1.4),
    paddingHorizontal: '5%',
    paddingTop: hp(2),
    paddingBottom: isIOS() ? hp(3.3) : hp(2),
  },
});

export {
  HEIGHT,
  WIDTH,
  wp,
  hp,
  ACTIVE_OPACITY,
  COLORS,
  LIGHT_MODE,
  DARK_MODE,
  FLASH_POSITION,
  TEXT_STYLE,
  commonStyles,
};
