// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const HeaderName = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.logo}>
//         Grow<Text style={styles.wise}>Wise</Text>
//       </Text>
//       <Text style={styles.subtitle}>Combines growth with wisdom.</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     fontSize: wp("10%"),
//     fontWeight: "bold",
//     color: "#000",
//   },
//   wise: {
//     color: "#fff",
//   },
//   subtitle: {
//     fontSize: wp("4.5%"),
//     color: "#000000",
//     marginBottom: hp("2%"),
//   },
// });

// export default HeaderName;

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HeaderName = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Grow<Text style={styles.wise}>Wise</Text>
      </Text>
      <Text style={styles.subtitle}>Combines growth with wisdom.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? hp("7%") : hp("2%"), // Extra margin on iOS
  },
  logo: {
    fontSize: wp("10%"),
    fontWeight: "bold",
    color: "#000",
  },
  wise: {
    color: "#fff",
  },
  subtitle: {
    fontSize: wp("4.5%"),
    color: "#000000",
    marginBottom: hp("2%"),
  },
});

export default HeaderName;
