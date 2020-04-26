import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    StatusBar,
    TouchableWithoutFeedback,
    ToastAndroid,
    AsyncStorage,
    Animated,
    Easing,
    NativeModules
} from 'react-native';
import { Sae } from 'react-native-textinput-effects';
import FA from 'react-native-vector-icons/FontAwesome';
import MyText from "../components/MyText";
import API from "../components/API";
import { NavigationActions } from 'react-navigation';
import RNAccountKit from 'react-native-facebook-account-kit';
import { SegmentedControls } from 'react-native-radio-buttons';
import Spinner from "../components/Spinner";
import Firebase from 'react-native-firebase';

let spinner;
let { height, width } = Dimensions.get('window');

const options = [
    {
        label: 'Male',
        value: 'male'
    },
    {
        label: 'Female',
        value: 'female'
    }
];

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: '',
            genderOption: '',
            registerWidth: new Animated.Value(0),
            middleWidth: new Animated.Value(0),
            borderWidth: new Animated.Value(0)

        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('Login');
        this.cad();
        RNAccountKit.getCurrentAccessToken()
            .then((token) => {
                if(token) {
                    spinner.loading();
                    API.authorize(token.token, (resp) => {
                        spinner.loaded();
                        if(resp.errors) {
                            let k = Object.keys(resp.errors);
                            let error = k[0];
                            ToastAndroid.show(`${error} ${resp.errors[k[0]]}`, ToastAndroid.SHORT);
                            this.logout();
                        } else if(resp.id) {
                            API.updateToken(resp.authentication_token, resp.mobile);
                            AsyncStorage.setItem('user', JSON.stringify(resp)).then(() => {
                                this.checkAndSend(resp);
                            });
                        } else {
                            ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                            this.logout();
                        }
                    });
                }
            });
    }

    cad() {
        setTimeout(() => {
            Animated.timing(
                this.state.registerWidth,
                {
                    toValue: (width - 44) / 2,
                    duration: 2000,
                    easing: Easing.bounce
                }
            ).start();

            Animated.timing(
                this.state.middleWidth,
                {
                    toValue: 10,
                    duration: 2000
                }
            ).start();

            Animated.timing(
                this.state.borderWidth,
                {
                    toValue: 1,
                    duration: 1000
                }
            ).start();
        }, 700);
    }

    checkAndSend(resp) {
        this.props.screenProps.startInterstitialInterval();
        if(resp.sponsor_id === null || resp.sponsor_id.length === 0) {
            NativeModules.JoyTap.setUserId(resp.id.toString());
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Refer'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            NativeModules.JoyTap.setUserId(resp.id.toString());
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Inside'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    logout() {
        RNAccountKit.logout()
            .then(() => {
            });
    }

    hideKeyboard() {
        let refs = ['0'];
        refs.forEach((ref) => {
            this.refs[ref].blur();
        });
    }

    accountKit() {
        RNAccountKit.loginWithPhone()
            .then((token) => {
                if (!token) {
                } else {
                    API.register({
                        name: this.state.name,
                        gender: this.state.gender,
                        access_token: token.token,
                        app_id: token.appId
                    }, (resp) => {
                        spinner.loaded();
                        if(resp.errors) {
                            let k = Object.keys(resp.errors);
                            let error = k[0];
                            ToastAndroid.show(`${error} ${resp.errors[k[0]]}`, ToastAndroid.SHORT);
                        } else if(resp.id) {
                            API.updateToken(resp.authentication_token, resp.mobile);
                            AsyncStorage.setItem('user', JSON.stringify(resp)).then(() => {
                                this.checkAndSend(resp);
                            });
                        } else {
                            ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }

    login(onlyLogin = false) {
        let { name, gender } = this.state;
        if(name.length > 0 && gender.length >= 4) {
            this.accountKit();
        } else if(onlyLogin) {
            this.accountKit();
        } else {
            ToastAndroid.show('Kindly fill the form', ToastAndroid.SHORT);
            spinner.loaded();
        }
    }

    render() {
        let { registerWidth, middleWidth, borderWidth } = this.state;
        return <TouchableWithoutFeedback
            style={{ flex: 1, justifyContent: 'space-around' }}
            onPress={() => {
                this.hideKeyboard();
            }}
        >
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <StatusBar
                    hidden={false}
                />
                <Image
                    source={require('../assets/images/back.jpeg')}
                    style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }}
                    blurRadius={2}
                />
                <Image
                    source={require('../assets/images/logo.png')}
                    style={{ height: 100, width: 100, alignSelf: 'center' }}
                    resizeMode={'contain'}
                />

                <View style={{ marginHorizontal: 20 }}>
                    <Sae
                        ref={'0'}
                        label={'Name'}
                        iconClass={FA}
                        iconName={'user'}
                        iconColor={'white'}
                        autoCorrect={false}
                        labelStyle={{ color: 'white', fontFamily: 'Quicksand-Bold' }}
                        inputStyle={{ fontFamily: 'Quicksand-Bold' }}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                    />

                    <View
                        style={{ marginTop: 15 }}
                    >
                        <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 12, marginBottom: 10 }}>Gender</Text>
                        <SegmentedControls
                            options={ options }
                            tint={'#857E78'}
                            selectedTint= {'white'}
                            backTint= {'#4d4d4d'}
                            paddingTop={10}
                            paddingBottom={10}
                            onSelection={(selection, index) => {
                                this.setState({
                                    gender: selection.value,
                                    genderOption: selection
                                });
                            }}
                            selectedOption={this.state.genderOption}
                            extractText={ (option) => option.label }
                        />
                    </View>

                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ height: 48, flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}
                            onPress={() => {
                                spinner.loading();
                                this.login();
                            }}
                        >
                            <MyText style={{ color: 'white', fontSize: 18 }}>Register</MyText>
                        </TouchableOpacity>

                        <Animated.View style={{ width: middleWidth }}>
                        </Animated.View>

                        <Animated.View style={{ width: registerWidth, opacity: borderWidth }}>
                            <TouchableOpacity
                                style={{ height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}
                                onPress={() => {
                                    this.login(true);
                                }}
                            >
                                <MyText style={{ color: 'white', fontSize: 18, height: 25 }}>Login</MyText>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                </View>
            <Spinner ref={(spin) => spinner = spin} />
            </View>
        </TouchableWithoutFeedback>
    }
} 