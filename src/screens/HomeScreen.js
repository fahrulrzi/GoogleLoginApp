import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from '../components/Button';
import {getCurrentUser, signOut} from '../services/googleAuth';
import Loading from '../components/Loading';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser?.user || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    const success = await signOut();
    if (success) {
      navigation.replace('Login');
    } else {
      setLoading(false);
      // eslint-disable-next-line no-undef
      Alert.alert('Error', 'Gagal keluar dari akun. Silakan coba lagi.');
    }
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile', {user});
  };

  if (loading) {
    return <Loading message="Memuat informasi..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{uri: user?.photo || 'https://via.placeholder.com/150'}}
          style={styles.profilePic}
        />
        <Text style={styles.welcomeText}>Selamat datang,</Text>
        <Text style={styles.nameText}>{user?.name || 'User'}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Lihat Profil"
          onPress={handleViewProfile}
          style={styles.profileButton}
        />
        <Button
          title="Keluar"
          onPress={handleSignOut}
          style={styles.signOutButton}
          textStyle={styles.signOutText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  profileButton: {
    width: '80%',
    marginBottom: 15,
  },
  signOutButton: {
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  signOutText: {
    color: '#4285F4',
  },
});

export default HomeScreen;
