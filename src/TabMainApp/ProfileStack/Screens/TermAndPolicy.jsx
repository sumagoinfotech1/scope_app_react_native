import React, { useRef } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from '../../../ReusableComponents/Loader';

const TermAndPolicy = ({ route }) => {
    const navigation = useNavigation();
    const webViewRef = useRef(null);
    const { webUrl } = route.params || {};

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <FontAwesome5 name="arrow-left" size={wp('5%')} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => webViewRef.current.reload()} style={styles.iconButton}>
                    <FontAwesome5 name="redo" size={wp('5%')} color="#fff" />
                </TouchableOpacity>
            </View>
            
            {/* WebView */}
            <WebView 
                ref={webViewRef}
                source={{ uri: webUrl }}
                style={styles.webview}
                startInLoadingState
                renderLoading={() => (
                    <Loader visible={true} />
                )}
            />
        </View>
    );
};

export default TermAndPolicy;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: wp('4%'),
    },
    iconButton: {
        padding: wp('2.5%'),
    },
    webview: {
        width: wp('100%'),
        height: hp('90%'),
    },
    loader: {
        position: 'absolute',
        top: hp('50%'),
        left: wp('50%'),
        transform: [{ translateX: -wp('5%') }, { translateY: -hp('5%') }],
    },
});
