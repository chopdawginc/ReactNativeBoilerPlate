import { View } from 'react-native'
import React from 'react'
import { SCREEN } from '@constant'
import styles from './ProfileScreen.styles'
import { useLocalization } from '@contexts'
import { Button, If, Label } from '@shared/components'
import ProfileHeader from '../components/ProfileHeader'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, ProfileScreenProps } from '@types'

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
    const { t } = useLocalization()
    const { navigate } = useNavigation<NavigationProp>()

    return (
        <View style={styles.container}>

            <If condition={user} elseComp={<Label>{t('loading')}</Label>}>
                <>
                    <ProfileHeader name={user?.name ?? ''} />
                    <Label style={styles.title}>{t('welcomeHeading')}{user?.name ?? ''}!</Label>
                </>
            </If>

            <Button text='Move to Edit Profile Screen' onPress={() => navigate(SCREEN.EDIT_PROFILE)} />

        </View>
    )
}

export default ProfileScreen
