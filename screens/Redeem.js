import React, {Component} from 'react';
import {
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import Background from '../components/Background';
import MyText from "../components/MyText";
import Spinner from '../components/Spinner';
import API from "../components/API";

let spinner;

export default class Redeem extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Redeem`,
    });

    constructor(props) {
        super(props);

        this.state = {
            table: [
                {
                    coins: 50,
                    inr: 25,
                    usd: (25/60).toFixed(2)
                },
                {
                    coins: 100,
                    inr: 50,
                    usd: (50/60).toFixed(2)
                },
                {
                    coins: 500,
                    inr: 300,
                    usd: 5
                },
                {
                    coins: '1,000',
                    inr: 750,
                    usd: 12
                },
                {
                    coins: '2,500',
                    inr: '2,000',
                    usd: 33
                },
                {
                    coins: '5,000',
                    inr: '4,500',
                    usd: 74
                },
                {
                    coins: '12,000',
                    inr: '12,000',
                    usd: 197
                },
                {
                    coins: '20,000',
                    inr: '21,000',
                    usd: 344
                },
                {
                    coins: '35,000',
                    inr: '38,000',
                    usd: 631
                },
                {
                    coins: '50,000',
                    inr: '62,500',
                    usd: '1,025'
                },
                {
                    coins: '100,000',
                    inr: '130,000',
                    usd: '2,131'
                }
            ],
            user: {
                status: 0
            }
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user').then((user) => {
            user = JSON.parse(user);

            this.setState({ user });
        });
    }

    checkRedeem(kind) {
        let { navigate } = this.props.navigation;
        if(this.state.user.status === 1) {
            ToastAndroid.show('Activate your profile by collecting 100 coins first', ToastAndroid.SHORT);
        } else {
            spinner.loading();
            API.getTime((resp) => {
                if(resp.date) {
                    if(resp.date >= 26 && resp.date <= 28) {
                        spinner.loaded();
                        switch(kind) {
                            case 'paytm':
                                navigate('PayTM');
                                break;

                            case 'bank':
                                navigate('BankTransfer');
                                break;

                            case 'skrill':
                                navigate('Skrill');
                                break;

                            case 'paypal':
                                navigate('PayPal');
                                break;
                        }
                    } else {
                        spinner.loaded();
                        ToastAndroid.show('Redeem requests are accepted from 26th to 28th of every month.', ToastAndroid.LONG);
                    }
                }
            });
        }
    }

    render() {
        return <View style={{ flex: 1, padding: 10 }}>
            <Background />

            <ScrollView>
                <MyText style={{ color: 'black', fontSize: 18, textAlign: 'center', margin: 10 }}>Coins redeem table</MyText>
                <View style={{ backgroundColor: 'black', height: 1 }} />
                <View style={{ flexDirection: 'row', paddingVertical: 5, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>Coins</MyText></View>
                    <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>INR</MyText></View>
                    <View style={{ flex: 1 }}><MyText style={{ color: 'black' }}>USD</MyText></View>
                </View>
                <View style={{ backgroundColor: 'black', height: 1 }} />
                <FlatList
                    style={{ backgroundColor: 'white' }}
                    data={this.state.table}
                    renderItem={({item}) => {
                        return <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                            <View style={{ flex: 1 }}>
                                <MyText style={{ color: 'black' }}>{item.coins}</MyText>
                            </View>
                            <View style={{ flex: 1 }}>
                                <MyText style={{ color: 'black' }}>{item.inr}</MyText>
                            </View>
                            <View style={{ flex: 1 }}>
                                <MyText style={{ color: 'black' }}>{item.usd}</MyText>
                            </View>
                        </View>;
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ backgroundColor: 'black', height: 1 }} />
                    }}
                    keyExtractor={(item, index) => {
                        return index;
                    }}
                />
                <View style={{ backgroundColor: 'black', height: 1 }} />

                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity
                        style={{ marginVertical: 5, backgroundColor: '#7f1ded', padding: 10, alignItems: 'center' }}
                        onPress={() => this.checkRedeem('paytm')}
                    >
                        <MyText style={{ color: 'white' }}>PayTM</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginVertical: 5, backgroundColor: '#7f1ded', padding: 10, alignItems: 'center' }}
                        onPress={() => this.checkRedeem('bank')}
                    >
                        <MyText style={{ color: 'white' }}>Bank Transfer</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginVertical: 5, backgroundColor: '#7f1ded', padding: 10, alignItems: 'center' }}
                        onPress={() => this.checkRedeem('paypal')}
                    >
                        <MyText style={{ color: 'white' }}>PayPal</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginVertical: 5, backgroundColor: '#7f1ded', padding: 10, alignItems: 'center' }}
                        onPress={() => this.checkRedeem('skrill')}
                    >
                        <MyText style={{ color: 'white' }}>Skrill</MyText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Spinner ref={spin => spinner = spin} />
        </View>
    }
} 