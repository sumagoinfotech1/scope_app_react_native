import Toast from 'react-native-toast-message';

export const showToast = (type, message, description = '') => {
  Toast.show({
    type: type, // 'success', 'error', 'info'
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};
