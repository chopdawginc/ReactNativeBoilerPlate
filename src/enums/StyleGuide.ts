import { Dimensions, StyleSheet } from 'react-native'
import { isIOS } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ACTIVE_OPACITY = 0.9
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const LIGHT_MODE = {
    primary: '#4CAF50',
    text: '#333',
    background: '#FFF',
    secondary: '#FFFF99',
    accent: '#2196F3',
}

const DARK_MODE = {
    primary: '#2196F3',
    text: '#EEE',
    background: '#23262F',
    secondary: '#FF3800',
    accent: '#E91E63',
}

enum COLORS {
    white = '#FFFFFF',
    primary = '#2196F3',
    text = '#EEE',
    background = '#23262F',
    secondary = '#FF9800',
    accent = '#E91E63',
    black = '#000'
}

enum FLASH_POSITION {
    TOP = 'top',
    BOTTOM = 'bottom'
}

enum FONT {
    regular = 'Manrope-Regular',
    bold = 'Manrope-Bold',
    extraBold = 'Manrope-ExtraBold',
    semiBold = 'Manrope-SemiBold',
    medium = 'Manrope-Medium',
    light = 'Manrope-Light',
}

const TEXT_STYLE = StyleSheet.create({
    titleExtraBold: {
        fontFamily: FONT.extraBold,
        fontSize: 21,
    },
    titleBold: {
        fontFamily: FONT.bold,
        fontSize: 21,
    },
    smallTitleBold: {
        fontFamily: FONT.bold,
        fontSize: 20,
    },
    smallTitleSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 20,
    },
    smallTitleMedium: {
        fontFamily: FONT.medium,
        fontSize: 20,
    },
    bigText: {
        fontFamily: FONT.regular,
        fontSize: 16,
    },
    bigTextSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 16,
    },
    bigTextMedium: {
        fontFamily: FONT.medium,
        fontSize: 16,
    },
    bigTextBold: {
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: 13,
    },
    textSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 13,
    },
    textMedium: {
        fontFamily: FONT.medium,
        fontSize: 13,
    },
    textBold: {
        fontFamily: FONT.bold,
        fontSize: 13,
    },
    smallText: {
        fontFamily: FONT.regular,
        fontSize: 11,
    },
    smallTextSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 11,
    },
    smallTextMedium: {
        fontFamily: FONT.medium,
        fontSize: 11,
    },
    smallTextBold: {
        fontFamily: FONT.bold,
        fontSize: 11,
    },
})


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
        justifyContent: 'space-between'
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
})

export { HEIGHT, WIDTH, wp, hp, ACTIVE_OPACITY, COLORS, LIGHT_MODE, DARK_MODE, FLASH_POSITION, TEXT_STYLE, commonStyles }