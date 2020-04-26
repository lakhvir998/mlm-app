import React, {Component} from 'react';
import {
    Dimensions,
    Image
} from 'react-native';

let { height, width } = Dimensions.get('window');

export default class Background extends Component {

    render() {
        return <Image
            source={require('../assets/images/background.jpg')}
            style={{ height: height, width: width, position: 'absolute', top: 0, left: 0 }}
        />
    }
} 