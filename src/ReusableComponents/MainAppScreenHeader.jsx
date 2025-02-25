// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const MainAppScreenHeader = ({ headername }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>{headername}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     // paddingVertical: hp("2%"),
//     // backgroundColor: "#f8f8f8", // Light background for contrast
//     // borderBottomWidth: 1,
//     // borderBottomColor: "#ddd",
//   },
//   headerText: {
//     fontSize: wp("9%"),
//     fontWeight: "bold",
//     color: "#fff",
//   },
// });

// export default MainAppScreenHeader;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MainAppScreenHeader = ({ headername, color = "#fff",fontStyle='normal' ,fontFamily,fontSize= wp("9%")}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color ,fontStyle,fontFamily,fontSize}]}>{headername}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    
    fontWeight: "bold",
    color: "#fff",
    
  },
});

export default MainAppScreenHeader;
