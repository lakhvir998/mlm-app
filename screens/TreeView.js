import React, {Component} from 'react';
import {
    View,
    FlatList,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';
import {
    Button
} from 'react-native-material-ui';
import MyText from "../components/MyText";
import API from "../components/API";
import Background from "../components/Background";
import Firebase from 'react-native-firebase';

let { width } = Dimensions.get('window');

let male = require('../assets/images/man.png');
let female = require('../assets/images/girl.png');

export default class TreeView extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/tree.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            upline: [],
            levels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('TreeView');
        this.fetchData();
    }

    fetchData() {
        API.getUpline((resp) => {
            if(resp.upline) {
                this.setState({
                    upline: resp.upline
                });
            }
            API.getLevelsInfo((levels) => {
                this.setState({ levels });
            });
        });
    }

    render() {
        let a = (width - 30) / 2;
        let { navigate } = this.props.navigation;
        return <View style={{ flex: 1 }}>
            <Background/>
            <ScrollView>
                <MyText style={{ color: '#333', textAlign: 'center', fontSize: 18, marginTop: 10 }}>Your upline</MyText>
                <FlatList
                    data={this.state.upline}
                    renderItem={({item}) => {
                        return <TouchableOpacity
                            style={{ margin: 5, height: a, flex: 1, backgroundColor: 'white', elevation: 5 }}
                            onPress={() => {
                                Linking.openURL(`tel:${item.mobile}`)
                            }}
                        >
                            <Image
                                source={item.gender === 'Male' ? male : female}
                                style={{ width: a - 10, height: a - 10, position: 'absolute', top: 5, left: 5 }}
                                resizeMode={'contain'}
                            />
                            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 5, justifyContent: 'flex-end' }}>
                                <MyText style={{ color: 'white' }}>{item.name}</MyText>
                                <MyText style={{ color: 'white' }}>{item.refer_id}</MyText>
                                <MyText style={{ color: 'white' }}>{item.mobile}</MyText>
                            </View>
                        </TouchableOpacity>
                    }}
                    keyExtractor={(item, index) => {
                        return index
                    }}
                    numColumns={2}
                    style={{ padding: 5 }}
                />

                <MyText style={{ color: '#333', textAlign: 'center', fontSize: 18, marginTop: 10 }}>Your downline</MyText>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    renderItem={({item}) => {
                        return <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                            <Button
                                text={`Level ${item} - ${this.state.levels[item - 1]}`}
                                raised
                                primary
                                onPress={() => {
                                    navigate('LevelView', { level: item });
                                }}
                            />
                        </View>
                    }}
                    keyExtractor={(item, index) => {
                        return item;
                    }}
                    style={{ marginTop: 10 }}
                />
            </ScrollView>
        </View>
    }
}