import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import Button from '../components/Button';
import {signInWithGoogle, isSignedIn} from '../services/googleAuth';
import Loading from '../components/Loading';

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Memeriksa apakah user sudah login sebelumnya
    const checkLoginStatus = async () => {
      try {
        const signedIn = await isSignedIn();
        if (signedIn) {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Error checking sign in status:', error);
      } finally {
        setInitializing(false);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      if (result.success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Login Gagal', result.error);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Terjadi kesalahan saat mencoba login. Silakan coba lagi.',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return <Loading message="Memeriksa status login..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/app-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Google Login App</Text>
        <Text style={styles.subtitle}>Masuk dengan akun Google Anda</Text>
      </View>

      <Button
        title="Login dengan Google"
        onPress={handleGoogleSignIn}
        loading={loading}
        style={styles.googleButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  googleButton: {
    width: '80%',
  },
});

export default LoginScreen;
