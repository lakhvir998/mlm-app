import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: '#7f1ded',
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

class Main extends Component {
    render() {
        return <ThemeProvider uiTheme={uiTheme}>
            <App />
        </ThemeProvider>
    }
}

AppRegistry.registerComponent('eendeals', () => Main);
