import { StyleSheet } from 'react-native'
import { COLORS, TEXT_STYLE } from '@styles/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: COLORS.white,
  },
  title: {
    ...TEXT_STYLE.bigTextBold,
    color: COLORS.text,
  },
})

export default styles
