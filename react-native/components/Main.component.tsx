import React from "react";
import { View } from 'react-native';

import { styles } from './styles';
import { MainNavigator } from './Main.navigator';

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.campsiteWrapper}>
        <MainNavigator />
      </View>
    );
  }
}
