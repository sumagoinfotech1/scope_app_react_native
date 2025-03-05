import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

// Custom toast with buttons
const toastConfig = {
  warningToast: ({ text1, text2 }) => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'red',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginHorizontal: 20,
      }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>{text1}</Text>
      <Text style={{ fontSize: 14, color: '#555', marginVertical: 5 }}>{text2}</Text>

      {/* Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => Toast.hide()}
          style={{
            backgroundColor: '#ccc',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 5,
            marginRight: 10,
          }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Cancel</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => {
            Toast.hide();
            handleDeleteAccount();
          }}
          style={{
            backgroundColor: 'red',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 5,
          }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
};

export default function App() {
  return <Toast config={toastConfig} />;
}
