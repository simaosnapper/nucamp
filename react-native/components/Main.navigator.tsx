import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import CampsiteInfo from './CampsiteInfo.component';
import Directory from './Directory.component';
import Home from './Home.component';
import About from './About.component';
import Contact from './Contact.component';

const defaultOptions = {
  cardStyle: {
    backgroundColor: 'transparent'
  },
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    color: '#000'
  },
}

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      ...defaultOptions,
      title: 'Campsite Home'
    }
  }
});

const DirectoryNavigator: any = createStackNavigator(
  {
    Directory: {
      screen: Directory,
      navigationOptions: {
        ...defaultOptions,
        title: 'Campsite Directory'
      }
    },
    CampsiteInfo: {
      screen: CampsiteInfo,
      navigationOptions: {
        ...defaultOptions,
        title: 'Campsite Info',
        cardStyle: {
          backgroundColor: '#78ffd6'
        }
      }
    }
  },
  {
    initialRouteName: 'Directory',
  }
);

const AboutNavigator = createStackNavigator({
  About: {
    screen: About,
    navigationOptions: {
      ...defaultOptions,
      title: 'About NuCamp Campsites'
    }
  }
});

const ContactNavigator = createStackNavigator({
  Contact: {
    screen: Contact,
    navigationOptions: {
      ...defaultOptions,
      title: 'Contact NuCamp Campsites'
    }
  }
});

export const MainDrawer = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Directory: { screen: DirectoryNavigator },
    About: { screen: AboutNavigator },
    Contact: { screen: ContactNavigator }
  },
  {
    drawerBackgroundColor: '#eee'
  }
);

export const MainNavigator = createAppContainer(MainDrawer);
