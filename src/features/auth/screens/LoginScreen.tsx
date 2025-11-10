import { View } from 'react-native';
import React from 'react';
import { COLORS } from '@styles/theme';
import styles from './LoginScreen.styles';
import { LoginScreenProps } from '@types';
import { Label } from '@shared/components';
import LoginForm from '../components/LoginForm';

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onGoogleLogin,
  error,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <Label>Login</Label>
      {error && <Label style={{ color: COLORS.secondary }}>{error}</Label>}
      <LoginForm
        onLogin={onLogin}
        onGoogleLogin={onGoogleLogin}
        loading={loading}
      />
    </View>
  );
};

export default LoginScreen;
