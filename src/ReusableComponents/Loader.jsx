import React from 'react';
import { View, Image, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from './Colors';

const Loader = ({ visible }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          {/* <Image source={require('../assets/icons/i3.png')} style={styles.loaderImage} /> */}
          <ActivityIndicator size="large" color={Colors.background} style={styles.activityIndicator} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 40,
    alignItems: 'center',
  },
  loaderImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  activityIndicator: {
    // marginTop: 10,
  },
});

export default Loader;