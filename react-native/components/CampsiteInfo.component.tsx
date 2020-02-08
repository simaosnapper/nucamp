import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { styles } from './styles';
import { CAMPSITES } from '../shared/campsites';

export default class CampsiteInfo extends React.Component<any> {
  campsite: any;

  constructor(props: any) {
    super(props);
    const campsiteId = this.props.navigation.getParam('campsiteId');
    this.campsite = CAMPSITES.find((campsite: any) => campsite.id == campsiteId);
  }
  render() {
    if (this.campsite) {
      return (
        <Card 
          containerStyle={styles.listItem}
          featuredTitle={this.campsite.name}
          image={this.campsite.image} >
          <Text style={{margin: 10}}>{this.campsite.description}</Text>
        </Card>
      );
    }
    return <View />;
  }
}
