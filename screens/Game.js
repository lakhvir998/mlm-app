import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import Firebase from 'react-native-firebase';
import Background from "../components/Background";
import MyText from "../components/MyText";
import {Card} from "react-native-material-ui";

export default class Game extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/game.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('Game');
    }

    render() {
        return <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
            <Background />

            <Card>
                <MyText style={{ color: '#333', margin: 10, textAlign: 'center' }}>Download and play games to earn coins!</MyText>
            </Card>


            <View style={{ padding: 20, marginVertical: 30 }}>

                <TouchableOpacity
                    style={{ backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 5, elevation: 5 }}
                    onPress={() => {
                        Linking.openURL('https://play.google.com/store/apps/details?id=com.game_puzzle');
                    }}
                >
                    <Image
                        source={require('../assets/images/2048.png')}
                        style={{ height: 30, width: 30 }}
                        resizeMode={'contain'}
                    />
                    <MyText style={{ color: 'black', marginLeft: 10 }}>2048</MyText>
                </TouchableOpacity>

            </View>
        </View>;
    }
}