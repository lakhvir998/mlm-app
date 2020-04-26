import React, {Component} from 'react';
import {
    View,
    Image,
    StatusBar,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MyText from "../components/MyText";
import Firebase from 'react-native-firebase';

export default class VerifyOTP extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('VerifyOTP');
    }

    render() {
        return <View
            style={{ flex: 1, backgroundColor: '#651ac1', paddingHorizontal: 20 }}
        >
            <StatusBar
                backgroundColor={'#381075'}
            />
            <Image
                source={require('../assets/images/logo.png')}
                style={{ height: 100, width: 100, alignSelf: 'center', marginTop: 20 }}
                resizeMode={'contain'}
            />

            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <MyText style={{ color: 'white', fontSize: 36, textAlign: 'center' }}>Verify OTP</MyText>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        ref={'1'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(n1) => {
                            if(n1.length > 0) {
                                this.refs['2'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'2'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(n2) => {
                            if(n2.length > 0) {
                                this.refs['3'].focus();
                            } else if(n2.length === 0) {
                                this.refs[1].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'3'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(n3) => {
                            if(n3.length > 0) {
                                this.refs['4'].focus();
                            } else if(n3.length === 0) {
                                this.refs['2'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'4'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(n4) => {
                            if(n4.length > 0) {
                                this.refs['4'].blur();
                            } else if(n4.length === 0) {
                                this.refs['3'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                </View>

                <TouchableOpacity
                    style={{ height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}
                    onPress={() => {
                        this.props.navigation.navigate('Inside');
                    }}
                >
                    <MyText style={{ color: 'white', fontSize: 18 }}>Verify</MyText>
                </TouchableOpacity>
            </View>

        </View>
    }
};

const styles = StyleSheet.create({
   otp: {
       textAlign: 'center',
       fontSize: 30,
       borderBottomWidth: 2,
       borderBottomColor: 'white',
       marginHorizontal: 2.5,
       color: 'white',
       fontFamily: 'Quicksand-Bold'
   }
});