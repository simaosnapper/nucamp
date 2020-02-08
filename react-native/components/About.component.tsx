import React from 'react';
import { ScrollView, FlatList, Text } from 'react-native';

import { PARTNERS } from '../shared/partners';
import { MISSION } from '../shared/mission';
import { ListItem, Card } from 'react-native-elements';

export default class About extends React.Component {
    render() {
        return (
          <ScrollView>
            <Card title={MISSION.title} wrapperStyle={{margin: 20}}><Text>{ MISSION.description }</Text></Card>
            <Card title="Community Partners">
              <FlatList
                data={PARTNERS}
                renderItem={this.renderPartner}
                keyExtractor={(item: any) => item.id.toString()}
              />
            </Card>
          </ScrollView>
        );
    }

    renderPartner(props: any) {
      const { item } = props;
      return (
        <ListItem
          title={item.title}
          subtitle={item.description}
          leftAvatar={{ source: item.image}}></ListItem>
      );
    }
}
