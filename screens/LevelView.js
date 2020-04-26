import React, { Component } from 'react';
import {
    View,
    ToastAndroid,
    FlatList,
    TouchableOpacity, Linking
} from 'react-native';
import API from "../components/API";
import MyText from "../components/MyText";
import Firebase from 'react-native-firebase';

export default class LevelView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `View Level ${navigation.state.params.level}`,
    });

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            page: 1,
            canLoad: true
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen(`Level ${this.props.navigation.state.params.level}`);
        this.fetchLevel();
    }

    fetchLevel() {
        let { state } = this.props.navigation;
        let { users, page, canLoad } = this.state;
        if(canLoad) {
            API.getLevel(state.params.level, (resp) => {
                if(resp.error) {
                    ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                } else {
                    if(resp.length > 0) {
                        this.setState({
                            users: page === 1 ? resp : [...users, ...resp],
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
        return <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
            <FlatList
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 10 }} />;
                }}
                data={this.state.users}
                renderItem={({item}) => {
                    let user = item.user;
                    let bgColor = '#b4ffa6';
                    if(user.status !== 3) {
                        bgColor = '#ffafbc';
                    }
                    return <TouchableOpacity
                        style={{ backgroundColor: bgColor, elevation: 5, padding: 10 }}
                        onPress={() => {
                            Linking.openURL(`tel:${user.mobile}`)
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <MyText style={{ color: 'black' }}>{user.name}</MyText>
                            <MyText style={{ color: 'black' }}>{user.mobile}</MyText>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <MyText>Refer ID: {user.refer_id}</MyText>
                            <MyText>Sponsor ID: {user.sponsor_id}</MyText>
                        </View>
                    </TouchableOpacity>
                }}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                onEndReached={() => {
                    this.fetchLevel();
                }}
                onEndThreshold={0}
            />
        </View>
    }
} 