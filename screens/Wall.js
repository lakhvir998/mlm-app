import React, {Component} from 'react';
import {
    View,
    NativeModules,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Background from "../components/Background";
import Firebase from 'react-native-firebase';

export default class Wall extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/offer.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        },
        tabBarLabel: 'Offer Wall'
    };

    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: 0
            }
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('OfferWall');
        AsyncStorage.getItem('user')
            .then(user => {
                user = JSON.parse(user);
                this.setState({ user });
            });
    }

    render() {
        let { JoyTap, Rubicko } = NativeModules;
        return <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
            <Background/>
            <View style={{ padding: 20, marginVertical: 30 }}>

                <TouchableOpacity
                    style={{ backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 5, elevation: 5 }}
                    onPress={() => {
                        Rubicko.showWall(this.state.user.id.toString());
                    }}
                >
                    <Image
                        source={require('../assets/images/rubicko.png')}
                        style={{ height: 30 }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 5, elevation: 5 }}
                    onPress={() => {
                        JoyTap.showWall();
                    }}
                >
                    <Image
                        source={require('../assets/images/tapjoy_logo.png')}
                        style={{ height: 30 }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>

            </View>
        </View>
    }
} 