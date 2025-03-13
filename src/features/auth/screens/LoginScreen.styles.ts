import { StyleSheet } from 'react-native'
import { COLORS } from '@styles/theme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    form: {
        width: '80%',
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        height: 50,
        borderColor: COLORS.accent,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    secondaryButton: {
        backgroundColor: COLORS.secondary,
    },
})

export default styles
