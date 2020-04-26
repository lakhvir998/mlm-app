import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    RefreshControl,
    ToastAndroid,
    AsyncStorage,
    Linking,
    Alert
} from 'react-native';
import {
    Button,
    Card
} from 'react-native-material-ui';
import GAID from 'react-native-gaid';
import ImagePicker from 'react-native-image-picker';
import MyText from "../components/MyText";
import Background from "../components/Background";
import API from "../components/API";
import Firebase from 'react-native-firebase';

export default class Deals extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/giftbox.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            deals: [],
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
        Firebase.analytics().setCurrentScreen('Deals');
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

        API.getDeals((deals) => {
                this.setState({
                    isRefreshing: false
                });
                if(deals.error) {
                    ToastAndroid.show(deals.error, ToastAndroid.SHORT);
                } else {
                    this.setState({
                        deals: deals,
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

    imagePicker(id) {
        let options = {
            title: 'Select Deal Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                let source = 'data:image/jpeg;base64,' + response.data;
                API.uploadDeal(id, source, (resp) => {
                    if(resp.status) {
                        ToastAndroid.show('Deal submitted', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('There was some error, please try again in some time', ToastAndroid.SHORT);
                    }
                });
            }
        });
    }

    fetchDeals() {
        let { deals, page, canLoad } = this.state;
        if(canLoad) {
            API.getDeals((resp) => {
                if(resp.error) {
                    ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                } else {
                    if(resp.length > 0) {
                        this.setState({
                            deals: page === 1 ? resp : [...deals, ...resp],
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
                    source={require('../assets/images/giftbox.png')}
                    style={{ height: 20, width: 20 }}
                />
                <MyText style={{ color: 'black', fontSize: 18, margin: 5 }}> Latest Deals </MyText>
                <Image
                    source={require('../assets/images/giftbox.png')}
                    style={{ height: 20, width: 20 }}
                />
            </View>

            <Card>
                <MyText style={{padding: 10, color: '#333', textAlign: 'center'}}>After the purchase kindly
                    upload the bill screenshot to the admin for coins approval</MyText>
            </Card>

            <FlatList
                data={this.state.deals}
                renderItem={({item}) => {
                    return <View style={{ flex: 1, margin: 5, backgroundColor: '#FFF', padding: 5, elevation: 5 }}>
                        <Image
                            source={{uri: `${API.base_url}${item.image}`}}
                            style={{height: 70, alignSelf: 'center', width: 70}}
                            resizeMode={'contain'}
                        />
                        <Text style={{ color: '#333', marginTop: 5, textAlign: 'center' }}>{item.name}</Text>

                        <Button
                            raised
                            primary
                            text={'Info'}
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
                                        }},
                                    { text: 'Upload', onPress: () => {
                                            this.imagePicker(item.id);
                                        }}
                                ]);
                            }}
                        />
                    </View>
                }}
                keyExtractor={(item, index) => {
                    return index;
                }}
                numColumns={2}
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 2.5 }} />
                }}
                onEndReached={() => {
                    this.fetchDeals();
                }}
                onEndThreshold={0}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
            />
        </View>
    }
} 