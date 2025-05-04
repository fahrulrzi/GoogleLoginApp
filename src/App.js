import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {configureGoogleSignIn} from './services/googleAuth';

const App = () => {
  useEffect(() => {
    // Konfigurasi Google Sign-In saat aplikasi dimulai
    configureGoogleSignIn();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
