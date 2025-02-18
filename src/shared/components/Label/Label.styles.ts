import {StyleSheet} from 'react-native';
import {TEXT_STYLE} from '@styles/theme';

export const styles = ({THEME_COLOR}) =>
  StyleSheet.create({
    textStyle: {
      color: THEME_COLOR.text,
      ...TEXT_STYLE.text,
    },
  });
