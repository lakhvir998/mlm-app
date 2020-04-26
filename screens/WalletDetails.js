import React, {Component} from 'react';
import {
    View,
    FlatList,
    ToastAndroid,
    ScrollView,
    RefreshControl
} from 'react-native';
import MyText from "../components/MyText";
import Background from "../components/Background";
import API from "../components/API";
import Firebase from 'react-native-firebase';

export default class WalletDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            isRefreshing: false
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen(`${this.props.navigation.state.params.type} Wallet`);
        this.onRefresh();
    }

    onRefresh() {
        let { state } = this.props.navigation;
        API.transactionDetails(state.params.type, (resp) => {
            if(resp.error) {
                ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                this.props.navigation.goBack();
            } else if(resp.transactions) {
                this.setState({
                    transactions: resp.transactions
                });
            }
        });
    }

    render() {
        return <View style={{ flex: 1, padding: 10 }}>
            <Background/>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
            >
                <FlatList
                    data={this.state.transactions}
                    renderItem={({item}) => {
                        return <View style={{ padding: 10, backgroundColor: 'white', elevation: 5 }}>
                            <MyText style={{ color: 'black', fontSize: 16, marginVertical: 2.5 }}>{item.category} on {item.created_at}</MyText>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <MyText style={{ color: 'black', fontSize: 18, marginVertical: 2.5 }}>Amount: {item.amount}</MyText>
                                <MyText style={{ color: 'black', fontSize: 18, marginVertical: 2.5 }}>{item.from_user}</MyText>
                            </View>
                        </View>
                    }}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 10 }} />
                    }}
                />
            </ScrollView>
        </View>
    }
} 