import {StyleSheet} from 'react-native';
import {TEXT_STYLE, COLORS, hp, commonStyles} from '@styles/theme';

export const styles = StyleSheet.create({
  titleStyle: {
    ...TEXT_STYLE.textMedium,
    fontSize: 17,
    color: COLORS.white,
  },
  container: {
    height: hp(7),
    marginVertical: hp(1),
    borderRadius: hp(4),
    ...commonStyles.horizontalView,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
