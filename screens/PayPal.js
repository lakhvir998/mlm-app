import React, {Component} from 'react';
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    Picker
} from 'react-native';
import { Sae } from 'react-native-textinput-effects';
import Foundation from "react-native-vector-icons/Foundation";
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Background from "../components/Background";
import MyText from "../components/MyText";
import API from "../components/API";

let { width, height } = Dimensions.get('window');

export default class PayPal extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            coins: '50'
        }
    }

    redeem() {
        let { email, coins } = this.state;
        let { goBack } = this.props.navigation;
        coins = parseFloat(coins);
        if(email.length > 0 && coins > 0) {
            API.redeemPaypal({email, coins}, (resp) => {
                ToastAndroid.show(resp.message, ToastAndroid.SHORT);
                if(resp.status) {
                    goBack();
                }
            });
        } else {
            ToastAndroid.show('Kindly fill the details correctly', ToastAndroid.SHORT);
        }
    }

    render() {
        return <KeyboardAwareScrollView contentContainerStyle={{ height: height - 25, padding: 20, justifyContent: 'space-between' }}>
            <Background />
            <Image
                source={require('../assets/images/paypal.png')}
                style={{ height: 80, width: width - 40 }}
                resizeMode={'contain'}
            />

            <View style={{ padding: 20, backgroundColor: 'white' }}>
                <Sae
                    value={this.state.email}
                    label={'Email'}
                    iconClass={Feather}
                    iconName={'inbox'}
                    iconColor={'black'}
                    inputStyle={{ fontFamily: 'Quicksand-Bold', color: 'black' }}
                    labelStyle={{ color: 'black', fontFamily: 'Quicksand-Bold' }}
                    onChangeText={(email) => this.setState({ email })}
                />

                <MyText style={{ fontSize: 18, color: 'black', fontWeight: 'bold', marginTop: 10 }}>Coins</MyText>
                <Picker
                    selectedValue={this.state.coins}
                    onValueChange={(itemValue, itemIndex) => this.setState({coins: itemValue})}
                >
                    <Picker.Item label="50" value="50" />
                    <Picker.Item label="100" value="100" />
                    <Picker.Item label="500" value="500" />
                    <Picker.Item label="1000" value="1000" />
                    <Picker.Item label="25000" value="2500" />
                    <Picker.Item label="5000" value="5000" />
                    <Picker.Item label="12000" value="12000" />
                    <Picker.Item label="20000" value="20000" />
                    <Picker.Item label="35000" value="35000" />
                    <Picker.Item label="50000" value="50000" />
                    <Picker.Item label="100000" value="100000" />
                </Picker>
            </View>

            <View style={{ height: 48, flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7f1ded', flex: 1 }}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                >
                    <MyText style={{ color: 'white', fontSize: 18 }}>Back</MyText>
                </TouchableOpacity>
                <View style={{ width: 10 }} />
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7f1ded', flex: 1 }}
                    onPress={this.redeem.bind(this)}
                >
                    <MyText style={{ color: 'white', fontSize: 18 }}>Redeem</MyText>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>;
    }
}