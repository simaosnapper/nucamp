import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { ImageBackground } from 'react-native';
import { styles } from './styles';

import Main from './components/Main.component';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
          <ImageBackground source={require('./assets/images/mainbg.jpg')} style={styles.mainBackground}>
            <Main/>
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
