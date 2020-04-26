import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ToastAndroid
} from 'react-native';
import { Sae } from 'react-native-textinput-effects';
import FA from 'react-native-vector-icons/FontAwesome';
import { SegmentedControls } from 'react-native-radio-buttons';
import MyText from "../components/MyText";
import API from "../components/API";

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

export default class Register extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            mobile: '',
            password: '',
            gender: '',
            genderOption: ''
        }
    }

    register() {
        API.register(this.state, (resp) => {
           if(resp.errors) {
               let k = Object.keys(resp.errors);
               let error = k[0];
               ToastAndroid.show(`${error} ${resp.errors[k[0]]}`, ToastAndroid.SHORT);
           } else if(resp.id) {
               this.props.navigation.navigate('VerifyOTP');
           } else {
               ToastAndroid.show(resp.error, ToastAndroid.SHORT);
           }
        });
    }

    render() {
        return <View
            style={{ flex: 1 }}
        >
            <StatusBar
                hidden={true}
            />
            <Image
                source={require('../assets/images/register.jpg')}
                style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }}
                blurRadius={2}
            />

            <Image
                source={require('../assets/images/logo.png')}
                style={{ height: 100, width: 100, alignSelf: 'center', marginTop: 20 }}
                resizeMode={'contain'}
            />

            <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
                <Sae
                    ref={'1'}
                    label={'Name'}
                    iconClass={FA}
                    iconName={'phone'}
                    iconColor={'white'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    labelStyle={{ color: 'white' }}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                />

                <Sae
                    ref={'2'}
                    label={'Mobile Number'}
                    iconClass={FA}
                    iconName={'phone'}
                    iconColor={'white'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    labelStyle={{ color: 'white' }}
                    keyboardType={'phone-pad'}
                    maxLength={10}
                    value={this.state.mobile}
                    onChangeText={(mobile) => this.setState({ mobile })}
                />

                <Sae
                    ref={'3'}
                    label={'Password'}
                    iconClass={FA}
                    iconName={'key'}
                    iconColor={'white'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    labelStyle={{ color: 'white' }}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                />

                <View
                    style={{ marginTop: 15 }}
                >
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

                <TouchableOpacity
                    style={{ height: 48, flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', marginTop: 20 }}
                    onPress={() => {
                        // this.props.navigation.navigate('VerifyOTP');
                        this.register();
                    }}
                >
                    <MyText style={{ color: 'white', fontSize: 18 }}>Register</MyText>
                </TouchableOpacity>
            </ScrollView>

        </View>
    }
}