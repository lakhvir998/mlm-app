import React, {Component} from 'react';
import {
    View,
    Image,
    NativeModules,
    ToastAndroid
} from 'react-native';
import {
    Button
} from 'react-native-material-ui';
import MyText from "../components/MyText";

export default class MagicBox extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/magic.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    render() {
        let { Kip } = NativeModules;
        return <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../assets/images/magic.png')}
                    style={{ height: 20, width: 20 }}
                />
                <MyText style={{ color: 'black', fontSize: 18, margin: 5 }}> Magic Box </MyText>
                <Image
                    source={require('../assets/images/magic.png')}
                    style={{ height: 20, width: 20 }}
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#FFF', padding: 10 }}>
                    <Button
                        text={'Open Magic Box'}
                        raised
                        primary
                        onPress={() => {
                            ToastAndroid.show('Your MagicBox is loading', ToastAndroid.SHORT);
                            Kip.callMoment();
                        }}
                    />
                </View>
            </View>
        </View>
    }
} 