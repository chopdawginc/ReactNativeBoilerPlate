import { Text } from 'react-native'
import React from 'react'
import { LabelProps } from '@types'
import { useTheme } from '@contexts'
import { styles } from './Label.styles'

const Label = (props: LabelProps) => {
    const { children, style } = props
    const { THEME_COLOR } = useTheme()
    const Styles = styles({ THEME_COLOR })
    return (
        <Text allowFontScaling={false} style={[Styles.textStyle, style]}>{children}</Text>
    )
}

export default Label
