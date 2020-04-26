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

export default class BankTransfer extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            coins: '50',
            name: '',
            account_no: '',
            bank_name: '',
            swift_code: '',
            ifsc: ''
        }
    }

    redeem() {
        let { coins, name, account_no, bank_name, swift_code, ifsc } = this.state;
        let { goBack } = this.props.navigation;
        coins = parseFloat(coins);
        if(
            coins > 0 &&
            name.length > 0 &&
            account_no.length > 0 &&
            bank_name.length > 0 &&
            swift_code.length > 0 &&
            ifsc.length > 0
        ) {
            API.redeemBank({coins, name, account_no, bank_name, swift_code, ifsc}, (resp) => {
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
        return <KeyboardAwareScrollView contentContainerStyle={{ padding: 20 }}>
            <Background />
            <Image
                source={require('../assets/images/bank.png')}
                style={{ height: 80, width: width - 40 }}
                resizeMode={'contain'}
            />

            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', marginVertical: 20, paddingHorizontal: 20 }}>
                <Sae
                    value={this.state.name}
                    label={'Name'}
                    iconClass={Feather}
                    iconName={'user'}
                    iconColor={'black'}
                    inputStyle={{ fontFamily: 'Quicksand-Bold', color: 'black' }}
                    labelStyle={{ color: 'black', fontFamily: 'Quicksand-Bold' }}
                    onChangeText={(name) => this.setState({ name })}
                    onSubmitEditing={() => this.refs['1'].focus()}
                    returnKeyType={'next'}
                />

                <Sae
                    ref={'1'}
                    value={this.state.bank_name}
                    label={'Bank Name'}
                    iconClass={Feather}
                    iconName={'server'}
                    iconColor={'black'}
                    inputStyle={{ fontFamily: 'Quicksand-Bold', color: 'black' }}
                    labelStyle={{ color: 'black', fontFamily: 'Quicksand-Bold' }}
                    onChangeText={(bank_name) => this.setState({ bank_name })}
                    style={{ marginTop: 20 }}
                    onSubmitEditing={() => this.refs['2'].focus()}
                    returnKeyType={'next'}
                />

                <Sae
                    ref={'2'}
                    value={this.state.account_no}
                    label={'Account No.'}
                    iconClass={Feather}
                    iconName={'hash'}
                    iconColor={'black'}
                    inputStyle={{ fontFamily: 'Quicksand-Bold', color: 'black' }}
                    labelStyle={{ color: 'black', fontFamily: 'Quicksand-Bold' }}
                    onChangeText={(account_no) => this.setState({ account_no })}
                    style={{ marginTop: 20 }}
                    keyboardType={'numeric'}
                    onSubmitEditing={() => this.refs['3'].focus()}
                    returnKeyType={'next'}
                />

                <Sae
                    ref={'3'}
                    value={this.state.ifsc}
                    label={'IFSC Code'}
                    iconClass={Feather}
                    iconName={'hash'}
                    iconColor={'black'}
                    inputStyle={{ fontFamily: 'Quicksand-Bold', color: 'black' }}
                    labelStyle={{ color: 'black', fontFamily: 'Quicksand-Bold' }}
                    onChangeText={(ifsc) => this.setState({ ifsc })}
                    style={{ marginTop: 20 }}
                    onSubmitEditing={() => this.refs['4'].focus()}
                    returnKeyType={'next'}
                />

                <Sae
                    ref={'4'}
                    value={this.state.swift_code}
                    label={'Swift Code'}
                    iconClass={Feather}
                    iconName={'hash'}
                    iconColor={'black'}
                    inputStyle={{ fontFamily: 'Quicksand-Bold', color: 'black' }}
                    labelStyle={{ color: 'black', fontFamily: 'Quicksand-Bold' }}
                    onChangeText={(swift_code) => this.setState({ swift_code })}
                    style={{ marginTop: 20 }}
                    onSubmitEditing={() => this.refs['5'].focus()}
                    returnKeyType={'next'}
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