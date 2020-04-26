import React, { Component } from 'react';
import {
    Text
} from 'react-native';

export default class MyText extends Component {
    render() {
        let {
            style
        } = this.props;

        if(style === null || style === undefined) {
            style = {};
        }

        return <Text style={[ { fontFamily: 'Quicksand-Bold' }, style ]}>{this.props.children}</Text>
    }
}