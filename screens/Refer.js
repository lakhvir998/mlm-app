import React, {Component} from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    Alert,
    StatusBar,
    ToastAndroid,
    NativeModules
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import MyText from "../components/MyText";
import Spinner from "../components/Spinner";
import API from '../components/API';
import Firebase from 'react-native-firebase';

let spinner;

export default class Refer extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            n1: '',
            n2: '',
            n3: '',
            n4: '',
            n5: '',
            n6: '',
            ids: []
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('Refer');
        API.getSponsors((resp) => {
            if(resp.ids) {
                this.setState({
                    ids: resp.ids
                });
            } else {
                ToastAndroid.show(resp.error, ToastAndroid.SHORT);
            }
        });
    }

    checkSponsor() {
        let { n1, n2, n3, n4, n5, n6 } = this.state;
        let refer_id = n1 + n2 + n3 + n4 + n5 + n6;
        if(refer_id.length === 6) {
            spinner.loading();
            API.selectSponsor({
                refer_id: refer_id
            }, (resp) => {
                spinner.loaded();
                if(resp.status) {
                    Alert.alert(
                        'Verify Sponsor',
                        `${resp.name} is your sponsor`,
                        [
                            {text: 'Cancel'},
                            {text: 'Accept', onPress: () => {
                                    spinner.loading();
                                    API.selectSponsor({
                                        refer_id: refer_id,
                                        confirmed: true
                                    }, (resp) => {
                                        spinner.loaded();
                                        if(resp.status) {
                                            // NativeModules.Ruck.trackRegister();
                                            const resetAction = NavigationActions.reset({
                                                index: 0,
                                                actions: [
                                                    NavigationActions.navigate({ routeName: 'Inside'})
                                                ]
                                            });
                                            this.props.navigation.dispatch(resetAction)
                                        } else {
                                            ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                                        }
                                    });
                                }}
                        ],
                        {
                            cancelable: true
                        }
                    );
                } else {
                    ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                }
            });
        } else {
            ToastAndroid.show('Kindly fill the refer ID of your sponsor', ToastAndroid.SHORT);
        }
    }

    render() {
        return <View
            style={{ flex: 1, backgroundColor: '#651ac1', paddingHorizontal: 20 }}
        >
            <StatusBar
                backgroundColor={'#381075'}
            />
            <Image
                source={require('../assets/images/logo.png')}
                style={{ height: 100, width: 100, alignSelf: 'center', marginTop: 20 }}
                resizeMode={'contain'}
            />

            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <MyText style={{ color: 'white', fontSize: 36, textAlign: 'center' }}>Enter Sponsor ID</MyText>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        ref={'1'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        value={this.state.n1}
                        selectTextOnFocus={true}
                        onChangeText={(n1) => {
                            this.setState({ n1 });
                            if(n1.length > 0) {
                                this.refs['2'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'2'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        value={this.state.n2}
                        selectTextOnFocus={true}
                        onChangeText={(n2) => {
                            this.setState({ n2 });
                            if(n2.length > 0) {
                                this.refs['3'].focus();
                            } else if(n2.length === 0) {
                                this.refs[1].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'3'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        value={this.state.n3}
                        selectTextOnFocus={true}
                        onChangeText={(n3) => {
                            this.setState({ n3 });
                            if(n3.length > 0) {
                                this.refs['4'].focus();
                            } else if(n3.length === 0) {
                                this.refs['2'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'4'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        value={this.state.n4}
                        selectTextOnFocus={true}
                        onChangeText={(n4) => {
                            this.setState({ n4 });
                            if(n4.length > 0) {
                                this.refs['5'].focus();
                            } else if(n4.length === 0) {
                                this.refs['3'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'5'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        value={this.state.n5}
                        selectTextOnFocus={true}
                        onChangeText={(n5) => {
                            this.setState({ n5 });
                            if(n5.length > 0) {
                                this.refs['6'].focus();
                            } else if(n5.length === 0) {
                                this.refs['4'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={'6'}
                        keyboardType={'numeric'}
                        style={[ styles.otp ]}
                        underlineColorAndroid={'transparent'}
                        value={this.state.n6}
                        selectTextOnFocus={true}
                        onChangeText={(n6) => {
                            this.setState({ n6 });
                            if(n6.length > 0) {
                                this.refs['6'].blur();
                            } else if(n6.length === 0) {
                                this.refs['5'].focus();
                            }
                        }}
                        maxLength={1}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        style={{ height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white' }}
                        onPress={() => {
                            this.checkSponsor();
                        }}
                    >
                        <MyText style={{ color: 'white', fontSize: 18 }}>Select</MyText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 20 }}
                        onPress={() => {
                            this.setState({
                                modal: true
                            });
                        }}
                    >
                        <MyText style={{ color: 'white', textAlign: 'center' }}>Click here if you don't have a sponsor</MyText>
                    </TouchableOpacity>
                </View>

            </View>

            <Modal
                visible={this.state.modal}
                onRequestClose={() => {
                    this.setState({
                        modal: false
                    });
                }}
                transparent={true}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
                    <MyText style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Select Sponsor ID</MyText>

                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={this.state.ids}
                            renderItem={({item}) => {
                                return <TouchableOpacity
                                    style={{ height: 40, borderBottomColor: 'white', borderBottomWidth: 1, justifyContent: 'center' }}
                                    onPress={() => {
                                        let arr = item.split('');
                                        this.setState({
                                            n1: arr[0],
                                            n2: arr[1],
                                            n3: arr[2],
                                            n4: arr[3],
                                            n5: arr[4],
                                            n6: arr[5],
                                            modal: false
                                        });
                                    }}
                                >
                                    <MyText style={{ color: 'white', textAlign: 'center' }}>{item}</MyText>
                                </TouchableOpacity>
                            }}
                            keyExtractor={(item, index) => {
                                return index;
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <Spinner ref={(spin) => spinner = spin}/>
        </View>
    }
};

const styles = StyleSheet.create({
    otp: {
        textAlign: 'center',
        fontSize: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        marginHorizontal: 2.5,
        color: 'white',
        fontFamily: 'Quicksand-Bold'
    }
});