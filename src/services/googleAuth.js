import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '312931443558-6bt0rvijntcde8v8tp5kjb0okaq5n2qv.apps.googleusercontent.com',
    iosClientId:
      Platform.OS === 'ios' ? 'com.googleusercontent.apps.312931443558-r2v68249hvrr9a6nqnh9p7f2g176it3e' : undefined,
    scopes: ['profile', 'email'],
    offlineAccess: true,
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return {
      success: true,
      user: userInfo.user,
    };
  } catch (error) {
    let errorMessage = 'Terjadi kesalahan tidak diketahui';

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMessage = 'Login dibatalkan';
    } else if (error.code === statusCodes.IN_PROGRESS) {
      errorMessage = 'Proses login sedang berlangsung';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage =
        'Google Play Services tidak tersedia atau perlu diperbarui';
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const isSignedIn = async () => {
  try {
    const isUserSignedIn = await GoogleSignin.isSignedIn();
    return isUserSignedIn;
  } catch (error) {
    console.error('Error checking sign in status:', error);
    return false;
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};
