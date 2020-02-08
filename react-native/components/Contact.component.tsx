import React from 'react';
import { Linking } from 'expo';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

export default class Contact extends React.Component {
    render() {
        return (
        <ScrollView>
          <Card title='Contact Information' wrapperStyle={{margin: 20}}>
            <Text style={{fontWeight: 'bold'}}>1 Nucamp Way</Text>
            <Text style={{fontWeight: 'bold'}}>Seattle, WA 98001</Text>
            <Text style={{marginBottom: 10, fontWeight: 'bold'}}>U.S.A</Text>
            <Text>
              <Text style={{fontWeight: 'bold'}}>Phone: </Text>
              <Text
                style={{color: 'blue'}}
                onPress={this._handleLinkPress('tel:1-206-555-1234')}>1-206-555-1234</Text></Text>
            <Text>
              <Text style={{fontWeight: 'bold'}}>Email: </Text>
              <Text
                style={{color: 'blue'}}
                onPress={this._handleLinkPress('mailto:camspsites@nucamp.co')}>camspsites@nucamp.co</Text></Text>
          </Card>
        </ScrollView>
      );
    }

    _handleLinkPress = (location: string) => () => {
      Linking.openURL(location);
    } 
}
