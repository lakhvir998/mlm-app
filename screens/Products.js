import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ToastAndroid,
    Linking,
    Alert
} from 'react-native';
import { Button } from 'react-native-material-ui';
import MyText from "../components/MyText";
import API from "../components/API";
import Background from "../components/Background";
import Firebase from 'react-native-firebase';

export default class Products extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => {
            return <Image
                source={require('../assets/images/cart.png')}
                style={{ flex: 1, tintColor: tintColor }}
                resizeMode={'contain'}
            />
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isRefreshing: false,
            page: 2,
            canLoad: true
        }
    }

    componentDidMount() {
        Firebase.analytics().setCurrentScreen('Products');
        this.onRefresh();
    }

    onRefresh() {
        API.getProducts((products) => {
            if(products.error) {
                ToastAndroid.show(products.error, ToastAndroid.SHORT);
            } else {
                this.setState({ products });
            }
        });
    }

    fetchProducts() {
        let { products, page, canLoad } = this.state;
        if(canLoad) {
            API.getProducts((resp) => {
                if(resp.error) {
                    ToastAndroid.show(resp.error, ToastAndroid.SHORT);
                } else {
                    if(resp.length > 0) {
                        this.setState({
                            products: page === 1 ? resp : [...products, ...resp],
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
        return <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Background/>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                <Image
                    source={require('../assets/images/cart.png')}
                    style={{ height: 20, width: 20 }}
                />
                <MyText style={{ color: 'black', fontSize: 18, margin: 5 }}> Best Products </MyText>
                <Image
                    source={require('../assets/images/cart.png')}
                    style={{ height: 20, width: 20 }}
                />
            </View>

            <FlatList
                data={this.state.products}
                renderItem={({item}) => {
                    return <View style={{ flex: 1, margin: 5, backgroundColor: '#FFF', padding: 5, elevation: 5 }}>
                        <Image
                            source={{ uri: `${API.base_url}${item.image}` }}
                            style={{ height: 70, alignSelf: 'center', width: 70 }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ color: '#333', marginTop: 5, textAlign: 'center' }}>{item.name}</Text>

                        <Button
                            raised
                            primary
                            text={`₹ ${item.price}`}
                            style={{ container: { marginTop: 10 } }}
                            onPress={() => {
                                Alert.alert(item.name, item.description, [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'Open', onPress: () => {
                                            Linking.canOpenURL(item.link).then(supported => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + url);
                                                } else {
                                                    return Linking.openURL(item.link);
                                                }
                                            }).catch(err => console.error('An error occurred', err));
                                        }
                                    }
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
                    this.fetchProducts();
                }}
                onEndThreshold={0}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
            />
        </View>
    }
} 