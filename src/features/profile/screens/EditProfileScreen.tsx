import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Label } from '@shared/components'
import { useLocalization } from '@contexts'
import styles from './EditProfileScreen.styles'
import { EditProfileScreenProps } from '@types'

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onUpdateProfile }) => {
  const [name, setName] = useState(user?.name || '')
  const { t } = useLocalization()

  return (
    <View style={styles.container}>
      <Label style={styles.title}>{t('editProfile')}</Label>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={t('namePlaceholder')}
      />
      <TouchableOpacity style={styles.button} onPress={() => onUpdateProfile({ name })}>
        <Label style={styles.buttonText}>{t('save')}</Label>
      </TouchableOpacity>
    </View>
  )
}

export default EditProfileScreen
