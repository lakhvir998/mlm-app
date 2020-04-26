import React, { Component } from 'react';
import {
    StackNavigator,
    DrawerNavigator,
    TabNavigator
} from 'react-navigation';
import NavigatorService from './services/navigator';
import {
    View,
    NativeModules,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial
} from 'react-native-admob';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Firebase from 'react-native-firebase';
import Login from "./screens/Login";
import Register from "./screens/Register";
import VerifyOTP from "./screens/VerifyOTP";
import Refer from "./screens/Refer";
import Deals from "./screens/Deals";
import Offers from "./screens/Offers";
import Videos from "./screens/Videos";
import Quiz from "./screens/Quiz";
import Wall from "./screens/Wall";
import Products from "./screens/Products";
import Tasks from "./screens/Tasks";
import TreeView from "./screens/TreeView";
import Dashboard from "./screens/Dashboard";
import QuizAttempt from "./screens/QuizAttempt";
import WalletDetails from "./screens/WalletDetails";
import LevelView from "./screens/LevelView";
import HowItWorks from "./screens/HowItWorks";
import Redeem from "./screens/Redeem";
import PayTM from "./screens/PayTM";
import BankTransfer from "./screens/BankTransfer";
import PayPal from "./screens/PayPal";
import Skrill from "./screens/Skrill";

let intervalHandler;

const Home = TabNavigator(
    {
        Dashboard: {
            getScreen: () => require('./screens/Dashboard').default,
            path: 'Dashboard'
        },
        Deals: {
            getScreen: () => require('./screens/Deals').default,
            path: 'Deals'
        },
        Offers: {
            getScreen: () => require('./screens/Offers').default,
            path: 'Offers'
        },
        Videos: {
            getScreen: () => require('./screens/Videos').default,
            path: 'Videos'
        },
        Quiz: {
            getScreen: () => require('./screens/Quiz').default,
            path: 'Quiz'
        },
        Wall: {
            getScreen: () => require('./screens/Wall').default,
            path: 'Wall'
        },
        Game: {
            getScreen: () => require('./screens/Game').default,
            path: 'Game'
        },
        Products: {
            getScreen: () => require('./screens/Products').default,
            path: 'Products'
        },
        Tasks: {
            getScreen: () => require('./screens/Tasks').default,
            path: 'Tasks'
        },
        TreeView: {
            getScreen: () => require('./screens/TreeView').default,
            path: 'TreeView'
        }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            scrollEnabled: true,
            style: {
                backgroundColor: '#b1af13'
            },
            labelStyle: {
                fontFamily: 'Quicksand-Bold'
            },
            showIcon: true,
            tabStyle: {
                flexDirection: 'row'
            },
            activeTintColor: '#000',
            inactiveTintColor: '#393939'
        }
    }
);

class HomeWrapper extends Component {
    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount() {
        NativeModules.HeyZap.startHeyZap();
        NativeModules.IronSrc.startIronSrc();
        console.log(this.props.screenProps);
    }

    render() {
        return <View style={{ flex: 1 }}>
            <Home 
                navigation={this.props.navigation} 
                screenProps={this.props.screenProps}
            />
            <AdMobBanner
                bannerSize="smartBannerLandscape"
                adUnitID="ca-app-pub-7827682591398223/2045705922"
                testDeviceID="6D3F7AA575DF46BEF53A5CABB2B6A1DC"
            />
        </View>
    }
}

HomeWrapper.router = Home.router;

const Inside = DrawerNavigator(
    {
        Home: {
            screen: HomeWrapper
        },
        Dashboard: {
            screen: Dashboard
        },
        Deals: {
            screen: Deals
        },
        Offers: {
            screen: Offers
        },
        Videos: {
            screen: Videos
        },
        Quiz: {
            screen: Quiz
        },
        Wall: {
            screen: Wall
        },
        Products: {
            screen: Products
        },
        Tasks: {
            screen: Tasks
        },
        TreeView: {
            screen: TreeView
        }
    }
);

class InsideWrapper extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#B1AF13'
        },
        headerTitleStyle: {
            fontFamily: 'Quicksand-Bold'
        }
    };

    render() {
        let props = this.props.screenProps;
        return <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={'#918f10'}
            />
            <Inside
                ref={navigatorRef => {
                    NavigatorService.setContainer(navigatorRef);
                }}
                navigation={this.props.navigation}
                screenProps={this.props.screenProps}
            />
        </View>
    }
}

InsideWrapper.router = Inside.router;

const App = StackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        },
        VerifyOTP: {
            screen: VerifyOTP
        },
        Refer: {
            screen: Refer
        },
        Inside: {
            screen: InsideWrapper
        },
        QuizAttempt: {
            screen: QuizAttempt
        },
        WalletDetails: {
            screen: WalletDetails
        },
        LevelView: {
            screen: LevelView
        },
        HowItWorks: {
            screen: HowItWorks
        },
        Redeem: {
            screen: Redeem
        },
        PayTM: {
            screen: PayTM
        },
        BankTransfer: {
            screen: BankTransfer
        },
        PayPal: {
            screen: PayPal
        },
        Skrill: {
            screen: Skrill
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerLeft: <TouchableOpacity
                onPress={() => navigation.navigate('DrawerOpen')}
                style={{ marginLeft: 10 }}
            >
                <Icon name="menu" size={30} color="#000000" />
            </TouchableOpacity>
        })
    }
);

class AppWrapper extends Component {
    startInterstitialInterval() {
        AdMobInterstitial.getAdUnitId((id) => {
            if(id === null){
                AdMobInterstitial.setAdUnitID('ca-app-pub-7827682591398223/9139982912');
                AdMobInterstitial.setTestDeviceID('6D3F7AA575DF46BEF53A5CABB2B6A1DC');
                clearInterval(intervalHandler);
                intervalHandler = setInterval(() => {
                    AdMobInterstitial.requestAd(err => AdMobInterstitial.showAd());
                }, 45000);
            } else {
                clearInterval(intervalHandler);
                intervalHandler = setInterval(() => {
                    AdMobInterstitial.requestAd(err => AdMobInterstitial.showAd());
                }, 45000);
            }
        });
    }

    showInterstitial() {
        AdMobInterstitial.getAdUnitId((id) => {
            if(id === null){
                AdMobInterstitial.setAdUnitID('ca-app-pub-7827682591398223/9139982912');
                AdMobInterstitial.setTestDeviceID('6D3F7AA575DF46BEF53A5CABB2B6A1DC');
                AdMobInterstitial.requestAd(err => AdMobInterstitial.showAd());
            } else {
                AdMobInterstitial.requestAd(err => AdMobInterstitial.showAd());
            }
        });
    }

    stopInterstitial() {
        clearInterval(intervalHandler);
    }

    render() {
        Firebase.analytics().setAnalyticsCollectionEnabled(true);
        return <App
            screenProps={{
                showInterstitial: this.showInterstitial,
                stopInterstitial: this.stopInterstitial,
                startInterstitialInterval: this.startInterstitialInterval
            }}
        />;
    }
}

AppWrapper.router = App.router;

export default AppWrapper;