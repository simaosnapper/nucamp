import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import AboutComponent from './AboutComponent';
import ContactComponent from './ContactComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

const navigationOptions = {
    headerStyle: {
        backgroundColor: '#5637DD'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff'
    }
}

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        navigationOptions
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: AboutComponent }
    },
    {
        navigationOptions
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: ContactComponent }
    },
    {
        navigationOptions
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        About: { screen: AboutNavigator },
        Contact: { screen: ContactNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

class Main extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <MainNavigator />
            </View>
        );
    }
}

export default Main;