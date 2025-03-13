import { StyleSheet } from 'react-native'
import { COLORS, hp, TEXT_STYLE } from '@styles/theme'

const styles = StyleSheet.create({
    header: {
        padding: hp(2),
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    name: {
        ...TEXT_STYLE.bigTextBold,
        color: COLORS.white,
    },
})

export default styles
