import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

interface SecuredRouteProps {
  component: React.ComponentType<any>;
  fallbackComponent?: React.ComponentType<any>;
}

const SecuredRoute: React.FC<SecuredRouteProps> = ({
  component: Component,
  fallbackComponent: FallbackComponent,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigation.navigate('Login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  if (isAuthenticated === null) {
    // Show a loading indicator while checking authentication status
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isAuthenticated) {
    // Render the secured component if authenticated
    return <Component />;
  }

  // Render a fallback component if provided, otherwise return null
  return FallbackComponent ? <FallbackComponent /> : null;
};

export default SecuredRoute;
