import React, { Component } from 'react';
import {
    View,
    Image,
    ScrollView,
    AsyncStorage,
    Dimensions,
    Share,
    RefreshControl,
    TouchableOpacity,
    Alert,
    NativeModules
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    Card,
    Button
} from 'react-native-material-ui';
import RNAccountKit from 'react-native-facebook-account-kit';
import API from "../components/API";
import MyText from "../components/MyText";
import Background from "../components/Background";
import Firebase from 'react-native-firebase';

let { width } = Dimensions.get('window');

export default class Dashboard extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/home.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            wallet: {
                active: 0,
                passive: 0,
                activation: 0
            },
            isRefreshing: false,
            user: {
                status: 0,
                created_at: '',
                name: ''
            }
        }
    }

    onRefresh() {
        this.setState({isRefreshing: true});

        this.getData(() => {
            this.setState({isRefreshing: false});
        });
    }

    getData(cb) {
        API.wallet((resp) => {
            if(resp.id) {
                this.setState({
                    wallet: resp
                });
            }
            API.getMe((user) => {
                this.setState({ user });
                cb();
            });
        });
    }

    componentDidMount() {
        NativeModules.Tracking.callEvent();
        Firebase.analytics().setCurrentScreen('Dashboard');
        this.getData(() => {});
        AsyncStorage.getItem('user').then((user) => {
            user = JSON.parse(user);

            Firebase.analytics().setUserProperty('refer_id', user.refer_id);

            if(user.status === 1) {
                Alert.alert('Important', 'You need to earn 100 coins in 30 days to activate your account');
            }

            this.setState({ user });
        });
    }

    render() {
        let bar = null;
        let status = null;
        if(this.state.user.status === 1) {
            let now = new Date;
            now.setTime(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
            let days30 = 30 * 24 * 60 * 60 * 1000;
            let created_at = Date.parse(this.state.user.created_at);
            let diff = now.getTime() - created_at;
            let o_diff = diff;
            diff = days30 - diff;
            let one_day = (24 * 60 * 60 * 1000);
            if(diff < one_day) {
                diff = one_day;
            }
            let diff_days = (diff / one_day).toFixed(0);

            let fill = parseInt(((o_diff / one_day) / 30 * 100).toFixed(0));

            let remaining_activation = parseFloat((100 - this.state.wallet.activation).toFixed(2));

            bar = <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                <AnimatedCircularProgress
                    ref='circularProgress'
                    size={(width - 40) / 2}
                    width={10}
                    fill={fill}
                    tintColor="#FD0F0F"
                    backgroundColor="#646301"
                >
                    {
                        (fill) => (
                            <MyText style={{ textAlign: 'center', paddingHorizontal: 5 }}>
                                {diff_days} days remaining
                            </MyText>
                        )
                    }
                </AnimatedCircularProgress>
                <AnimatedCircularProgress
                    ref='circularProgress'
                    size={(width - 40) / 2}
                    width={10}
                    fill={100 - remaining_activation}
                    tintColor="#FD0F0F"
                    backgroundColor="#646301"
                >
                    {
                        (fill) => (
                            <MyText style={{ textAlign: 'center', paddingHorizontal: 5 }}>
                                { remaining_activation } coins remaining
                            </MyText>
                        )
                    }
                </AnimatedCircularProgress>
            </View>;

            status = <View style={{ padding: 10 }}>
                <MyText style={{ color: 'red', textAlign: 'center' }}>Your account status is: Incomplete</MyText>
                <MyText style={{ color: 'black', textAlign: 'center', marginTop: 5 }}>Complete the challenge to activate your account</MyText>
            </View>;
        } else {
            status = <View style={{ padding: 10 }}>
                <MyText style={{ color: 'green', textAlign: 'center' }}>Your account status is: Active</MyText>
            </View>;
        }
        let logout = <TouchableOpacity
            onPress={() => {
                RNAccountKit.logout()
                    .then(() => {
                        alert('Done');
                    })

            }}
        >
            <MyText>Logout</MyText>
        </TouchableOpacity>;

        return <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Background/>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Image
                        source={require('../assets/images/home.png')}
                        style={{ height: 20, width: 20 }}
                    />
                    <MyText style={{ color: 'black', fontSize: 18, margin: 5 }}> Dashboard </MyText>
                    <Image
                        source={require('../assets/images/home.png')}
                        style={{ height: 20, width: 20 }}
                    />
                </View>

                <Card
                    onPress={() => {
                        let message = "🔥 EENDEALS App 🔰  \n" +
                            "✅ EEN DEALS'S No. 1 Auto Income App\n" +
                            " Collect  100 Coins & Start Your Income 😍😇🤑\n" +
                            "         💯 % Daily Income 💲\n" +
                            "        😍 Lifetime Guaranteed ✔\n" +
                            "🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺\n" +
                            "\n" +
                            "🙇🏻‍♂Cant Get Joinings 🙇🏻‍♂\n" +
                            "\n" +
                            "👨‍👩‍👧‍👦👨‍👩‍👧‍👦👩‍👩‍👦No PROBLEM !!!! We will make your team👨‍👩‍👧‍👦👩‍👩‍👦👨‍👩‍👧‍👦\n" +
                            "\n" +
                            "🕺🏻Join Fast 🕺🏻\n" +
                            "\n" +
                            "⭐1st come 1st serve \n" +
                            "\n" +
                            "  🏆👇  Earning Options:  👇🏆\n" +
                            "\n" +
                            "1.\tDirect Refer \n" +
                            "\n" +
                            "2.\tApp Install\n" +
                            "\n" +
                            "3.\tVideo Watching\n" +
                            "\n" +
                            "4.\tMagic Box\n" +
                            "\n" +
                            "5.\tPlaying Quiz ( Direct Paytm Cash)\n" +
                            "\n" +
                            "6.\tComplete Tasks \n" +
                            "          a. FB Like\n" +
                            "\n" +
                            "          b. YouTube like/subscribe\n" +
                            "\n" +
                            "          c. Upload Bills\n" +
                            "\n" +
                            "          d. Instagram Follow\n" +
                            "\n" +
                            "7. Purchase from Amazone/Flipkart etc \n" +
                            "\n" +
                            "…       …… ETC\n" +
                            "\n" +
                            "🔹 Auto income से कमाओ 😍👇\n" +
                            "🔹 Refer Your Friends & Earn Income Up To 10 Levels 😍\n" +
                            "\n" +
                            "🌎 Lifetime 10 Level Income 🌎\n" +
                            "\n" +
                            "🔥 Level  1⃣ ➖ 40\n" +
                            "🔥 Level  2⃣ ➖ 175\n" +
                            "🔥 Level  3⃣ ➖ 750\n" +
                            "🔥 Level  4⃣ ➖ 3125\n" +
                            "🔥 Level  5⃣ ➖ 12500\n" +
                            "🔥 Level  6⃣ ➖ 62,500\n" +
                            "🔥 Level  7⃣ ➖ 2,34,375\n" +
                            "🔥 Level  8⃣ ➖ 1,17,1875\n" +
                            "🔥 Level  9⃣ ➖ 5,89,375\n" +
                            "🔥 Level  🔟 ➖ 3,90,62,500\n" +
                            "\n" +
                            "   ✅ EENDEALS Income Plan ✅\n" +
                            "\n" +
                            "🛑 Auto joining Se Apki Team AUTOMATICALLY ban jayegi.😍\n" +
                            "Apki upline ka koi bhi refer apke hi under automatic ayega\n" +
                            "Join Fast \n" +
                            "Download now\n" +
                            "⭕ Eendeals App: https://play.google.com/store/apps/details?id=net.eendeals\n" +
                            "My refer ID is " + this.state.user.refer_id;
                        Share.share({
                            message: message,
                            title: 'Join Eendeals'
                        });
                    }}
                >
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MyText style={{ color: 'black', fontSize: 16 }}>{this.state.user.name}</MyText>
                        <MyText style={{ color: 'black', fontSize: 16 }}>Refer ID: {this.state.user.refer_id}</MyText>
                    </View>
                </Card>

                <View style={{ marginTop: 10 }}>
                    <MyText style={{ fontSize: 16, color: 'black', textAlign: 'center' }}>Wallet Details:</MyText>

                    <View style={{ height: 80, flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: 'black', borderTopWidth: 1 }}
                            onPress={() => {
                                this.props.navigation.navigate('WalletDetails', { type: 'active' })
                            }}
                        >
                            <MyText style={{ fontSize: 30, color: '#333' }}>{this.state.wallet.active}</MyText>
                            <MyText>Active</MyText>
                        </TouchableOpacity>
                        <View style={{ height: 80, width: 1, backgroundColor: 'black' }} />
                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: 'black', borderTopWidth: 1 }}
                            onPress={() => {
                                this.props.navigation.navigate('WalletDetails', { type: 'passive' })
                            }}
                        >
                            <MyText style={{ fontSize: 30, color: '#333' }}>{this.state.wallet.passive}</MyText>
                            <MyText>Passive</MyText>
                        </TouchableOpacity>
                    </View>

                    <Card
                        onPress={() => {
                            this.props.navigation.navigate('HowItWorks');
                        }}
                    >
                        <View style={{ padding: 10 }}>
                            <MyText style={{ color: 'black', textAlign: 'center' }}>Click here to learn more</MyText>
                        </View>
                    </Card>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Redeem');
                        }}
                        style={{ backgroundColor: '#7f1ded', padding: 10, alignItems: 'center', justifyContent: 'center', margin: 6 }}
                    >
                        <MyText style={{ color: 'white' }}>Redeem</MyText>
                    </TouchableOpacity>

                    {status}

                    {bar}

                </View>
            </ScrollView>
        </View>
    }
}