import { StyleSheet } from 'react-native'
import { COLORS, hp, TEXT_STYLE } from '@styles/theme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: COLORS.white,
    },
    title: {
        ...TEXT_STYLE.bigTextSemiBold,
        color: COLORS.black,
        marginBottom: hp(2),
    },
    input: {
        height: hp(5),
        borderWidth: 1,
        borderColor: COLORS.text,
        borderRadius: hp(1.2),
        paddingHorizontal: '5%',
        ...TEXT_STYLE.textMedium,
        marginBottom: hp(1.6),
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: hp(1.2),
        borderRadius: hp(0.8),
        alignItems: 'center',
    },
    buttonText: {
        ...TEXT_STYLE.textBold,
        color: COLORS.white,
    },
})

export default styles
