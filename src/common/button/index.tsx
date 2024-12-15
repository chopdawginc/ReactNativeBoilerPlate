import {TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {If} from '../If';
import {Label} from '../label';
import {styles} from './styles';
import {ButtonProps} from '@types';
import {ACTIVE_OPACITY, COLORS} from '@styles/theme';

export const Button = (props: ButtonProps) => {
  const {text, textStyle, style, onPress, isLoading} = props;
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.container, style]}
      onPress={() => {
        onPress && onPress();
      }}>
      <If
        condition={!isLoading}
        elseComp={<ActivityIndicator color={COLORS.white} />}>
        <Label style={[styles.titleStyle, textStyle]}>{text}</Label>
      </If>
    </TouchableOpacity>
  );
};
