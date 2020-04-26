import React, { Component } from 'react';
import {
    FlatList,
    Image,
    Linking,
    ScrollView,
    Text,
    ToastAndroid,
    View,
    AsyncStorage,
    RefreshControl,
    Alert
} from 'react-native';
import {
    Button
} from "react-native-material-ui";
import GAID from 'react-native-gaid';
import MyText from "../components/MyText";
import API from "../components/API";
import Background from "../components/Background";
import Firebase from 'react-native-firebase';

export default class Offers extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/discount.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            offers: [],
            isRefreshing: false,
            user: {
                id: 0
            },
            gaid: 0,
            page: 2,
            canLoad: true
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('Offers');
        this.onRefresh();

        AsyncStorage.getItem('user').then((user) => {
            user = JSON.parse(user);
            this.setState({ user });
        });

        GAID.getAdvertisingInfo().then(info => {
            this.setState({
                gaid: info.advertisingId
            });
        });
    }

    onRefresh() {
        this.setState({
            isRefreshing: true
        });

        API.getOffers((offers) => {
                this.setState({
                    isRefreshing: false
                });
                if(offers.error) {
                    ToastAndroid.show(offers.error, ToastAndroid.SHORT);
                } else {
                    this.setState({
                        offers: offers,
                        page: 2,
                        canLoad: true
                    });
                }
            }
        )
    }

    parseString(string, data) {
        return string.replace(
            /%(\w*)%/g,
            function( m, key ){
                return data.hasOwnProperty( key ) ? data[ key ] : "";
            }
        );
    }

    fetchOffers() {
        let { offers, page, canLoad } = this.state;
        if(canLoad) {
            API.getOffers((resp) => {
                if(resp.error) {
                    ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                } else {
                    if(resp.length > 0) {
                        this.setState({
                            offers: page === 1 ? resp : [...offers, ...resp],
                            page: page + 1
                        });
                    } else {
                        this.setState({
                            canLoad: false
                        });
                    }
                }
            }, page);
        }
    }

    render() {
        let user_id = this.state.user.id;
        let gaid = this.state.gaid;
        return <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Background/>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Image
                    source={require('../assets/images/discount.png')}
                    style={{height: 20, width: 20}}
                />
                <MyText style={{color: 'black', fontSize: 18, margin: 5}}> Exciting Offers </MyText>
                <Image
                    source={require('../assets/images/discount.png')}
                    style={{height: 20, width: 20}}
                />
            </View>

            <FlatList
                data={this.state.offers}
                renderItem={({item}) => {
                    return <View style={{flex: 1, margin: 5, backgroundColor: '#FFF', padding: 5, elevation: 5}}>
                        <Image
                            source={{uri: `${API.base_url}${item.image}`}}
                            style={{height: 70, alignSelf: 'center', width: 70}}
                            resizeMode={'contain'}
                        />

                        <Text style={{color: '#333', marginTop: 5, textAlign: 'center'}}>{item.name}</Text>

                        <Button
                            raised
                            primary
                            text={`${item.amount} C`}
                            style={{container: {marginTop: 10}}}
                            onPress={() => {
                                let url = this.parseString(item.link, {
                                    user_id: user_id,
                                    offer_id: item.id,
                                    gaid: gaid
                                });
                                Alert.alert(item.name, item.instructions, [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'Open', onPress: () => {
                                            Linking.canOpenURL(url).then(supported => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + url);
                                                } else {
                                                    return Linking.openURL(url);
                                                }
                                            }).catch(err => console.error('An error occurred', err));
                                        }}
                                ]);
                            }}
                        />
                    </View>
                }}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                numColumns={2}
                ItemSeparatorComponent={() => {
                    return <View style={{height: 2.5}}/>
                }}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
                onEndReached={() => {
                    this.fetchOffers();
                }}
                onEndThreshold={0}
            />
        </View>
    }
}