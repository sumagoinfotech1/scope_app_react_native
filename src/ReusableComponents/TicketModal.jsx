// import React from "react";
// import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
// import AntDesign from "react-native-vector-icons/AntDesign"; // Import icons

// const { width } = Dimensions.get("window");

// const TicketModal = ({ visible, onClose }) => {
//   return (
//     <Modal transparent visible={visible} animationType="slide">
//       <View style={styles.overlay}>
//         <View style={styles.ticketContainer}>
//           {/* Top Image Section */}
//           <Image source={require("../assets/icons/Banner.png")} style={styles.imageSection} />

//           {/* Cutout Effect */}
//           <View style={styles.cutoutWrapper}>
//             <View style={styles.cutoutLeft} />
//             <View style={styles.separator} />
//             <View style={styles.cutoutRight} />
//           </View>

//           {/* Registration Message */}
//           <View style={styles.content}>
//             <Text style={styles.title}>Registration</Text>
//             <Text style={styles.subtitle}>Successfully Done</Text>

//             {/* Gift Icon */}
//             <Image source={require("../assets/icons/RefereEarnCoin.png")} style={styles.giftIcon} />
//           </View>

//           {/* Close Button */}
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <AntDesign name="closecircle" size={30} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   ticketContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     width: width * 0.9,
//     overflow: "hidden",
//     alignItems: "center",
//   },
//   imageSection: {
//     width: "100%",
//     height: 150,
//     resizeMode: "cover",
//   },
//   cutoutWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: "#fff",
//   },
//   cutoutLeft: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#f5f5f5",
//     marginLeft: -10,
//   },
//   separator: {
//     flex: 1,
//     borderBottomWidth: 2,
//     borderColor: "#ccc",
//     borderStyle: "dashed",
//   },
//   cutoutRight: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#f5f5f5",
//     marginRight: -10,
//   },
//   content: {
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 5,
//   },
//   giftIcon: {
//     width: 80,
//     height: 80,
//     marginTop: 15,
//     resizeMode: "contain",
//   },
//   closeButton: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//   },
// });

// export default TicketModal;

import React from "react";
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import AntDesign from "react-native-vector-icons/AntDesign"; 

const { width } = Dimensions.get("window");

const TicketModal = ({ visible, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.ticketContainer}>
          {/* Top Curved Section */}
          <Svg height="50" width={width * 0.9} style={styles.svgTop}>
            <Path
              d={`M 0 50 Q ${width * 0.45} 0, ${width * 0.9} 50 V 50 H 0 Z`}
              fill="white"
            />
          </Svg>

          {/* Banner Image */}
          <Image source={require("../assets/icons/Banner.png")} style={styles.imageSection} />

          {/* Registration Message */}
          <View style={styles.content}>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Successfully Done</Text>

            {/* Gift Icon */}
            <Image source={require("../assets/icons/RefereEarnCoin.png")} style={styles.giftIcon} />
          </View>

          {/* Bottom Curved Section */}
          <Svg height="50" width={width * 0.9} style={styles.svgBottom}>
            <Path
              d={`M 0 0 Q ${width * 0.45} 50, ${width * 0.9} 0 V 50 H 0 Z`}
              fill="white"
            />
          </Svg>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="closecircle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  ticketContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: width * 0.9,
    alignItems: "center",
    overflow: "hidden",
  },
  svgTop: {
    position: "absolute",
    top: -10,
  },
  svgBottom: {
    position: "absolute",
    bottom: -10,
  },
  imageSection: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  giftIcon: {
    width: 100,
    height: 100,
    marginTop: 15,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default TicketModal;
