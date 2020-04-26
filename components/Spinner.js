import React, {Component} from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import MyText from "./MyText";

let { height, width } = Dimensions.get('window');

export default class Spinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    loading() {
        this.setState({
            loading: true
        });
    }

    loaded() {
        this.setState({
            loading: false
        });
    }

    render() {
        return <View style={{ height: this.state.loading ? height : 0, width: this.state.loading ? width : 0, position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', zIndex: 99999999999999 }}>
            <ActivityIndicator size={'large'} color={'white'} />
            <MyText style={{ color: 'white', textAlign: 'center', fontSize: 24 }}>Loading...</MyText>
        </View>
    }
} 