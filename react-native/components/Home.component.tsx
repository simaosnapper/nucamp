import React from "react";
import { Text, ScrollView } from "react-native";
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props: any) {
    super(props);
  } 

  render() {
    return (
      <ScrollView>
        { this.getItem(CAMPSITES.find(campsite => campsite.featured))}
        { this.getItem(PROMOTIONS.find(promotion => promotion.featured))}
        { this.getItem(PARTNERS.find(partner => partner.featured))}
      </ScrollView>
    );
  }

  getItem(item: any) {
    return (
      <Card
        featuredTitle={item.name}
        image={item.image}>
        <Text
            style={{margin: 10}}>
            {item.description}
        </Text>
      </Card>
    );
  }
}
