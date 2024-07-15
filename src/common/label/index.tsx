import { Text, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { useTheme } from '@contexts'

interface LabelProps {
  children: any
  style?: StyleProp<TextStyle>
}

export const Label = (props: LabelProps) => {
  const { children, style } = props
  const { THEME_COLOR } = useTheme()
  const Styles = styles({ THEME_COLOR })
  return (
    <Text allowFontScaling={false} style={[Styles.textStyle, style]}>{children}</Text>
  )
}
