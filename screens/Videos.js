import React, {Component} from 'react';
import {
    View,
    Image,
    NativeModules,
    ToastAndroid,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import {
    Card
} from 'react-native-material-ui';
import MyText from "../components/MyText";
import API from "../components/API";
import Background from "../components/Background";
import Firebase from 'react-native-firebase';
import {
    AdMobInterstitial
} from 'react-native-admob';

export default class Videos extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/play.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            limit: {
                video1: 0,
                video2: 0
            },
            setting: {
                ppv1_limit: 0,
                ppv2_limit: 0
            },
            isRefreshing: false,
            ad_view: false
        }
    }

    onRefresh() {
        this.setState({
            isRefreshing: true
        });

        this.loadData(() => {
            this.setState({
                isRefreshing: false
            });
        });
    }

    loadData(cb) {
        API.settings((resp) => {
            let settings = {
                ppv1_limit: 0,
                ppv2_limit: 0
            };

            new Promise((resolve, reject) => {
                resp.forEach((setting, index) => {
                    if(setting.name === 'ppv1_limit') {
                        settings.ppv1_limit = setting.value
                    } else if(setting.name === 'ppv2_limit') {
                        settings.ppv2_limit = setting.value
                    }

                    if(index + 1 === resp.length) {
                        resolve();
                    }
                });
            }).then(() => {
                this.setState({
                    setting: settings
                });

                API.limits((resp2) => {
                    if(resp2.id) {
                        this.setState({
                            limit: resp2
                        });
                    }
                });

                cb();
            });
        });
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('Videos');

        DeviceEventEmitter.addListener('interstitialDidClose', () => {
            if(this.state.ad_view) {
                this.setState({
                    ad_view: false
                });
                this.viewAd();
            }
        });

        this.loadData(() => {});
    }

    viewAd() {
        let { HeyZap } = NativeModules;
        HeyZap.showAd(() => {
            this.video1();
            AdMobInterstitial.requestAd(err => AdMobInterstitial.showAd());
        });
    }

    video1() {
        API.video1((resp) => {
            if(resp.id) {
                ToastAndroid.show('Video rewarded', ToastAndroid.SHORT);
                this.setState({
                    limit: resp
                });
            }
        });
    }

    render() {
        return <View>
            <Background/>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
            >
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/images/play.png')}
                            style={{ height: 20, width: 20 }}
                        />
                        <MyText style={{ color: 'black', fontSize: 18, margin: 5 }}> Watch Videos </MyText>
                        <Image
                            source={require('../assets/images/play.png')}
                            style={{height: 20, width: 20}}
                        />
                    </View>

                    <View style={{ marginVertical: 30 }}>
                        <Card>
                            <View style={{ padding: 10 }}>
                                <MyText style={{ color: 'black', textAlign: 'center' }}>Remaining Video
                                    1: {parseInt(this.state.setting.ppv1_limit) - parseInt(this.state.limit.video1)}</MyText>
                            </View>
                        </Card>
                    </View>

                    <View style={{ backgroundColor: '#FFF', padding: 10, marginVertical: 30, elevation: 5 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#7F1DED', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 5, elevation: 5 }}
                            onPress={() => {
                                this.setState({
                                    ad_view: true
                                });
                                AdMobInterstitial.requestAd(err => AdMobInterstitial.showAd());
                            }}
                        >
                            <Image
                                source={require('../assets/images/heyzap_logo.png')}
                                style={{ height: 30 }}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#FFF', padding: 10, marginVertical: 30, elevation: 5 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#7F1DED', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 5, elevation: 5 }}
                            onPress={() => {
                                NativeModules.JoyTap.showAd(() => {
                                    ToastAndroid.show('Done', ToastAndroid.SHORT);
                                }, () => {
                                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                                });
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
            </ScrollView>
        </View>
    }
} 