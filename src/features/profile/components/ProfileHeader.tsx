import { View } from 'react-native'
import React from 'react'
import { Label } from '@shared/components'
import { ProfileHeaderProps } from '@types'
import styles from './ProfileHeader.styles'

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name }) => {
    return (
        <View style={styles.header}>
            <Label style={styles.name}>{name}</Label>
        </View>
    )
}

export default ProfileHeader
